import React, { useState } from "react";
import { Link } from "react-router-dom";
import taskService from "../../services/taskService.js";
import { showError, showSuccess } from "../../utils/toast.js";

const TaskItem = ({ task, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setDeleting(true);
        await taskService.deleteTask(task.id);
        showSuccess("Task deleted successfully");
        onDelete(task.id);
      } catch (error) {
        showError("Failed to delete task");
      } finally {
        setDeleting(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "in-progress":
        return "bg-amber-100 text-amber-700";
      case "pending":
        return "bg-slate-100 text-slate-600";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⟳";
      case "pending":
        return "○";
      default:
        return "";
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lift"
      data-testid={`task-card-${task.id}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
          <p className="mt-1 text-xs text-slate-500">
            Created {formatDate(task.createdAt)}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
            task.status,
          )}`}
        >
          {getStatusIcon(task.status)} {task.status}
        </span>
      </div>

      {task.description && (
        <p className="mt-4 text-sm text-slate-600">{task.description}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Task actions
        </span>
        <div className="flex gap-2">
          <Link
            to={`/tasks/${task.id}/edit`}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
