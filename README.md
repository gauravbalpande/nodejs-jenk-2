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
## 🎯 Project Structure Summary
