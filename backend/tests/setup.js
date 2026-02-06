// Set test environment variables BEFORE any modules are loaded
process.env.NODE_ENV = "test";
process.env.TEST_DATABASE = "true";
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.JWT_EXPIRES_IN = "24h";
