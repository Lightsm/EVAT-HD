pipeline {
    agent any

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

        stage('Build - Docker Image') {
            steps {
                echo 'Building Docker Image...'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Test - Jest') {
            steps {
                echo 'Running Tests...'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Security Scan (Trivy)...'
                sh 'trivy image $IMAGE_NAME || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Container...'
                sh 'docker stop $CONTAINER_NAME || true'
                sh 'docker rm $CONTAINER_NAME || true'
                sh 'docker run -d -p 5000:5000 --name $CONTAINER_NAME $IMAGE_NAME'
            }
        }

        stage('Release') {
            steps {
                echo 'Tagging Image...'
                sh 'docker tag $IMAGE_NAME $IMAGE_NAME:latest'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking Health Endpoint...'
                sh 'curl http://localhost:5000/health || true'
            }
        }
    }

    post {
        success {
            echo 'Pipeline Success '
        }
        failure {
            echo 'Pipeline Failed '
        }
    }
}