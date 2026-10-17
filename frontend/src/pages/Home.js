import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className="page home">
      <section className="home-hero">
        <div className="home-copy">
          <h1>Know where every rupee goes.</h1>
          <p className="home-lead">
            Add an expense in a few seconds, filter by category or date, and see your spending
            laid out clearly, all in one place.
          </p>

          <div className="home-buttons">
            {user ? (
              <Link to="/expenses" className="btn btn-primary">
                Open my expenses
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Create free account
                </Link>
                <Link to="/login" className="btn btn-ghost">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>

        {/* A static preview of the dashboard, with sample data */}
        <div className="home-preview" aria-hidden="true">
          <div className="preview-panel">
            <p className="preview-label">Total spent</p>
            <p className="preview-total">₹12,480</p>
            <div className="preview-donut" />
          </div>
          <ul className="preview-list">
            <li>
              <span className="preview-dot" style={{ background: "#f59e0b" }} />
              Groceries <b>₹1,240</b>
            </li>
            <li>
              <span className="preview-dot" style={{ background: "#2f7df6" }} />
              Metro recharge <b>₹500</b>
            </li>
            <li>
              <span className="preview-dot" style={{ background: "#0ea596" }} />
              Electricity bill <b>₹2,130</b>
            </li>
          </ul>
          <p className="preview-note">Sample data</p>
        </div>
      </section>

      <section className="home-points">
        <div>
          <h3>Quick to log</h3>
          <p>Title, amount, category, date. That is all it takes to add an expense.</p>
        </div>
        <div>
          <h3>Easy to find</h3>
          <p>Search by name or narrow things down by category and date range.</p>
        </div>
        <div>
          <h3>Clear at a glance</h3>
          <p>A chart shows which categories take the biggest share of your money.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
