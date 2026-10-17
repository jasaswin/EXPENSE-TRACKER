import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { getCategoryColor } from "../utils/categories";
import { formatMoney, todayString } from "../utils/format";

ChartJS.register(ArcElement, Tooltip);

// The dark panel at the top: total spent, a few quick numbers, and a chart by category.

const SummaryPanel = ({ expenses, allExpenses, hasFilters }) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Total for each category
  const totals = {};
  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });
  const rows = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  // Spending in the current month (always uses all expenses, not the filtered ones)
  const thisMonth = todayString().slice(0, 7);
  const monthTotal = allExpenses
    .filter((e) => e.date.slice(0, 7) === thisMonth)
    .reduce((sum, e) => sum + e.amount, 0);

  const chartData = {
    labels: rows.map(([name]) => name),
    datasets: [
      {
        data: rows.map(([, value]) => value),
        backgroundColor: rows.map(([name]) => getCategoryColor(name)),
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (item) => ` ${item.label}: ${formatMoney(item.parsed)}` } },
    },
  };

  return (
    <section className="summary" aria-label="Spending summary">
      <div className="summary-numbers">
        <p className="summary-label">{hasFilters ? "Total for these filters" : "Total spent"}</p>
        <p className="summary-total">{formatMoney(total)}</p>

        <dl className="summary-stats">
          <div>
            <dt>This month</dt>
            <dd>{formatMoney(monthTotal)}</dd>
          </div>
          <div>
            <dt>Expenses</dt>
            <dd>{expenses.length}</dd>
          </div>
          <div>
            <dt>Top category</dt>
            <dd>{rows.length ? rows[0][0] : "None yet"}</dd>
          </div>
        </dl>
      </div>

      <div className="summary-chart">
        {rows.length > 0 ? (
          <>
            <div className="chart-box">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
            <ul className="legend">
              {rows.map(([name, value]) => (
                <li key={name}>
                  <span className="legend-dot" style={{ background: getCategoryColor(name) }} />
                  <span className="legend-name">{name}</span>
                  <span className="legend-value">{formatMoney(value)}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="summary-empty">Your spending by category will show up here.</p>
        )}
      </div>
    </section>
  );
};

export default SummaryPanel;
