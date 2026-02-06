import logger from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  const { NODE_ENV } = process.env;

  // Log error
  if (NODE_ENV === "development") {
    logger.error(`Error: ${error.message}\nStack: ${error.stack}`);
  } else {
    logger.error(error.message);
  }

  // Sequelize validation errors
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Sequelize unique constraint errors
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
      errors: error.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // JWT errors
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token has expired",
    });
  }

  // Default error
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export default {
  errorHandler,
  notFoundHandler,
};
