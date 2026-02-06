import logger from "../src/utils/logger.js";

describe("Logger Utility", () => {
  let consoleLogs;
  let originalLog;

  beforeEach(() => {
    consoleLogs = [];
    originalLog = console.log;
    console.log = function (message) {
      consoleLogs.push(message);
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  it("should log error messages", () => {
    logger.error("Test error");
    expect(consoleLogs.length).toBeGreaterThan(0);
    expect(consoleLogs[0]).toContain("[ERROR]");
    expect(consoleLogs[0]).toContain("Test error");
  });

  it("should log warn messages", () => {
    logger.warn("Test warning");
    expect(consoleLogs.length).toBeGreaterThan(0);
    expect(consoleLogs[0]).toContain("[WARN]");
  });

  it("should log info messages", () => {
    logger.info("Test info");
    expect(consoleLogs.length).toBeGreaterThan(0);
    expect(consoleLogs[0]).toContain("[INFO]");
  });

  it("should include timestamp in logs", () => {
    logger.info("Timestamp test");
    expect(consoleLogs[0]).toMatch(
      /\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/,
    );
  });

  it("should log error with data", () => {
    const data = { code: "E001" };
    logger.error("Error", data);
    expect(consoleLogs[0]).toContain(JSON.stringify(data));
  });
});
