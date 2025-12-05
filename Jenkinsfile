pipeline {
    agent behemoth

    stages {
        stage('fuel') {
            steps {
                checkout scm
            }
        }
        stage('ignition') {
            steps {
                sh 'docker compose up'
            }
        }
        stage('takeoff') {
            steps {
                sh 'curl http://localhost:3000'
            }
        }
    }
}
