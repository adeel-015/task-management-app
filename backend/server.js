import "dotenv/config";
import app from "./src/app.js";
import { testConnection } from "./src/config/database.js";
import { syncDatabase } from "./src/config/sync.js";
import logger from "./src/utils/logger.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Sync database models
    await syncDatabase();

    // Start server
    app.listen(PORT, () => {
      logger.info(`✓ Server is running on http://localhost:${PORT}`);
      logger.info(
        `✓ API documentation available at http://localhost:${PORT}/api-docs (if Swagger is configured)`,
      );
    });
  } catch (error) {
    logger.error("✗ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
