# NestJS Assignment
💡

This assignment is confidential and the property of Juno Technologies Limited. Please refrain from sharing or distributing this content without explicit permission. All rights reserved.


## **Task Management System**

**Overview:**

You are tasked with building a **Task Management System** using NestJS that allows users to register, authenticate, and manage tasks. The project should utilize core NestJS features such as **controllers**, **services**, **pipes**, **guards**, **interceptors**, and **TypeORM** for database operations.

Your application should support **role-based access control** (e.g., ADMIN vs USER), task validation, and JWT authentication. You are required to follow clean code practices and ensure proper validation and error handling throughout the application.

The application should contain a React frontend that allows users to interact with your backend.

## **Detailed Requirements**

### 1. User Authentication (JWT)

**Implement user registration and login functionality using JWT for protecting task management routes.**

**Features:**

- Users can register and log in
- The application should return a JWT token upon successful login

**Entities:**

**User:**

- id: UUID (Primary Key)
- username: Unique, string
- password: Hashed, string
- role: Either USER or ADMIN

**Endpoints:**

- POST /auth/register: Registers a new user
- POST /auth/login: Logs in the user and returns a JWT token

### 2. Task Management (CRUD)

**Users can create, read, update, and delete their own tasks. Admins can view and manage all tasks.**

**Entities:**

**Task:**

- id: UUID (Primary Key)
- title: String, required
- description: String, required
- status: Enum, either OPEN or CLOSED
- owner: Relation to the User entity

**Endpoints:**

- POST /tasks: Create a new task
- GET /tasks: Retrieve tasks for the authenticated user or all tasks if the user is an admin
- GET /tasks/:id: Retrieve a single task by ID
- PATCH /tasks/:id: Update a task's details
- DELETE /tasks/:id: Delete a task by ID

### 3. Role-Based Access Control

**Implement a role-based access guard to restrict access to specific routes. Regular users should only have access to their own tasks, while admins can access all tasks.**

**Guard:**

- Use a **JWT Guard** to protect task-related routes
- Use a **Roles Guard** to ensure only admins can access certain endpoints (e.g., view all tasks)

### 4. Validation using Pipes

**Use Validation Pipes to validate incoming data for task creation and updates.**

**Validation Requirements:**

- Ensure title and description are non-empty strings
- Ensure status is either OPEN or CLOSED

### 5. Logging Interceptor

**Implement a logging interceptor that logs the time taken to handle each request. The log should include the request URL and the total time taken.**


### 6. Frontend

**Implement a basic frontend to view a user’s tasks. This frontend should give users the option of creating, reading, updating and deleting tasks.** 

- Use React for the frontend
- Use whichever design library you are familiar with
- There are no guidelines on design (but we love to be impressed)


### Expectations

- The application should be built using NestJS
- **TypeORM** should be used for database interaction
- Use **PostgreSQL** as the database (or any SQL database of your choice)
- Implement clean, modular code following the best practices of NestJS
- Apply **error handling** and **validation** using NestJS built-in features
- Properly protect routes using **guards** and ensure role-based access control

### Bonus (Optional)

- Implement **pagination** for retrieving tasks
- Emit events using NestJS's **event emitter** module when a task is created or updated
- Implement **filtering** on tasks based on their status

### Submission Instructions

- Include a [README.md](http://readme.md) with instructions on how to set up and run the project, including any environment variables or configuration needed
- Ensure proper documentation of the APIs using Swagger (optional)


### Evaluation Criteria

- Correct implementation of **authentication** and **authorization**
- Proper use of **pipes**, **guards**, and **interceptors**
- Code structure, modularity, and adherence to **NestJS best practices**
- Handling of **database interactions** using **TypeORM**
- Overall code quality, including error handling and validation

This assignment will help evaluate your understanding of NestJS and how well you can utilize its core features in a real-world scenario. Feel free to ask in case of any queries.