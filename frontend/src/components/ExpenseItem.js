import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getCategoryColor } from "../utils/categories";
import { formatDate, formatMoney } from "../utils/format";

// One row in the expense list.
const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const color = getCategoryColor(expense.category);

  return (
    <li className="expense-item">
      <span className="expense-tile" style={{ background: `${color}22`, color }} aria-hidden="true">
        {expense.category.charAt(0)}
      </span>

      <div className="expense-main">
        <p className="expense-title">{expense.title}</p>
        <p className="expense-meta">
          {expense.category}, {formatDate(expense.date)}
        </p>
      </div>

      <p className="expense-amount">{formatMoney(expense.amount)}</p>

      <div className="expense-actions">
        <button className="icon-btn" onClick={() => onEdit(expense)} aria-label={`Edit ${expense.title}`}>
          <FiEdit2 />
        </button>
        <button
          className="icon-btn icon-btn-danger"
          onClick={() => onDelete(expense)}
          aria-label={`Delete ${expense.title}`}
        >
          <FiTrash2 />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
