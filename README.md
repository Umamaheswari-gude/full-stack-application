# MyApp (Signup + Login Demo)

This project is a demo application with a signup and login feature. It includes a **frontend** built with React and Tailwind CSS and a **backend** built with Node.js and Express, using PostgreSQL as the database.

---

## Features
- Implemented the docker file for the frontend.
- Implemented the docker file for the backend.
- Implemented the docker compose for the application.
- Implemented the github action workflow for the application.

- Added Features:
- Implemented docker compose file for frontend and backend services.
- Implemented networks in the compose.
- Updated the github action workflow through commands.
- Added health checks to frontend and backend services.
- Updated the base image and reduced the size of the images.
- Added build command for frontend in github action workflow.
- Removed the build step in frontend dockerfile.

## Prerequisites

Before you begin, ensure the following dependencies are installed on your system:

1. **PostgreSQL** (Database)
2. **Node.js** (JavaScript runtime)
3. **npm** (Node Package Manager)

If these are not installed, follow the steps below to install them.

---

## Installation Guide

### 1. Install PostgreSQL

Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).

---

### 2. Install Node.js and npm

Download and install Node.js from the [official website](https://nodejs.org/).

---

## Project Setup

### 1. Set Up the Database

1. Create a PostgreSQL database:
   ```bash
   createdb -U postgres myappdb
   ```
---

### 2. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=<your-password>
   DB_NAME=myappdb
   ```

4. Install backend dependencies:
   ```bash
   npm install
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   
6. Server will run on the port you have mentioned in .env.
---

### 3. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173
   ```


---