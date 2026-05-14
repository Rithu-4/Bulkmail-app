# Bulk Mail Application

A Full Stack MERN Bulk Mail Application built with React, Node.js, Express, and MongoDB. This project allows users to send bulk emails to multiple recipients through a simple and responsive web interface.

## Features

* Send emails to multiple recipients
* User-friendly React frontend
* REST API using Express.js
* Email integration with Nodemailer
* MongoDB Atlas database connection
* Success and error status handling
* Secure environment variables using `.env`
* Fully deployed using Render and Vercel

## Tech Stack

* React + Vite
* Node.js
* Express.js
* MongoDB Atlas
* Nodemailer
* Axios

## Installation

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
MONGODB_URL=your_mongodb_connection_string
```

## Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Database hosted on MongoDB Atlas
