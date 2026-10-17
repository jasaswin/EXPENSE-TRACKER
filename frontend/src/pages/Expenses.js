import { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getErrorMessage,
} from "../services/api";
import { CATEGORIES } from "../utils/categories";
import SummaryPanel from "../components/SummaryPanel";
import ExpenseFilters from "../components/ExpenseFilters";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseForm from "../components/ExpenseForm";
import ConfirmDialog from "../components/ConfirmDialog";
import "./Expenses.css";

const NO_FILTERS = { search: "", category: "", startDate: "", endDate: "" };

const Expenses = () => {
  const { user } = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [filters, setFilters] = useState(NO_FILTERS);

  const [formOpen, setFormOpen] = useState(false); // is the add/edit popup open?
  const [editing, setEditing] = useState(null); // the expense being edited (null = adding)
  const [deleting, setDeleting] = useState(null); // the expense waiting for delete confirmation
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // ---------- Load expenses ----------
  const loadExpenses = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      setLoadError(getErrorMessage(err, "Could not load your expenses."));
    } finally {
      setLoading(false);
    }
  };

  // Load once when the page opens
  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Filtering ----------
  const hasFilters = Object.values(filters).some(Boolean);

  const search = filters.search.trim().toLowerCase();

  const visibleExpenses = expenses
    .filter((e) => {
      const day = e.date.slice(0, 10); // YYYY-MM-DD
      if (search && !e.title.toLowerCase().includes(search)) return false;
      if (filters.category && e.category !== filters.category) return false;
      if (filters.startDate && day < filters.startDate) return false;
      if (filters.endDate && day > filters.endDate) return false;
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first

  // Category list = the standard ones + any other category found in saved expenses
  const categoryNames = CATEGORIES.map((c) => c.name);
  expenses.forEach((e) => {
    if (!categoryNames.includes(e.category)) categoryNames.push(e.category);
  });

  // ---------- Add / edit ----------
  const openAddForm = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEditForm = (expense) => {
    setEditing(expense);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  // The form shows its own error message if this throws.
  const saveExpense = async (data) => {
    if (editing) {
      const res = await updateExpense(editing._id, data);
      setExpenses((list) => list.map((e) => (e._id === editing._id ? res.data.expense : e)));
    } else {
      const res = await addExpense(data);
      setExpenses((list) => [res.data.expense, ...list]);
    }
    closeForm();
  };

  // ---------- Delete ----------
  const cancelDelete = () => {
    setDeleting(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    setDeleteError("");
    try {
      await deleteExpense(deleting._id);
      setExpenses((list) => list.filter((e) => e._id !== deleting._id));
      setDeleting(null);
    } catch (err) {
      setDeleteError(getErrorMessage(err, "Could not delete the expense."));
    } finally {
      setDeleteBusy(false);
    }
  };

  const firstName = user?.name?.split(" ")[0];

  return (
    <main className="page">
      <div className="expenses-head">
        <h1>Hi {firstName}, here is your spending</h1>
        <button className="btn btn-primary" onClick={openAddForm}>
          <FiPlus aria-hidden="true" /> Add expense
        </button>
      </div>

      {loading ? (
        <p className="state-message">Loading your expenses…</p>
      ) : loadError ? (
        <div className="state-box">
          <p className="form-error" role="alert">{loadError}</p>
          <button className="btn btn-ghost" onClick={loadExpenses}>
            Try again
          </button>
        </div>
      ) : expenses.length === 0 ? (
        <div className="state-box">
          <h2>No expenses yet</h2>
          <p>Add your first expense and your summary will appear here.</p>
          <button className="btn btn-primary" onClick={openAddForm}>
            <FiPlus aria-hidden="true" /> Add your first expense
          </button>
        </div>
      ) : (
        <>
          <SummaryPanel
            expenses={visibleExpenses}
            allExpenses={expenses}
            hasFilters={hasFilters}
          />

          <ExpenseFilters
            filters={filters}
            categories={categoryNames}
            onChange={setFilters}
            onClear={() => setFilters(NO_FILTERS)}
            hasFilters={hasFilters}
          />

          {visibleExpenses.length > 0 ? (
            <ul className="expense-list">
              {visibleExpenses.map((expense) => (
                <ExpenseItem
                  key={expense._id}
                  expense={expense}
                  onEdit={openEditForm}
                  onDelete={setDeleting}
                />
              ))}
            </ul>
          ) : (
            <div className="state-box">
              <h2>Nothing matches these filters</h2>
              <p>Try a different search, category or date range.</p>
              <button className="btn btn-ghost" onClick={() => setFilters(NO_FILTERS)}>
                Clear filters
              </button>
            </div>
          )}
        </>
      )}

      {formOpen && (
        <ExpenseForm
          expense={editing}
          categories={categoryNames}
          onSave={saveExpense}
          onClose={closeForm}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this expense?"
          message={`"${deleting.title}" will be removed permanently.`}
          confirmText="Delete"
          busy={deleteBusy}
          error={deleteError}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </main>
  );
};

export default Expenses;
