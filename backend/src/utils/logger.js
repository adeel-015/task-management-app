const { NODE_ENV } = process.env;

const log = (level, message, data = "") => {
  const timestamp = new Date().toISOString();
  const logMessage = data ? `${message} ${JSON.stringify(data)}` : message;
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${logMessage}`);
};

const logger = {
  error: (message, data) => {
    log("error", message, data);
  },
  warn: (message, data) => {
    log("warn", message, data);
  },
  info: (message, data) => {
    log("info", message, data);
  },
  debug: (message, data) => {
    if (NODE_ENV === "development") {
      log("debug", message, data);
    }
  },
};

export default logger;
