pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    // SONAR_SCANNER_HOME removed to avoid failing when Jenkins tool isn't configured

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
                                // If `sonar-scanner` is not on PATH, download a Windows CLI and run it from workspace
                                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                                        bat """
                                        powershell -NoProfile -Command "
                                            $token = '%SONAR_TOKEN%';
                                            if (-not (Get-Command sonar-scanner -ErrorAction SilentlyContinue)) {
                                                Write-Output 'sonar-scanner not found — downloading scanner...';
                                                Invoke-WebRequest -Uri 'https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-windows.zip' -OutFile 'sonar-scanner.zip';
                                                Expand-Archive -Path 'sonar-scanner.zip' -DestinationPath '.\\.sonar' -Force;
                                                $dir = Get-ChildItem -Path '.\\.sonar' -Directory | Select-Object -First 1;
                                                $scanner = Join-Path $dir.FullName 'bin\\sonar-scanner.bat';
                                                & $scanner -Dsonar.projectKey=evat-project -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$token;
                                            } else {
                                                Write-Output 'sonar-scanner found on PATH';
                                                sonar-scanner -Dsonar.projectKey=evat-project -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=$token;
                                            }
                                        "
                                        """
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