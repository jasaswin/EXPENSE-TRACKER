import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as loginRequest, getErrorMessage } from "../services/api";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Already logged in? Go straight to the expenses page.
  if (user) return <Navigate to="/expenses" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginRequest(form);
      login(res.data.token, res.data.user);
      navigate("/expenses");
    } catch (err) {
      setError(getErrorMessage(err, "Could not log in."));
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <aside className="auth-side">
        <h2>Welcome back.</h2>
        <p>Pick up where you left off and see how this month is going.</p>
      </aside>

      <div className="auth-main">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <p className="auth-sub">Enter your email and password to continue.</p>

          <label className="field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>

          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
