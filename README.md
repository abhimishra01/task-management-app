### Task Management Application

This is a simple task management application built using NestJS, ReactJS, and MySQL.

#### Features

- Task creation, editing, and deletion
- User CRUDS and role based authorization

### Tech Stack Used

- NestJS (Backend)
- MySQL (Database)
- ReactJS + MaterialUI (Frontend)
- Docker (Containerization)
- Passport / JWT (Authentication)
- TypeScript

### Application Scripts

- Ensure Docker Engine is installed and running.
  _Note :- Docker Desktop verion 4.16.2_
- Start the Application (FE + BE + DB)

  ```
  ./scripts/start-app.sh
  ```

- Rebuild and start the application

```
./scripts/start-app.sh build
```

- Stop the application

```
./scripts/stop-app.sh
```

- Application ports

```
Frontend will be available on http://localhost:3000
Backend will be available on http://localhost:3001
Database will be available on http://localhost:3306

```
