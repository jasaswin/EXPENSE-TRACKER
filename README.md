# 💰 ExpenseTracker — Personal Expense Management

**ExpenseTracker** is a full-stack web application that helps users manage personal expenses, monitor spending patterns, and organize transactions through an intuitive dashboard. Built with React.js, Node.js, Express.js, and MongoDB.

<p align="center">
  <a href="https://expense-tracker-eight-iota-29.vercel.app/">
    <strong>🌐 Live Demo</strong>
  </a>
  &nbsp; | &nbsp;
  <a href="https://github.com/jasaswin/EXPENSE-TRACKER">
    <strong>💻 GitHub Repository</strong>
  </a>
</p>

## 🚀 Live Deployment

| Component | Platform | URL |
|---|---|---|
| Frontend | Vercel | [Open ExpenseTracker](https://expense-tracker-eight-iota-29.vercel.app/) |
| Backend API | Render | [Open Backend](https://expense-tracker-suya.onrender.com) |
| Database | MongoDB Atlas | Cloud-hosted MongoDB |

> **Note:** The frontend and backend deployments have been created successfully. Login, registration, and expense operations should be tested on the live website to verify end-to-end functionality.

## ✨ Features

- **User Authentication:** User registration and login with JWT-based authentication.
- **Expense Management:** Create, view, update, and delete expense records.
- **Interactive Dashboard:** View spending summaries and expense breakdowns.
- **Category-wise Tracking:** Organize expenses by category.
- **Search and Filtering:** Find expenses using available search and filter options.
- **Persistent Storage:** Store expense records in MongoDB.
- **RESTful API:** Communicate between the React frontend and Express backend.
- **Responsive Interface:** Access the application from supported desktop and mobile browsers.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, React Router |
| Styling | CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| API Communication | Axios, REST API |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Version Control | Git, GitHub |

## 📁 Project Structure

```text
EXPENSE-TRACKER/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   ├── .env.development
│   └── package.json
│
├── .gitignore
└── README.md
```



## ⚙️ Prerequisites

Install the following before running the project locally:

- [Node.js](https://nodejs.org/) (version 18 or newer)
- npm
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance
- [Git](https://git-scm.com/)

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/jasaswin/EXPENSE-TRACKER.git
cd EXPENSE-TRACKER
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
CLIENT_URL=http://localhost:3000
```

Replace the placeholder values with your actual configuration.

Generate a secure JWT secret using:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Ensure your MongoDB connection string uses the correct database username, password, cluster address, and database name. URL-encode special characters in the username or password when required.

### 3. Start the backend

From the `backend` directory, run:

```bash
npm run dev
```

The backend should start on:

```text
http://localhost:5000
```

Confirm that MongoDB connects successfully in the terminal.

### 4. Set up the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

Create or update `frontend/.env.development`:

```dotenv
REACT_APP_API_URL=http://localhost:5000/api
```

This configures the React application to use your local Express API.

### 5. Start the frontend

From the `frontend` directory:

```bash
npm start
```

Open the application at:

**http://localhost:3000**

Keep both terminal sessions running while using the application.

## 🔌 Backend API

The backend API is deployed at:

`https://expense-tracker-suya.onrender.com`

The API base path used by the frontend is:

`https://expense-tracker-suya.onrender.com/api`

Typical REST API operations may include:

| Method | Purpose |
|---|---|
| `POST` | Register or authenticate users; create expenses |
| `GET` | Retrieve expense records or summaries |
| `PUT` | Update expense records |
| `DELETE` | Delete expense records |

The exact endpoint paths depend on the routes implemented in the backend source code.

## 🌍 Deployment

### Backend — Render

The Express.js backend is deployed on Render.

1. Connect the GitHub repository to Render.
2. Set the root directory to `backend`.
3. Set the build command to `npm install`.
4. Set the start command to `npm start`.
5. Configure the required environment variables.
6. Confirm that MongoDB Atlas allows the deployed backend to connect.

Required environment variables:

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `CLIENT_URL` | Allowed frontend origin for CORS |
| `PORT` | Server port; Render provides this for web services |

### Frontend — Vercel

The React frontend is deployed on Vercel.

1. Import the GitHub repository.
2. Select `frontend` as the root directory.
3. Use `npm run build` as the build command.
4. Use `build` as the output directory.
5. Add the environment variable below.
6. Deploy the application.

```dotenv
REACT_APP_API_URL=https://expense-tracker-suya.onrender.com/api
```

After deployment, ensure the backend's `CLIENT_URL` matches the actual Vercel production URL and that CORS is configured correctly.

