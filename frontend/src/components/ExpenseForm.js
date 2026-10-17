import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { getErrorMessage } from "../services/api";
import { todayString } from "../utils/format";

// A popup form used for both adding and editing an expense.

const ExpenseForm = ({ expense, categories, onSave, onClose }) => {
  const [title, setTitle] = useState(expense ? expense.title : "");
  const [amount, setAmount] = useState(expense ? String(expense.amount) : "");
  const [category, setCategory] = useState(expense ? expense.category : categories[0]);
  const [date, setDate] = useState(expense ? expense.date.slice(0, 10) : todayString());
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Please enter a title.");
    if (!(Number(amount) > 0)) return setError("Amount must be greater than 0.");
    if (!date) return setError("Please pick a date.");

    setSaving(true);
    try {
      await onSave({ title: title.trim(), amount: Number(amount), category, date });
    } catch (err) {
      setError(getErrorMessage(err, "Could not save the expense."));
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="modal-head">
          <h2 id="form-title" className="modal-title">
            {expense ? "Edit expense" : "Add expense"}
          </h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        <label className="field">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Lunch at the canteen"
            maxLength={100}
            autoFocus
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Amount (₹)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
            />
          </label>

          <label className="field">
            <span>Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>

        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : expense ? "Save changes" : "Add expense"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
