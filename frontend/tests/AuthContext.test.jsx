import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

// Test component that uses the auth context
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <div>{isAuthenticated ? "Authenticated" : "Not Authenticated"}</div>
      {user && <div>User: {user.email}</div>}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should provide auth context to children", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText("Not Authenticated")).toBeInTheDocument();
  });

  it("should restore authentication from localStorage", async () => {
    const mockUser = { id: "1", email: "test@example.com", name: "Test User" };
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText("Authenticated")).toBeInTheDocument();
    expect(
      await screen.findByText("User: test@example.com"),
    ).toBeInTheDocument();
  });

  it("should logout and clear storage", () => {
    const mockUser = { id: "1", email: "test@example.com", name: "Test User" };
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(mockUser));

    const { rerender } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText("Authenticated")).toBeInTheDocument();

    const logoutBtn = screen.getByText("Logout");
    fireEvent.click(logoutBtn);

    rerender(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText("Not Authenticated")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
