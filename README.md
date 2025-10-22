# Jenkins CI/CD Pipeline Demo

## 📋 Project Overview
This project demonstrates a complete CI/CD pipeline using Jenkins, Docker, and Node.js for automated build, test, and deployment.

## 🛠️ Technologies Used
- **Jenkins** - CI/CD automation server
- **Node.js** & Express - Application framework
- **Docker** - Containerization
- **Jest & Supertest** - Testing framework
- **Git** - Version control

## 🚀 Jenkins Pipeline Stages

### Pipeline Flow:
1. **Checkout** - Pull code from Git repository
2. **Build** - Install dependencies with npm
3. **Test** - Run automated tests
4. **Docker Build** - Create Docker image
5. **Docker Push** - Push image to registry (optional)
6. **Deploy** - Deploy container locally

## 📦 Prerequisites

### Required Software:
- Java 11 or higher
- Jenkins 2.400+
- Docker Desktop
- Node.js 18+
- Git

## 🔧 Jenkins Installation

### Option 1: Local Installation (Windows/Mac/Linux)

#### For Ubuntu/Debian:
```bash
# Update system
sudo apt update

# Install Java
sudo apt install openjdk-11-jdk -y

# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

#### For Mac (using Homebrew):
```bash
brew install jenkins-lts
brew services start jenkins-lts
```

#### For Windows:
1. Download Jenkins WAR file from jenkins.io
2. Run: `java -jar jenkins.war`
3. Access at http://localhost:8080

### Option 2: Docker Installation (Easiest)
```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

Get initial password:
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## 🎯 Jenkins Setup Steps

### 1. Initial Configuration
1. Access Jenkins at `http://localhost:8080`
2. Enter initial admin password
3. Install suggested plugins
4. Create admin user
5. Set Jenkins URL

### 2. Install Required Plugins
Go to: **Manage Jenkins → Plugins → Available**

Install:
- Git Plugin
- Docker Pipeline Plugin
- Pipeline Plugin
- NodeJS Plugin
- GitHub Integration Plugin

### 3. Configure Global Tools
**Manage Jenkins → Tools**

#### Configure NodeJS:
- Name: `NodeJS-18`
- Version: NodeJS 18.x

#### Configure Docker:
- Ensure Docker is available on Jenkins agent

### 4. Setup Credentials (Optional for Docker Push)
**Manage Jenkins → Credentials → System → Global credentials**

Add DockerHub credentials:
- Kind: Username with password
- ID: `dockerhub-credentials`
- Username: Your DockerHub username
- Password: Your DockerHub password

## 📝 Creating Jenkins Pipeline

### Method 1: Pipeline from SCM (Recommended)

1. **Create New Item**
   - Click "New Item"
   - Enter name: `jenkins-cicd-app`
   - Select "Pipeline"
   - Click OK

2. **Configure Pipeline**
   - Description: "CI/CD Pipeline Demo"
   - Build Triggers: Check "GitHub hook trigger" or "Poll SCM"
   - Pipeline section:
     - Definition: "Pipeline script from SCM"
     - SCM: Git
     - Repository URL: Your GitHub repo URL
     - Branch: `*/main`
     - Script Path: `Jenkinsfile`

3. **Save and Build**

### Method 2: Direct Pipeline Script

1. Create New Item → Pipeline
2. In Pipeline section, select "Pipeline script"
3. Copy the Jenkinsfile content directly
4. Save and Build

## 🏃 Running the Pipeline

### Manual Trigger:
1. Go to your pipeline
2. Click "Build Now"
3. Watch the stages execute

### Automatic Trigger (Git Hook):
1. Configure webhook in GitHub:
   - Settings → Webhooks → Add webhook
   - Payload URL: `http://your-jenkins-url:8080/github-webhook/`
   - Content type: `application/json`
   - Events: Just the push event

2. Push code to repository:
```bash
git add .
git commit -m "Trigger Jenkins pipeline"
git push origin main
```

## 🧪 Testing Locally

### Setup Project:
```bash
# Clone repository
git clone <your-repo-url>
cd jenkins-cicd-app

# Install dependencies
npm install

# Run tests
npm test

# Start application
npm start

# Access application
curl http://localhost:3000
```

### Docker Testing:
```bash
# Build image
docker build -t jenkins-cicd-app:latest .

# Run container
docker run -d -p 3000:3000 --name jenkins-app jenkins-cicd-app:latest

# Test endpoints
curl http://localhost:3000
curl http://localhost:3000/health
curl http://localhost:3000/api/info

# Check logs
docker logs jenkins-app

# Stop and remove
docker stop jenkins-app
docker rm jenkins-app
```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Welcome message |
| `/health` | GET | Health check |
| `/api/info` | GET | Application info |

## 📸 Screenshots to Include

1. Jenkins Dashboard
2. Pipeline Configuration
3. Successful Build Execution
4. Stage View
5. Console Output
6. Running Application
7. Docker Images

## 🎓 Interview Questions & Answers

### 1. What is Jenkins, and how is it used in CI/CD?
Jenkins is an open-source automation server used for CI/CD. It automates:
- Building applications
- Running tests
- Deploying to various environments
- Monitoring execution

It integrates with Git, Docker, and various tools to create automated pipelines.

### 2. What is a Jenkinsfile?
A Jenkinsfile is a text file containing Jenkins Pipeline definition, written in Groovy DSL. It's stored in source control alongside code, enabling:
- Version control of pipeline
- Code review of pipeline changes
- Pipeline as Code approach
- Easy pipeline recreation

### 3. How do you create and configure Jenkins pipelines?
**Creation:**
- New Item → Pipeline
- Configure SCM or write script directly
- Add Jenkinsfile to repository

**Configuration:**
- Define stages and steps
- Set environment variables
- Configure build triggers
- Add post-build actions
- Set up credentials

### 4. What are some common stages in a Jenkins pipeline?
Common stages:
- **Checkout** - Pull source code
- **Build** - Compile/install dependencies
- **Test** - Run automated tests
- **Code Analysis** - Static code analysis
- **Package** - Create artifacts
- **Docker Build** - Build container images
- **Deploy to Staging** - Deploy to test environment
- **Integration Tests** - Run E2E tests
- **Deploy to Production** - Production deployment

### 5. What is the difference between declarative and scripted Jenkins pipeline?

**Declarative Pipeline:**
- Structured, simpler syntax
- Uses `pipeline {}` block
- Pre-defined sections (agent, stages, steps)
- Better for most use cases
- Easier to read and write
- Example: Our Jenkinsfile above

**Scripted Pipeline:**
- Uses Groovy directly
- More flexible, powerful
- Starts with `node {}` block
- Requires more Groovy knowledge
- Better for complex logic

Example Declarative:
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}
```

Example Scripted:
```groovy
node {
    stage('Build') {
        sh 'npm install'
    }
}
```

## 🐛 Common Issues & Solutions

### Issue 1: Docker permission denied
```bash
# Add Jenkins user to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Issue 2: Node not found
- Install NodeJS plugin
- Configure in Global Tool Configuration
- Add NodeJS in pipeline tools

### Issue 3: Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
docker run -p 3001:3000 jenkins-cicd-app
```

### Issue 4: Git credentials
- Add credentials in Jenkins
- Use credentials ID in pipeline
- Or use public repositories

## 📚 Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Docker Pipeline Plugin](https://plugins.jenkins.io/docker-workflow/)
- [Best Practices](https://www.jenkins.io/doc/book/pipeline/pipeline-best-practices/)

## ✅ Task Completion Checklist

- [ ] Jenkins installed and running
- [ ] Project created with all files
- [ ] Jenkinsfile configured
- [ ] Pipeline created in Jenkins
- [ ] All stages executing successfully
- [ ] Tests passing
- [ ] Docker image building
- [ ] Application deployed
- [ ] Screenshots captured
- [ ] README.md documented
- [ ] Code pushed to GitHub
- [ ] Repository link submitted

## 🎯 Project Structure Summary