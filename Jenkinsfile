pipeline {
agent any
tools {
    nodejs 'NodeJS-18'  // Must match the NodeJS installation name in Jenkins
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
    
    stage('Environment Check') {
        steps {
            echo '🔍 Checking Node.js and npm versions...'
            sh 'node --version'
            sh 'npm --version'
        }
    }
    
    stage('Build') {
        steps {
            echo '🔨 Building the application...'
            sh 'npm install'
        }
    }
    
    stage('Test') {
        steps {
            echo '🧪 Running tests...'
            sh 'npm test'
        }
        post {
            always {
                echo '📊 Test stage completed'
            }
        }
    }
    
    stage('Docker Build') {
        steps {
            echo '🐳 Building Docker image...'
            sh """
                docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
            """
        }
    }
    
    stage('Docker Push') {
        steps {
            echo '📤 Docker push stage (optional)...'
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
                echo '✅ Docker push stage configured (credentials required to enable)'
            }
        }
    }
    
    stage('Deploy') {
        steps {
            echo '🚀 Deploying application...'
            sh """
                # Stop existing container if running
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                
                # Run new container
                docker run -d \
                    --name ${DOCKER_IMAGE} \
                    -p 3000:3000 \
                    ${DOCKER_IMAGE}:latest
                
                # Wait for container to be ready
                sleep 5
                
                # Check if container is running
                docker ps | grep ${DOCKER_IMAGE}
            """
        }
    }
    
    stage('Verify Deployment') {
        steps {
            echo '✅ Verifying deployment...'
            sh """
                # Check if application is responding
                curl -f http://localhost:3000 || exit 1
                curl -f http://localhost:3000/health || exit 1
            """
        }
    }
}

post {
    success {
        echo '✅ ========================================='
        echo '✅ Pipeline completed successfully!'
        echo '✅ ========================================='
        echo "🎉 Application deployed and running!"
        echo "🌐 Access at: http://localhost:3000"
        echo "🐳 Docker Image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
        echo '✅ ========================================='
    }
    failure {
        echo '❌ ========================================='
        echo '❌ Pipeline failed!'
        echo '❌ ========================================='
        echo '🔍 Check the logs above for errors'
        echo '💡 Common issues:'
        echo '   - NodeJS plugin not installed'
        echo '   - Docker not running'
        echo '   - Port 3000 already in use'
        echo '❌ ========================================='
    }
    always {
        echo '🧹 Cleaning up workspace...'
        cleanWs()
    }
}
}
