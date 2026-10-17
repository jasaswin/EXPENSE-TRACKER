import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // A full page load clears everything and lands on the home page.
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Expense Tracker home">
          <span className="brand-mark">₹</span>
          <span className="brand-name">Expense Tracker</span>
        </Link>

        <nav className="navbar-links">
          {user ? (
            <>
              <NavLink to="/expenses" className="nav-link">
                My expenses
              </NavLink>
              <span className="avatar" title={user.name} aria-hidden="true">
                {user.name?.charAt(0).toUpperCase()}
              </span>
              <button className="btn btn-ghost btn-small" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary btn-small">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
