# School Server ERP

### Introduction
This github is used to maintain documentation of server (back-end) codes as Proof of Concept (POC)
for school ERP system where teachers need a system where they can perform administrative functions for their students
which we're required to build and develop based on tech stack.  


### Tech stack
Back-end engine: NodeJS  
Framework: ExpressJS  
RDMS: MySQL  
CI/CD: Github Actions  
Cloud Server: Amazon EC2  
Cloud Database: Amazon RDS  
Database Schema: [Draw.io](https://drive.google.com/file/d/1Y02-s-osBO97V_N2bx6ojAXH8sb-mtT-/view?usp=sharing)  
Published API Endpoint: [API Endpoint](https://xxx.com)  


### API Documentation
Please refer to postman collection on `docs` folder for API documentation.


### Prerequisites
Please install below dependencies on your local machine:
- [NodeJS](https://nodejs.org/en/download)  
- [MySQL](https://www.mysql.com/downloads)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench) - Optional
- [Postman](https://www.postman.com/downloads) - Optional


### Installation
To start this application on locahost, you just need to git clone it on your local and run these codes:
```
# Install dependencies
npm install

# Add environment variables file (.env) at root
# Please refer to `.env.sample` file for variables that you need to save

# Add dummy data to your local MySQL database
# Please refer to `seeders` folder for sample data 

# Development
npm run start

# Test
npm run test
```  

