// The categories shown in the form and filter, each with its own colour.
export const CATEGORIES = [
  { name: "Food", color: "#f59e0b" },
  { name: "Travel", color: "#2f7df6" },
  { name: "Shopping", color: "#b455e0" },
  { name: "Bills", color: "#0ea596" },
  { name: "Health", color: "#e5484d" },
  { name: "Entertainment", color: "#84cc16" },
  { name: "Other", color: "#8b93b5" },
];

// Old expenses may have a category that is not in the list above, so there is a fallback colour.
export const getCategoryColor = (name) => {
  const found = CATEGORIES.find((c) => c.name === name);
  return found ? found.color : "#8b93b5";
};
