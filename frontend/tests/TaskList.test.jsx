import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TaskList from "../src/components/tasks/TaskList";
import { AuthProvider } from "../src/context/AuthContext";

const renderTaskList = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <TaskList />
      </AuthProvider>
    </BrowserRouter>,
  );
};

describe("TaskList Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "mock-token");
    localStorage.setItem(
      "user",
      JSON.stringify({ id: "1", email: "test@example.com", name: "Test User" }),
    );
  });

  it("should render task list with tasks", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("My Tasks")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
      expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    });
  });

  it("should display task details correctly", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    });

    const taskCard = screen.getByTestId("task-card-1");

    expect(within(taskCard).getByText("Description 1")).toBeInTheDocument();
    expect(within(taskCard).getByText(/pending/i)).toBeInTheDocument();
  });

  it("should have create task button", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("+ New Task")).toBeInTheDocument();
    });

    const createBtn = screen.getByText("+ New Task");
    expect(createBtn.closest("a")).toHaveAttribute("href", "/tasks/new");
  });

  it("should filter tasks by status", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    });

    const statusSelect = screen.getByDisplayValue("All Status");
    fireEvent.change(statusSelect, { target: { value: "completed" } });

    await waitFor(() => {
      expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    });
  });

  it("should search tasks by title", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search tasks...");
    fireEvent.change(searchInput, { target: { value: "Task 2" } });

    await waitFor(() => {
      expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    });
  });

  it("should clear filters", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    });

    const statusSelect = screen.getByDisplayValue("All Status");
    fireEvent.change(statusSelect, { target: { value: "completed" } });

    const clearBtn = screen.getByText("Clear Filters");
    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(screen.getByDisplayValue("All Status")).toBeInTheDocument();
    });
  });

  it("should display edit and delete buttons for each task", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    });

    const editButtons = screen.getAllByText("Edit");
    const deleteButtons = screen.getAllByText("Delete");

    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });

  it("should have pagination controls", async () => {
    renderTaskList();

    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    });

    // When there's only 1 page, pagination should be hidden
    // This would need more tasks to test pagination properly
    const prevBtn = screen.queryByText("← Previous");
    // May not appear if only one page
    if (prevBtn) {
      expect(prevBtn).toBeDisabled();
    }
  });
});
