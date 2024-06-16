# rest-backend

```
https://github.com/PaulinJulia/rest-backend
```

## Description

This project is a RESTful API with a cloud-based PostgreSQL database via Render. It uses Prisma as ORM to handle database interactions. The project has two resources with relationships in PostgreSQL. As well as authentication with JWT (JSON Web Tokens) to secure the API. It also includes error handling for all endpoints tested with the ThunderClient tool. The project involves setting up the project, configuring the database connection, defining and migrating the database schema, creating endpoints, adding authentication, and testing the API.


## Visuals
Prisma studio  
![Resources](/src/assets/images/db2.png)
![Resources](/src/assets/images/db1.png)

## How to install 
```  
cd rest-backend
npm install  
npm run dev  

npx prisma studio  
```
## Tools
node.js - https://nodejs.org/en/download  
npm - https://www.npmjs.com/  
Prisma - https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql  
Typescript - https://www.typescriptlang.org/  
Express - https://expressjs.com/en/starter/installing.html  
JWT - https://jwt.io/  
Render - https://render.com/  

## API Reference

```
GET all users - /api/users  
GET user by id - /api/users/:id  
POST create user - /api/register  
POST logga in- /api/login  
PUT update - /api/user/:id  
DELETE - /api/users/:id  

GET all jobs - /api/jobs  
GET job by id - /api/jobs/:id  
GET jobs by user id - /api/users/:userId/jobs  
PUT uppdatera job - /api/jobs/:id  
POST create job - /api/users/:userId/jobs  
DELETE - /api/jobs/:id  
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`  
`JWT_SECRET`


## Usage

Basic backend.  

## About

This backend was carried out by one person for learning and consolidating knowledge during a course in Backend. This project has no intention of continuing. If there is time and interest in making an entirety application a frontend will appear, but for now it's enough with backend.

## Project status

This project is on hold for feedback.

## Support

email address: julia.paulin@chasacademy.se

