# 🗂️ Task Management System (Django + React)

A full-stack Task Management System built using **Django REST Framework (Backend)** and **React + Vite (Frontend)** with JWT authentication, role-based access, and a modern UI.

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login (SimpleJWT)
- Secure token storage (access + refresh)
- Protected frontend routes
- Auth context for session handling

---

### 📌 Task Management
- Create tasks
- Edit tasks
- Delete tasks
- View task details
- Assign tasks to users
- Status tracking:
  - PENDING
  - IN_PROGRESS
  - COMPLETED
- Priority levels:
  - LOW
  - MEDIUM
  - HIGH
- Due date support
- Category association

---

### 📂 Category Management
- Create categories
- Update categories
- Delete categories
- Assign categories to tasks
- Admin-only management (optional enhancement)

---

### 💬 Comments System
- Add comments on tasks
- View all comments per task
- Delete comments
- User-based comment display
- Timestamp tracking

---

### 📊 Dashboard
- Total tasks count
- Pending tasks
- In-progress tasks
- Completed tasks
- Task table view
- Quick task creation/edit form
- Category modal management

---

### 👥 Permissions
- All users can view tasks
- Only:
  - Assigned user
  - Admin / Superuser
can edit or delete tasks
- All authenticated users can comment on tasks

---

## 🏗️ Tech Stack

### Backend
- Django
- Django REST Framework
- SimpleJWT Authentication
- SQLite / PostgreSQL (configurable)

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Material UI (MUI)
- React Toastify

---

## 📁 Project Structure
TaskManagementSystem/
│
├── backend/
│ ├── config/
│ ├── tasks/
│ ├── manage.py
│ ├── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│
└── README.md

---
## Prerequisites

### PostgreSQL Setup
This project requires **PostgreSQL** (v14 or higher recommended). 

1. **Install PostgreSQL:**
   * **Windows/macOS:** Download the installer from the [Official PostgreSQL Website](https://www.postgresql.org/download/).
   * **Linux (Ubuntu/Debian):** Run `sudo apt update && sudo apt install postgresql postgresql-contrib`.

2. **Create Database and User:**
   Open your terminal or `psql` console and run:
   ```sql
   CREATE DATABASE task_management;
   CREATE USER your_user WITH PASSWORD 'DB_USER';
   GRANT ALL PRIVILEGES ON DATABASE task_management TO DB_USER;
   ```
Note: Replace `DB_USER` and `DB_PASSWORD` with your desired credentials.
Note: If no database credentials are provided in the .env file, the application will automatically fall back to using an internal SQLite database for development purposes.

## ⚙️ Backend Setup (Django)

### 1. Create virtual environment
```bash
python -m venv venv
```

### 2. Create virtual environment
Windows:

venv\Scripts\activate
cd backend
Mac/Linux:

source venv/bin/activate
cd backend 
### 3. Install dependencies 
```bash
pip install -r requirements.txt
```

### 4. Create a .env file in the backend directory and add the following: 
```bash 
touch .env   #linux
New-Item .env #windows
 
DB_ENGINE=postgresql
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

### 5. Apply migrations
```bash
python manage.py migrate
```

### 6. Create superuser   #Creds Will be Used for Login to FrontEnd UI
```bash
python manage.py createsuperuser
```

### 7. Run the development server
```bash
python manage.py runserver
```
Backend runs at:

http://127.0.0.1:8000/


## 📁 Frontend Setup (React + Vite) new Terminal cd frontend

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Frontend runs at:

http://localhost:5173/

if its blank try these commands:
```bash
npm install vite@5.4.0
rm -rf node_modules package-lock.json node_modules/.vite
npm cache clean --force
npm install
npm install @emotion/react @emotion/styled
npm run dev
```

🔗 API Endpoints
### 📌 Task Management
Core endpoints used to manage, track, and manipulate task data.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks/` | Retrieve a list of all visible tasks. | Authenticated |
| `POST` | `/api/tasks/` | Create and append a brand-new task. | Authenticated |
| `GET` | `/api/tasks/{id}/` | Fetch full profile data for a specific task. | Authenticated |
| `PUT` | `/api/tasks/{id}/` | Update all field data for a specific task. | Assigned/Admin |
| `DELETE` | `/api/tasks/{id}/` | Permanently wipe a task record from storage. | Assigned/Admin |


### 📂 Categories & 💬 Comments
Endpoints handling structural organization and communication data layers.

| Feature | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Categories** | `GET` | `/api/categories/` | Fetch array of all organizational categories. |
| **Categories** | `POST` | `/api/categories/` | Create a new structural division tag. |
| **Categories** | `PUT` | `/api/categories/{id}/` | Mutate metadata tags or category names. |
| **Categories** | `DELETE`| `/api/categories/{id}/` | Purge a structural category tag. |
| **Comments** | `GET` | `/api/tasks/{id}/comments/` | Fetch nested discussion feed for a single task. |
| **Comments** | `POST` | `/api/tasks/{id}/comments/` | Post live textual feedback directly to a task. |
| **Comments** | `DELETE`| `/api/comments/{id}/` | Remove a specific comment line *(Author only)*. |


### 📊 Intelligence Analytics
Data stream used to power operational reporting elements on the client dashboard interface.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard/stats/` | Serves real-time data metrics (total, pending, progress, done). | Authenticated |


## 🧠 System Business Logic & Permissions

### 👥 User Access Rights Matrix
To ensure data security and integrity, actions within the application are guarded by strict role-based constraints:

* **Task Visibility:** All authenticated users can view all tasks within the system to ensure team alignment.
* **Modification Controls:** Only the **Assigned User** of a task or an **Admin/Superuser** has permission to:
  * Edit task details (title, description, due date, priority).
  * Change task status or category attachments.
  * Delete the task entirely.
* **Collaboration Lines:** *Any* authenticated user can post comments on any task, but a user can only delete their own comments.
Built as a full-stack learning + production-ready project using Django & React.

### 🔄 Core Workflow Rules
1. **Organizational Guardrails:** Categories function as structural dividers. Tasks must be mapped intelligently to categories to maintain clean filtering options across the client UI.
2. **Dynamic Metrics Synchronization:** Every time a task is created, status-updated, or deleted, the dashboard analytics update dynamically via the `/api/dashboard/stats/` microservice hook.
3. **Data Cascading Rules:** Deleting a category will clean up its metadata, but it will not delete the underlying tasks—ensuring your data remains safe from accidental bulk deletion.