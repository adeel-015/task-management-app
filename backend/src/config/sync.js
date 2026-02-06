import sequelize from "../config/database.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

// Establish associations
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

export const syncDatabase = async (options = {}) => {
  try {
    const { NODE_ENV } = process.env;
    const syncOptions =
      NODE_ENV === "production"
        ? { force: false, ...options }
        : { alter: true, ...options };

    await sequelize.sync(syncOptions);
    console.log("✓ Database synchronized successfully");
  } catch (error) {
    console.error("✗ Database synchronization failed:", error);
    throw error;
  }
};

export default {
  syncDatabase,
};
