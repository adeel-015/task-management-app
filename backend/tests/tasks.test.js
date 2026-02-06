import request from "supertest";
import app from "../src/app.js";
import Task from "../src/models/Task.js";
import sequelize from "../src/config/database.js";

let token;
let userId;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const registerResponse = await request(app).post("/api/auth/register").send({
    email: "taskuser@example.com",
    password: "password123",
    name: "Task User",
  });

  token = registerResponse.body.data.token;
  userId = registerResponse.body.data.user.id;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Task Endpoints", () => {
  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Task",
          description: "This is a test task",
          status: "pending",
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.task.title).toBe("Test Task");
      expect(response.body.data.task.status).toBe("pending");
      expect(response.body.data.task.userId).toBe(userId);
    });

    it("should not create task without title", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          description: "No title",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should not create task without authentication", async () => {
      const response = await request(app).post("/api/tasks").send({
        title: "Unauthorized Task",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should create task with default status", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Default Status Task",
        });

      expect(response.status).toBe(201);
      expect(response.body.data.task.status).toBe("pending");
    });
  });

  describe("GET /api/tasks", () => {
    beforeEach(async () => {
      await Task.destroy({ where: { userId } });
      await Task.create({
        title: "Pending Task",
        status: "pending",
        userId,
      });
      await Task.create({
        title: "Completed Task",
        status: "completed",
        userId,
      });
    });

    it("should get all tasks for user", async () => {
      const response = await request(app)
        .get("/api/tasks")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.tasks.length).toBe(2);
    });

    it("should filter tasks by status", async () => {
      const response = await request(app)
        .get("/api/tasks?status=completed")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.tasks.length).toBe(1);
      expect(response.body.data.tasks[0].status).toBe("completed");
    });

    it("should paginate tasks", async () => {
      const response = await request(app)
        .get("/api/tasks?page=1&limit=1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.tasks.length).toBe(1);
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(1);
    });

    it("should search tasks by title", async () => {
      const response = await request(app)
        .get("/api/tasks?search=Pending")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data.tasks.length).toBe(1);
      expect(response.body.data.tasks[0].title).toBe("Pending Task");
    });
  });

  describe("GET /api/tasks/:id", () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: "Get Task",
        userId,
      });
      taskId = task.id;
    });

    it("should get a task by id", async () => {
      const response = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.task.id).toBe(taskId);
      expect(response.body.data.task.title).toBe("Get Task");
    });

    it("should not get task from another user", async () => {
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({
          email: "otheruser@example.com",
          password: "password123",
        });

      const otherToken = registerResponse.body.data.token;

      const response = await request(app)
        .get(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${otherToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/tasks/:id", () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: "Update Task",
        status: "pending",
        userId,
      });
      taskId = task.id;
    });

    it("should update a task", async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          status: "completed",
          title: "Updated Task",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.task.status).toBe("completed");
      expect(response.body.data.task.title).toBe("Updated Task");
    });

    it("should validate task update", async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          status: "invalid",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: "Delete Task",
        userId,
      });
      taskId = task.id;
    });

    it("should delete a task", async () => {
      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const deleted = await Task.findByPk(taskId);
      expect(deleted).toBeNull();
    });

    it("should not delete task from another user", async () => {
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({
          email: "deleteunauth@example.com",
          password: "password123",
        });

      const otherToken = registerResponse.body.data.token;

      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set("Authorization", `Bearer ${otherToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
