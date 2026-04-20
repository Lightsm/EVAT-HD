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
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Test (Jest)') {
            steps {
                bat "node -v"
                bat "npm -v"
                bat "npm install"
                bat "npm test"
            }
        }

        stage('Security Scan') {
    steps {
        bat '''
        where trivy >nul 2>nul
        IF %ERRORLEVEL% EQU 0 (
            trivy image evat-devops-api
        ) ELSE (
            echo Trivy not installed, skipping security scan
        )
        '''
    }
        }

        stage('Deploy') {
            steps {
                bat "docker stop %CONTAINER_NAME% || exit 0"
                bat "docker rm %CONTAINER_NAME% || exit 0"
                bat "docker run -d -p 5000:5000 --name %CONTAINER_NAME% %IMAGE_NAME%"
            }
        }

        stage('Release') {
            steps {
                bat "docker tag %IMAGE_NAME% %IMAGE_NAME%:latest"
            }
        }

        stage('Monitoring') {
            steps {
                bat "curl http://localhost:5000/health || exit 0"
            }
        }
    }

    post {
        success {
            echo 'PIPELINE SUCCESS '
        }
        failure {
            echo 'PIPELINE FAILED '
        }
    }
}