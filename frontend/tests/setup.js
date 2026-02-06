import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { vi } from "vitest";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Service Worker setup
export const handlers = [
  // Auth endpoints
  http.post("*/api/auth/login", () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
        },
        token: "mock-token",
      },
    });
  }),

  http.post("*/api/auth/register", () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
        },
        token: "mock-token",
      },
    });
  }),

  http.get("*/api/auth/me", () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: "1",
          email: "test@example.com",
          name: "Test User",
        },
      },
    });
  }),

  // Task endpoints
  http.get("*/api/tasks", () => {
    return HttpResponse.json({
      success: true,
      data: {
        tasks: [
          {
            id: "1",
            title: "Test Task 1",
            description: "Description 1",
            status: "pending",
            userId: "1",
            createdAt: "2024-01-01T12:00:00.000Z",
            updatedAt: "2024-01-01T12:00:00.000Z",
          },
          {
            id: "2",
            title: "Test Task 2",
            description: "Description 2",
            status: "completed",
            userId: "1",
            createdAt: "2024-01-02T12:00:00.000Z",
            updatedAt: "2024-01-02T12:00:00.000Z",
          },
        ],
        pagination: {
          total: 2,
          page: 1,
          limit: 10,
          pages: 1,
        },
      },
    });
  }),

  http.get("*/api/tasks/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      success: true,
      data: {
        task: {
          id,
          title: "Test Task",
          description: "Test Description",
          status: "pending",
          userId: "1",
          createdAt: "2024-01-01T12:00:00.000Z",
          updatedAt: "2024-01-01T12:00:00.000Z",
        },
      },
    });
  }),

  http.post("*/api/tasks", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        success: true,
        message: "Task created successfully",
        data: {
          task: {
            id: "3",
            title: body.title,
            description: body.description,
            status: body.status || "pending",
            userId: "1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      },
      { status: 201 },
    );
  }),

  http.put("*/api/tasks/:id", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      message: "Task updated successfully",
      data: {
        task: {
          id: "1",
          title: body.title || "Test Task",
          description: body.description,
          status: body.status || "pending",
          userId: "1",
          createdAt: "2024-01-01T12:00:00.000Z",
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }),

  http.delete("*/api/tasks/:id", () => {
    return HttpResponse.json({
      success: true,
      message: "Task deleted successfully",
    });
  }),
];

export const server = setupServer(...handlers);

// Start MSW server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

// Reset server after each test
afterEach(() => {
  server.resetHandlers();
});

// Clean up after all tests
afterAll(() => {
  server.close();
});
