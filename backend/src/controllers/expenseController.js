import Expense from "../models/Expense.js";


const readExpenseFields = (body) => {
  const title = String(body.title || "").trim();
  const amount = Number(body.amount);
  const category = String(body.category || "").trim();
  const date = body.date ? new Date(body.date) : new Date();

  if (!title) return { error: "Title is required" };
  if (title.length > 100) return { error: "Title must be 100 characters or less" };
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Amount must be a number greater than 0" };
  }
  if (!category) return { error: "Category is required" };
  if (Number.isNaN(date.getTime())) return { error: "Date is not valid" };

  return { data: { title, amount, category, date } };
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// POST /api/expenses
export const addExpense = async (req, res) => {
  const { data, error } = readExpenseFields(req.body);
  if (error) return res.status(400).json({ message: error });

  const expense = await Expense.create({ ...data, user: req.user._id });
  res.status(201).json({ message: "Expense added", expense });
};


export const getExpenses = async (req, res) => {
  const { category, startDate, endDate, search } = req.query;
  const filter = { user: req.user._id };

  if (category) filter.category = String(category);
  if (search) filter.title = { $regex: escapeRegex(String(search)), $options: "i" };

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999); // include the whole end day
      filter.date.$lte = end;
    }
  }

  const expenses = await Expense.find(filter).sort({ date: -1, createdAt: -1 });
  res.json(expenses);
};

// PUT /api/expenses/:id
export const updateExpense = async (req, res) => {
  const { data, error } = readExpenseFields(req.body);
  if (error) return res.status(400).json({ message: error });

  // Only the owner can edit, and only the 4 known fields are saved.
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    data,
    { new: true, runValidators: true }
  );

  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json({ message: "Expense updated", expense });
};

// DELETE /api/expenses/:id
export const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!expense) return res.status(404).json({ message: "Expense not found" });
  res.json({ message: "Expense deleted" });
};

// GET /api/expenses/summary  ->  totals per category
export const getSummary = async (req, res) => {
  const summary = await Expense.aggregate([
    { $match: { user: req.user._id } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
  ]);

  const totalSpent = summary.reduce((sum, item) => sum + item.total, 0);
  res.json({ summary, totalSpent });
};
