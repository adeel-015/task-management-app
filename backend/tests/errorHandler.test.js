import {
  errorHandler,
  notFoundHandler,
} from "../src/middleware/errorHandler.js";

describe("Error Handler Middleware", () => {
  describe("errorHandler", () => {
    let mockRes;

    beforeEach(() => {
      mockRes = {
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.jsonData = data;
        },
      };
    });

    it("should handle SequelizeValidationError", () => {
      const error = {
        name: "SequelizeValidationError",
        errors: [
          { path: "email", message: "Invalid email format" },
          { path: "password", message: "Password too short" },
        ],
      };

      errorHandler(error, {}, mockRes, () => {});

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Validation failed");
      expect(mockRes.jsonData.errors.length).toBe(2);
    });

    it("should handle SequelizeUniqueConstraintError", () => {
      const error = {
        name: "SequelizeUniqueConstraintError",
        errors: [{ path: "email", message: "Email already exists" }],
      };

      errorHandler(error, {}, mockRes, () => {});

      expect(mockRes.statusCode).toBe(400);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Email already exists");
    });

    it("should handle JsonWebTokenError", () => {
      const error = {
        name: "JsonWebTokenError",
        message: "Invalid token",
      };

      errorHandler(error, {}, mockRes, () => {});

      expect(mockRes.statusCode).toBe(401);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Invalid token");
    });

    it("should handle TokenExpiredError", () => {
      const error = {
        name: "TokenExpiredError",
        message: "Token expired",
      };

      errorHandler(error, {}, mockRes, () => {});

      expect(mockRes.statusCode).toBe(401);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Token has expired");
    });

    it("should handle generic error with statusCode", () => {
      const error = {
        message: "Custom error message",
        statusCode: 403,
      };

      errorHandler(error, {}, mockRes, () => {});

      expect(mockRes.statusCode).toBe(403);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Custom error message");
    });

    it("should handle generic error without statusCode", () => {
      const error = {
        message: "Something went wrong",
      };

      errorHandler(error, {}, mockRes, () => {});

      expect(mockRes.statusCode).toBe(500);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Something went wrong");
    });

    it("should default to 500 and generic message for error without info", () => {
      const error = {};

      errorHandler(error, {}, mockRes, () => {});

      expect(mockRes.statusCode).toBe(500);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Internal server error");
    });
  });

  describe("notFoundHandler", () => {
    it("should return 404 for unknown routes", () => {
      const mockRes = {
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.jsonData = data;
        },
      };

      notFoundHandler({}, mockRes);

      expect(mockRes.statusCode).toBe(404);
      expect(mockRes.jsonData.success).toBe(false);
      expect(mockRes.jsonData.message).toBe("Route not found");
    });
  });
});
