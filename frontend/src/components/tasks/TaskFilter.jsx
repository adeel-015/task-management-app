import React from "react";

const TaskFilter = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
  };

  const handleStartDateChange = (e) => {
    onFilterChange({ startDate: e.target.value });
  };

  const handleEndDateChange = (e) => {
    onFilterChange({ endDate: e.target.value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      status: "all",
      search: "",
      startDate: "",
      endDate: "",
      page: 1,
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-2">
          <label htmlFor="status-filter" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="search-filter" className="text-sm font-medium">
            Search
          </label>
          <input
            type="text"
            id="search-filter"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="start-date-filter" className="text-sm font-medium">
            Start Date
          </label>
          <input
            type="date"
            id="start-date-filter"
            value={filters.startDate || ""}
            onChange={handleStartDateChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="end-date-filter" className="text-sm font-medium">
            End Date
          </label>
          <input
            type="date"
            id="end-date-filter"
            value={filters.endDate || ""}
            onChange={handleEndDateChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleClearFilters}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
