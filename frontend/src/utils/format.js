// Shows an amount like ₹1,250 or ₹1,250.50
export const formatMoney = (amount) => {
  const value = Number(amount) || 0;
  const hasDecimals = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
};

// Shows a date like 5 Nov 2025. Dates are stored as UTC, so we read them as UTC too.
// (Otherwise some time zones would show the day before.)
export const formatDate = (dateString) => {
  if (!dateString) return "No date";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

// Today's date as YYYY-MM-DD in the user's own time zone (what <input type="date"> needs).
export const todayString = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};
