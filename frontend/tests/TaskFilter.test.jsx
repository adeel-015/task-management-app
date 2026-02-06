import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskFilter from "../src/components/tasks/TaskFilter";

const mockFilters = {
  status: "all",
  search: "",
  startDate: "",
  endDate: "",
  page: 1,
  limit: 10,
};

const renderTaskFilter = (filters = mockFilters, onFilterChange = vi.fn()) => {
  return render(
    <TaskFilter filters={filters} onFilterChange={onFilterChange} />,
  );
};

describe("TaskFilter Component", () => {
  it("should render all filter inputs", () => {
    renderTaskFilter();

    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
  });

  it("should have status filter options", () => {
    renderTaskFilter();

    const statusSelect = screen.getByLabelText("Status");
    expect(statusSelect).toHaveTextContent("All Status");
    expect(statusSelect).toHaveTextContent("Pending");
    expect(statusSelect).toHaveTextContent("In Progress");
    expect(statusSelect).toHaveTextContent("Completed");
  });

  it("should call onFilterChange when status changes", () => {
    const onFilterChange = vi.fn();
    renderTaskFilter(mockFilters, onFilterChange);

    const statusSelect = screen.getByLabelText("Status");
    fireEvent.change(statusSelect, { target: { value: "completed" } });

    expect(onFilterChange).toHaveBeenCalledWith({ status: "completed" });
  });

  it("should call onFilterChange when search changes", () => {
    const onFilterChange = vi.fn();
    renderTaskFilter(mockFilters, onFilterChange);

    const searchInput = screen.getByPlaceholderText("Search tasks...");
    fireEvent.change(searchInput, { target: { value: "urgent" } });

    expect(onFilterChange).toHaveBeenCalledWith({ search: "urgent" });
  });

  it("should call onFilterChange when start date changes", () => {
    const onFilterChange = vi.fn();
    renderTaskFilter(mockFilters, onFilterChange);

    const startDateInput = screen.getByLabelText("Start Date");
    fireEvent.change(startDateInput, { target: { value: "2024-01-01" } });

    expect(onFilterChange).toHaveBeenCalledWith({ startDate: "2024-01-01" });
  });

  it("should call onFilterChange when end date changes", () => {
    const onFilterChange = vi.fn();
    renderTaskFilter(mockFilters, onFilterChange);

    const endDateInput = screen.getByLabelText("End Date");
    fireEvent.change(endDateInput, { target: { value: "2024-01-31" } });

    expect(onFilterChange).toHaveBeenCalledWith({ endDate: "2024-01-31" });
  });

  it("should clear all filters when clear button is clicked", () => {
    const onFilterChange = vi.fn();
    const activeFilters = {
      status: "completed",
      search: "task",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      page: 1,
      limit: 10,
    };

    renderTaskFilter(activeFilters, onFilterChange);

    const clearBtn = screen.getByText("Clear Filters");
    fireEvent.click(clearBtn);

    expect(onFilterChange).toHaveBeenCalledWith({
      status: "all",
      search: "",
      startDate: "",
      endDate: "",
      page: 1,
    });
  });

  it("should display current filter values", () => {
    const activeFilters = {
      status: "pending",
      search: "work",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      page: 1,
      limit: 10,
    };

    renderTaskFilter(activeFilters);

    const statusSelect = screen.getByLabelText("Status");
    const searchInput = screen.getByDisplayValue("work");
    const startDateInput = screen.getByDisplayValue("2024-01-01");
    const endDateInput = screen.getByDisplayValue("2024-01-31");

    expect(statusSelect.value).toBe("pending");
    expect(searchInput).toBeInTheDocument();
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
  });

  it("should have search input with correct placeholder", () => {
    renderTaskFilter();

    const searchInput = screen.getByPlaceholderText("Search tasks...");
    expect(searchInput).toBeInTheDocument();
  });

  it("should have clear filters button", () => {
    renderTaskFilter();

    const clearBtn = screen.getByRole("button", { name: "Clear Filters" });
    expect(clearBtn).toBeInTheDocument();
  });
});
