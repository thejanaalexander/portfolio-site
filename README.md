# Portfolio Website Development Environment

This project contains a modular development environment for a Portfolio Website and Admin Panel.

## Directory Structure

- `public/`: Main frontend files (HTML, CSS, JS) with Bootstrap 5.
- `backend/`: PHP scripts and Database connection.
- `admin/`: Admin panel interface.
- `frontend/react-app/`: ReactJS application (Vite).
- `frontend/angular-app/`: Angular application.

## Prerequisites

- **PHP**: Ensure you have PHP installed and added to your PATH.
- **MySQL**: Ensure MySQL is running on **Port 3307**.
- **Node.js & npm**: Required for React and Angular.

## Database Setup

1. Create a database named `portfolio_db`.
2. The connection is configured in `backend/config.php`.
   - Host: `localhost`
   - Port: `3307`
   - Username: `root`
   - Password: `` (empty by default)

## Getting Started

### 1. Main Website & Admin
Serve the request from the root or verify using a local server (like Apache/XAMPP or PHP built-in server).
To use PHP built-in server:
```bash
php -S localhost:8000 -t .
```
Then visit `http://localhost:8000/public/`

### 2. React Application
Navigate to the React folder and start the dev server:
```bash
cd frontend/react-app
npm install  # (If not already installed)
npm run dev
```
Local URL: `http://localhost:5173/`

### 3. Angular Application
Navigate to the Angular folder and start the dev server:
```bash
cd frontend/angular-app
npm install  # (If not already installed)
ng serve
```
Local URL: `http://localhost:4200/`

## Configuration
- Update `backend/config.php` if your database credentials differ.
