import { FiSearch } from "react-icons/fi";

// Search box, category dropdown and date range.

const ExpenseFilters = ({ filters, categories, onChange, onClear, hasFilters }) => {
  const handleChange = (e) => onChange({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="filters">
      <label className="search-box">
        <FiSearch aria-hidden="true" />
        <input
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search by title"
          aria-label="Search by title"
        />
      </label>

      <select name="category" value={filters.category} onChange={handleChange} aria-label="Category">
        <option value="">All categories</option>
        {categories.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <label className="date-filter">
        <span>From</span>
        <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
      </label>

      <label className="date-filter">
        <span>To</span>
        <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
      </label>

      {hasFilters && (
        <button className="btn btn-ghost btn-small" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
};

export default ExpenseFilters;
