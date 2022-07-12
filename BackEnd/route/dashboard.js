const express = require("express");

//import from home
const {
  createTask,
  getMyTasks,
  deleteTask,
  updateTask,
  getMyTasksIscompleted,
} = require("../controller/dashboard");

//Router
const TaskRouter = express.Router();

//middleware
const authintication = require("../middleware/authintication");

TaskRouter.post("/", authintication, createTask);
TaskRouter.get("/", authintication, getMyTasks);
TaskRouter.get("/done", authintication, getMyTasksIscompleted);
TaskRouter.delete("/:id", authintication, deleteTask);
TaskRouter.put("/:id", authintication, updateTask);

module.exports = TaskRouter;
