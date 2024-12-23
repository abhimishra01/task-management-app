## 📝 Task Management Application

This is a simple task management application built using NestJS, ReactJS, and MySQL.

#### 🚀 Features

- Task creation, editing, and deletion
- User CRUDS and role based authorization

### 🛠️ Tech Stack Used

- NestJS (Backend)
- ReactJS + JoyUI (Frontend)
- MySQL (Database)
- Docker (Containerization)
- Passport / JWT (Authentication)
- TypeScript
- API Docs (Swagger)

### ⚡️ Application Scripts

- Ensure Docker 🐳` engine and docker-compose is installed and running.
  _Note :- Docker Desktop verion used 4.16.2_
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

_Note :- Since time was of the essence, Unit tests/E2E tests are not included in the current version, but will be added soon_

- Application ports

```
Frontend will be available on http://localhost:3001
Backend will be available on http://localhost:3000
Swagger API Docs will be available on http://localhost:3000/api
Database will be available on http://localhost:3306
```

### 📚 Essentials

- Pre seeded user authentication details

```
username: admin1
password: password1
role : admin

username: user1
password: password2
role : user
```

---

### Application Demo

https://github.com/user-attachments/assets/97f91dea-b99a-415d-a80b-468169152f59

---
