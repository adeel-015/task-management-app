import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskItem from "../src/components/tasks/TaskItem";

const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  status: "pending",
  userId: "1",
  createdAt: "2024-01-01T12:00:00.000Z",
  updatedAt: "2024-01-01T12:00:00.000Z",
};

const renderTaskItem = (task = mockTask, onDelete = vi.fn()) => {
  return render(
    <BrowserRouter>
      <TaskItem task={task} onDelete={onDelete} />
    </BrowserRouter>,
  );
};

describe("TaskItem Component", () => {
  it("should render task title", () => {
    renderTaskItem();

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should render task description", () => {
    renderTaskItem();

    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should display task status badge", () => {
    renderTaskItem();

    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it("should display correct status color for pending", () => {
    renderTaskItem();

    const statusBadge = screen.getByText(/pending/i);
    expect(statusBadge).toHaveClass("bg-slate-100");
  });

  it("should display correct status color for completed", () => {
    const completedTask = { ...mockTask, status: "completed" };
    renderTaskItem(completedTask);

    const statusBadge = screen.getByText(/completed/i);
    expect(statusBadge).toHaveClass("bg-emerald-100");
  });

  it("should display correct status color for in-progress", () => {
    const inProgressTask = { ...mockTask, status: "in-progress" };
    renderTaskItem(inProgressTask);

    const statusBadge = screen.getByText(/in-progress/i);
    expect(statusBadge).toHaveClass("bg-amber-100");
  });

  it("should display creation date", () => {
    renderTaskItem();

    expect(screen.getByText(/Created Jan 1, 2024/i)).toBeInTheDocument();
  });

  it("should have edit button linking to edit page", () => {
    renderTaskItem();

    const editBtn = screen.getByText("Edit");
    expect(editBtn.closest("a")).toHaveAttribute("href", "/tasks/1/edit");
  });

  it("should have delete button", () => {
    renderTaskItem();

    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("should call onDelete when delete is confirmed", async () => {
    const onDelete = vi.fn();
    window.confirm = vi.fn(() => true);

    renderTaskItem(mockTask, onDelete);

    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith("1");
    });
  });

  it("should not delete when confirmation is rejected", async () => {
    const onDelete = vi.fn();
    window.confirm = vi.fn(() => false);

    renderTaskItem(mockTask, onDelete);

    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(onDelete).not.toHaveBeenCalled();
    });
  });

  it("should show deleting state on delete button", async () => {
    const onDelete = vi.fn();
    window.confirm = vi.fn(() => true);

    renderTaskItem(mockTask, onDelete);

    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);

    // Button should show deleting state briefly
    expect(deleteBtn).toHaveTextContent(/deleting/i);
  });

  it("should handle task without description", () => {
    const taskNoDesc = { ...mockTask, description: null };
    renderTaskItem(taskNoDesc);

    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });
});
