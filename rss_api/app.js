const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

//router imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const configsRouter = require('./routes/configs');
const authRouter = require('./routes/auth');

const cors = require('cors');
const app = express();
app.use(cors());
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs');

const jsdocComponents = YAML.load('components.yaml');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Welcome to the rss backend applications, swagger',
      version: '1.0.0',
    },
    ...jsdocComponents,
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/configs', configsRouter);
app.use('/auth', authRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = app;
