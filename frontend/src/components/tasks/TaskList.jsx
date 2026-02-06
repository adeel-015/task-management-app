import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import taskService from "../../services/taskService.js";
import { showError } from "../../utils/toast.js";
import TaskItem from "./TaskItem.jsx";
import TaskFilter from "./TaskFilter.jsx";
import Loader from "../common/Loader.jsx";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {
        page: filters.page,
        limit: filters.limit,
      };

      if (filters.status !== "all") {
        params.status = filters.status;
      }
      if (filters.search) {
        params.search = filters.search;
      }
      if (filters.startDate) {
        params.startDate = filters.startDate;
      }
      if (filters.endDate) {
        params.endDate = filters.endDate;
      }

      const response = await taskService.getTasks(params);
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (error) {
      showError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  if (loading && tasks.length === 0) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">My Tasks</h1>
          <p className="mt-2 text-sm text-slate-600">
            Keep your priorities clear and your progress visible.
          </p>
        </div>
        <Link
          to="/tasks/new"
          className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
        >
          + New Task
        </Link>
      </div>

      <TaskFilter filters={filters} onFilterChange={handleFilterChange} />

      {loading && tasks.length > 0 && (
        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
          <Loader size="small" />
        </div>
      )}

      {!loading && tasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm">
          <div className="text-4xl">📭</div>
          <p className="mt-4 text-lg font-semibold text-slate-800">
            No tasks found
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Create a new task to get your momentum started.
          </p>
          <Link
            to="/tasks/new"
            className="mt-6 inline-flex rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
          >
            Create your first task
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={handleTaskDelete} />
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
              <button
                disabled={filters.page === 1}
                onClick={() => handleFilterChange({ page: filters.page - 1 })}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ← Previous
              </button>

              <span>
                Page <span className="font-semibold">{pagination.page}</span> of{" "}
                <span className="font-semibold">{pagination.pages}</span>
              </span>

              <button
                disabled={filters.page === pagination.pages}
                onClick={() => handleFilterChange({ page: filters.page + 1 })}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
