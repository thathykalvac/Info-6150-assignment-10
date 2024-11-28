# Info-6150-assignment-10

# Job Portal Application

## Overview

The **Job Portal Application** is a full-stack project designed to manage users and jobs with role-based access. The application provides distinct portals for **Admins** and **Employees**, ensuring a secure and functional interface for managing jobs and browsing opportunities.

---

## Backend Implementation

The backend is built using **Node.js** and **Express.js** with **MongoDB** as the database. It includes robust APIs for user authentication, job management, and dynamic data retrieval.

### Features:

- **Authentication**: JWT-based user authentication.
- **Role-Based Access**: Separate APIs and routes for Admins and Employees.
- **Dynamic Data**: Fetch jobs and companies dynamically from MongoDB.
- **CRUD Operations**: Admins can create jobs and manage user data.

### API Endpoints:

#### Authentication
- `POST /api/login`: User login with email and password. Returns a JWT token.

#### Admin-Specific APIs
- `POST /api/create/job`: Allows Admins to create a job posting.
- `GET /api/users`: Retrieves all users except their passwords.

#### Employee-Specific APIs
- `GET /api/jobs`: Fetches paginated job listings posted by Admins.

#### Common APIs
- `GET /api/companies`: Fetches unique organizations and their profile images.

---

## Frontend Implementation

The frontend is built using **React**, **Redux**, and **Material-UI** to provide a modern, responsive interface.

### Features:

- **Role-Based Navigation**:
  - Employees see pages like Home, Job Listings, and Company Showcase.
  - Admins access job creation and employee management pages.
- **Protected Routes**:
  - Pages are accessible only after login.
  - Navigation updates dynamically based on user roles.
- **Pagination**:
  - Employee job listings support pagination for large datasets.
- **Dynamic Data Rendering**:
  - Jobs and companies are fetched and displayed dynamically.

### Pages and Components:

#### Employee Portal
- **Home**: General introduction and navigation links.
- **Job Listings**: Displays job opportunities with pagination.
- **Company Showcase**: Showcases organizations with profile images.
- **Contact**: A contact page for user inquiries.
- **About**: Information about the portal.

#### Admin Portal
- **Employee Management**: Displays all users (Admins and Employees) in a table.
- **Add Job**: Form to create and add job postings.

---

## How the Project Works

### Authentication
1. Users log in using the `/api/login` endpoint.
2. Based on the JWT token, users are redirected to Admin or Employee portals.

### Admin Flow
- **Add Jobs**: Admins can use a form to post new jobs. The job data is sent to the backend API (`/api/create/job`).
- **Manage Employees**: View a table of users fetched from the `/api/users` endpoint.

### Employee Flow
- **Browse Jobs**: Employees fetch job listings dynamically using `/api/jobs`.
- **View Companies**: Employees can see company details on the Company Showcase page.

---

## Technologies Used

### Backend
- **Node.js**: Server runtime.
- **Express.js**: Web framework.
- **MongoDB**: NoSQL database for storing users and jobs.
- **JWT**: Secure user authentication.

### Frontend
- **React**: Component-based UI.
- **Redux**: State management.
- **Material-UI**: Pre-styled React components.
- **React Router**: Navigation and route protection.

---

## Installation and Setup

### Prerequisites:
- Node.js and npm installed.
- MongoDB connection string.

### Steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/job-portal.git
   cd job-portal
