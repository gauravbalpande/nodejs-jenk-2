pipeline {
    agent any
    tools {
        nodejs 'NodeJS-18'  
    }
    
    environment {
        DOCKER_IMAGE = 'jenkins-cicd-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'your-dockerhub-username'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from repository...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo '🔨 Building the application...'
                script {
                    sh 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                script {
                    sh 'npm test'
                }
            }
            post {
                always {
                    echo '📊 Publishing test results...'
                    junit '**/coverage/*.xml' // If you generate XML reports
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                echo '📤 Pushing Docker image to registry...'
                script {
                    // Uncomment when you have DockerHub credentials configured
                    // withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                    //                  usernameVariable: 'DOCKER_USER', 
                    //                  passwordVariable: 'DOCKER_PASS')]) {
                    //     sh """
                    //         echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                    //         docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}
                    //         docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest
                    //     """
                    // }
                    echo '✅ Docker push stage configured (credentials required)'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                script {
                    sh """
                        # Stop existing container if running
                        docker stop ${DOCKER_IMAGE} || true
                        docker rm ${DOCKER_IMAGE} || true
                        
                        # Run new container
                        docker run -d \
                            --name ${DOCKER_IMAGE} \
                            -p 3000:3000 \
                            ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo "🎉 Application deployed and running on http://localhost:3000"
        }
        failure {
            echo '❌ Pipeline failed!'
            echo '🔍 Check the logs above for errors'
        }
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
