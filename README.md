# Expense Tracker

A simple full-stack app to track your daily spending.

- Sign up and log in
- Add, edit and delete expenses
- Search and filter by category or date
- See your total, this month's spending and a colourful chart by category

**Built with:** React (frontend), Node.js + Express (backend), MongoDB (database)

```
Expensetracker/
├── backend/     the server (API + database code)
└── frontend/    the website (what you see in the browser)
```

---

## 1. What you need first

1. **Node.js** (version 18 or newer). Download from https://nodejs.org and install it.
   Check it worked by typing `node -v` in a terminal.
2. **A free MongoDB Atlas database**. Get your connection string:
   - Sign up at https://www.mongodb.com/atlas and create a free cluster.
   - Click **Database Access** > add a user with a username and password (remember them).
   - Click **Network Access** > **Add IP Address** > **Allow access from anywhere** > Confirm.
   - Click **Database** > **Connect** > **Drivers** and copy the connection string. It looks like:
     `mongodb+srv://myuser:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your real password. Then add `expense-tracker` right after `.net/`, like this:
     `mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/expense-tracker?retryWrites=true&w=majority`

---

## 2. Set up the backend

Open a terminal in the `backend` folder.

1. Open the file named **`.env`** in a text editor and replace the placeholder values:

   ```
   PORT=5000
   MONGO_URI=paste your connection string here
   JWT_SECRET=type any long random text here
   CLIENT_URL=http://localhost:3000
   ```

2. Run these two commands:

   ```bash
   npm install
   npm run dev
   ```

3. You should see:

   ```
   MongoDB connected
   Server running on port 5000
   ```

Leave this terminal open.

---

## 3. Set up the frontend

Open a **second** terminal in the `frontend` folder and run:

```bash
npm install
npm start
```

Your browser opens at **http://localhost:3000**. Click **Sign up**, create an account, and add your first expense.

---

## Something not working?

| Problem | Fix |
| ------- | --- |
| `MONGO_URI is missing` | The `.env` file must be inside the `backend` folder and have your connection string. |
| `ECONNREFUSED` or timeout when connecting | In MongoDB Atlas > Network Access, allow your IP (or "anywhere"). |
| `bad auth` / authentication failed | The username or password in `MONGO_URI` is wrong. If your password has symbols like `@` or `#`, change it to letters and numbers only. |
| Website says "Cannot reach the server" | The backend is not running. Start it again with `npm run dev` in the `backend` folder. |
| `npm` is not recognized | Node.js is not installed, or restart your terminal after installing it. |
| Port 5000 already in use | Change `PORT` in `backend/.env` (for example 5001) and also change `frontend/.env.development` to `http://localhost:5001/api`. Restart both. |

---

## How the code is organised (for learning)

**Backend** (`backend/src`)

| File | What it does |
| ---- | ------------ |
| `server.js` | Starts the server, connects to the database, sets up routes |
| `config/db.js` | Connects to MongoDB |
| `models/User.js`, `models/Expense.js` | The shape of the data saved in the database |
| `routes/` | Lists the web addresses (like `/api/expenses`) |
| `controllers/` | The code that runs for each address (signup, login, add expense, ...) |
| `middleware/authMiddleware.js` | Checks the user is logged in before allowing expense actions |

**Frontend** (`frontend/src`)

| Folder | What it holds |
| ------ | ------------- |
| `pages/` | The 4 screens: Home, Login, Signup, Expenses (+ their `.css` files) |
| `components/` | Reusable parts: Navbar, expense form, filters, list item, summary chart |
| `services/api.js` | All the calls to the backend in one place |
| `context/AuthContext.js` | Remembers who is logged in |
| `utils/` | Small helpers for money, dates and category colours |
| `index.css` | Colours, fonts, buttons and form styles used everywhere |

To change the look, edit the colours at the top of `frontend/src/index.css`.
To change the categories, edit `frontend/src/utils/categories.js`.

---

## Put it online (optional)

**Backend on Render.com** (free)
1. Upload the project to GitHub.
2. On Render choose **New > Web Service**, pick your repo, set **Root Directory** = `backend`, **Build Command** = `npm install`, **Start Command** = `npm start`.
3. Under Environment add `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` (your frontend's web address, added after step below).
4. Open your Render address. You should see "Expense Tracker API is running".

**Frontend on Vercel or Netlify** (free)
1. Create a new project from the same repo with **Root Directory** = `frontend`.
2. Add the environment variable `REACT_APP_API_URL` = `https://YOUR-BACKEND-NAME.onrender.com/api`
3. Deploy. Then copy the website address into `CLIENT_URL` on Render and redeploy the backend.

**Keep your `.env` file private.** Never upload it to GitHub (the included `.gitignore` already protects it).
