const dotenv = require('dotenv');
dotenv.config();
const masto = require('masto');
const logger = require('../helpers/logger');
const { redisClientConnection, getRedisConnection } = require('../helpers/connection');
// mastodon client connection definition
const mastoClient = masto.createRestAPIClient({
  url: 'https://mastodon.social',
  accessToken: process.env.MASTODON_ACCESS_TOKEN,
});

exports.getStatus = async (req, res) => {
  // get home page of the user token provided in dotenv , we need to change it to oauth integration later 
  const timeline = await mastoClient.v1.timelines.home.list({
    limit: 30,
  });
  for (const eachFeed of timeline) {
    Object.keys(eachFeed).forEach((eachKey) => {
      console.log('key is ', eachKey);
      console.log('value is ', eachFeed[eachKey]);
    });
  }
  console.log('time line is ', timeline);
  res.send({});
}

exports.getStatusSince = async (req, res) => {
  const redisClient = await getRedisConnection();
  logger.info('reset is ', req.params);
  if (req.params.reset == 1) {
    redisClient.del('lastId');
  }
  // get home page of user token provided in the dotenv, we need to change it to oauth later 
  try {
    // sending next objects since the last id stored in redis 
    // need to change the binding with user token so that each user has a unique last id 
    // need to craete a last id map for lets say [user-timeline-feeds] eg [npcaura-home-lastId]
    // this will keep a pointer for pagination against the homefeed of user npcaura might replace with user id
    // also a separate handle required to be able to reset the pointer 
    const lastId = await redisClient.get('lastId');
    console.log('last id from redis ', lastId);
    const timeline = await mastoClient.v1.timelines.home.list({
      limit:30,
      maxId: lastId
    });
    const responseObject = {};
    let localIdReference = 0;
    responseObject['feeds'] = await Promise.all(timeline.map(async (eachFeed, index) => {
      localIdReference = eachFeed.id;
      return eachFeed;
    }));
    await redisClient.set('lastId', localIdReference);
    res.send(responseObject);
  } catch(err) {
    // sending default response incase the lastId is missing in redis
    const timeline = await mastoClient.v1.timelines.home.list({
      limit: 30,
    });
    const responseObject = {};
    let localIdReference = 0;
    responseObject['feeds'] = await Promise.all(timeline.map(async (eachFeed, index) => {
      localIdReference = eachFeed.id;
      return eachFeed;
    }));
    await redisClient.set('lastId', localIdReference);
    res.send(responseObject);
  }
}
