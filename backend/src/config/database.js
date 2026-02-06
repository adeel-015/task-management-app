import { Sequelize } from "sequelize";

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  NODE_ENV,
  TEST_DATABASE,
} = process.env;

// Use test database if running tests, otherwise use standard database
const sequelize = TEST_DATABASE
  ? new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })
  : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: "mysql",
      logging: NODE_ENV === "development" ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      timezone: "+00:00",
    });

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connection established successfully");
  } catch (error) {
    console.error("✗ Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;
