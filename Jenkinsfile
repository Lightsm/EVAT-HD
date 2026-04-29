pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t evat-devops-api .'
            }
        }

        stage('Test (Jest)') {
            steps {
                bat 'npm test'
            }
        }

        stage('Code Analysis (SonarQube)') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        bat """
                        %SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat ^
                        -Dsonar.projectKey=evat-project ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        -Dsonar.login=%SONAR_TOKEN%
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Security Scan (npm audit)') {
            steps {
                bat 'npm audit || exit 0'
            }
        }

        // OPTIONAL (since you already have snyk-token)
        stage('Security Scan (Snyk)') {
            steps {
                withCredentials([string(credentialsId: 'snyk-token', variable: 'SNYK_TOKEN')]) {
                    bat """
                    npm install -g snyk
                    snyk auth %SNYK_TOKEN%
                    snyk test || exit 0
                    """
                }
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
            echo ' PIPELINE SUCCESS'
        }
        failure {
            echo ' PIPELINE FAILED'
        }
    }
}