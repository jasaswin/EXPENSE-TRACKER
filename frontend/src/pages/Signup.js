import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signup as signupRequest, getErrorMessage } from "../services/api";
import "./Auth.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      const res = await signupRequest(form);
      // The server logs the new user in right away.
      login(res.data.token, res.data.user);
      navigate("/expenses");
    } catch (err) {
      setError(getErrorMessage(err, "Could not create your account."));
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <aside className="auth-side">
        <h2>Start tracking today.</h2>
        <p>Create an account and add your first expense in under a minute.</p>
      </aside>

      <div className="auth-main">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <p className="auth-sub">It is free and takes a few seconds.</p>

          <label className="field">
            <span>Full name</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

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
            <span>Password (at least 6 characters)</span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;
