# School Server ERP

### Introduction
This github is used to maintain documentation of server (back-end) codes as Proof of Concept (POC)
for school ERP system where teachers need a system where they can perform administrative functions for their students
which we're required to build and develop based on tech stack.  


### Tech stack
Back-end engine: NodeJS  
Framework: ExpressJS  
RDMS: MySQL  
CI/CD: Amazon Code Pipeline and Amazon Code Deploy  
Cloud Server: Amazon EC2  
Cloud Database: Amazon RDS Aurora(MySQL) 
Database Schema: [Draw.io](https://drive.google.com/file/d/1Y02-s-osBO97V_N2bx6ojAXH8sb-mtT-/view?usp=sharing)  
Published API Endpoint:  
- [CDN Endpoint](https://d32egne8vcj7a0.cloudfront.net)  
- [Server1 Endpoint](http://ec2-18-141-219-32.ap-southeast-1.compute.amazonaws.com:3000)  
- [Server2 Endpoint](http://ec2-13-251-130-78.ap-southeast-1.compute.amazonaws.com:3000)  


### API Documentation
Please refer to postman collection on `docs` folder for API documentation and 
note that you can choose one of the published endpoints for `{{base_url}}` environment variables in the postman collection.
POST `/api/register`: register multiple students by teacher  
GET `/api/commonstudents`: retrieve students that is registered to teachers  
POST `/api/suspend`: for teacher to suspend a student  
POST `/api/retrievefornotifications`: retrieve a list of students who can receive a given notification  
POST `/teachers/register`: register a new teacher  
POST `/students/register`: register a new student  
GET `/students/suspended`: retrieve a list of students that is being suspended  


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
# Please notice that we have middleware function to validate whether a teacher or student is exists on school database
# So if you need valid teacher and student, please refer to `seeders` folder for reference 
# or use the API to register new teacher or student

# Development
npm run dev

# Test
npm run test
```  

