pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        IMAGE_NAME = "evat-devops-api"
        CONTAINER_NAME = "evat-container"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Test (Jest)') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Security Scan') {
            steps {
                sh 'trivy image $IMAGE_NAME || true'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker stop $CONTAINER_NAME || true'
                sh 'docker rm $CONTAINER_NAME || true'
                sh 'docker run -d -p 5000:5000 --name $CONTAINER_NAME $IMAGE_NAME'
            }
        }

        stage('Release') {
            steps {
                sh 'docker tag $IMAGE_NAME $IMAGE_NAME:latest'
            }
        }

        stage('Monitoring') {
            steps {
                sh 'curl http://localhost:5000/health || true'
            }
        }
    }

    post {
        success {
            echo 'PIPELINE SUCCESS 🎉'
        }
        failure {
            echo 'PIPELINE FAILED ❌'
        }
    }
}