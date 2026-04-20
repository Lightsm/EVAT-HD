pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t evat-devops-api .'
            }
        }

        stage('Test (Jest)') {
            steps {
                bat 'npm install'
                bat 'npm test'
            }
        }

        stage('Security Scan') {
            steps {
                bat 'npm audit || exit 0'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker stop evat-container || exit 0'
                bat 'docker rm evat-container || exit 0'
                bat 'docker run -d -p 5001:5000 --name evat-container evat-devops-api'
            }
        }

        stage('Release') {
            steps {
                echo 'Release stage executed'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring stage executed'
            }
        }
    }

    post {
        success {
            echo 'PIPELINE SUCCESS'
        }
        failure {
            echo 'PIPELINE FAILED'
        }
    }
}