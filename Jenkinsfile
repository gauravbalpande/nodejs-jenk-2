pipeline {
agent any
environment {
    DOCKER_IMAGE = 'jenkins-cicd-app'
    DOCKER_TAG = "${BUILD_NUMBER}"
    PATH = "/usr/bin:${env.PATH}"
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
            sh '''
                which node || echo "Node not in PATH"
                which npm || echo "NPM not in PATH"
                node --version || echo "Node command failed"
                npm --version || echo "NPM command failed"
            '''
        }
    }
    
    stage('Build') {
        steps {
            echo '🔨 Installing dependencies...'
            sh 'npm install'
        }
    }
    
    stage('Test') {
        steps {
            echo '🧪 Running tests...'
            sh 'npm test'
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
    
    stage('Deploy') {
        steps {
            echo '🚀 Deploying application...'
            sh """
                docker stop ${DOCKER_IMAGE} || true
                docker rm ${DOCKER_IMAGE} || true
                docker run -d --name ${DOCKER_IMAGE} -p 3000:3000 ${DOCKER_IMAGE}:latest
                sleep 5
                docker ps | grep ${DOCKER_IMAGE}
            """
        }
    }
    
    stage('Verify') {
        steps {
            echo '✅ Verifying deployment...'
            sh 'curl -f http://localhost:3000 || exit 1'
            echo '🎉 Application is running successfully!'
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
        echo '❌ ========================================='
    }
}
}
