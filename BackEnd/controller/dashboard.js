const connection = require("../models/db");

const createTask = (req, res) => {
  const { title } = req.body;
  const user_id = req.token.userId;

  const query = "INSERT INTO tasks (title, user_id) VALUES (?,?)";
  const data = [title, user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        err,
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  });
};

const getMyTasks = (req, res) => {
  const user_id = req.token.userId;
  const query = "Select * FROM tasks where user_id = (?) AND is_deleted = 0 AND is_completed = 0";
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        err,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "you don't have task yet",
        err,
      });
    }
    res.status(201).json({
      success: true,
      result,
    });
  });
};

const getMyTasksIscompleted = (req, res) => {
    const user_id = req.token.userId;
    const query = "Select * FROM tasks where user_id = (?) AND is_deleted = 0 AND is_completed = 1";
    const data = [user_id];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          err,
        });
      }
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "you don't have task yet",
          err,
        });
      }
      res.status(201).json({
        success: true,
        result,
      });
    });
  };

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  const user_Id = req.token.userId;

  const query = "UPDATE tasks SET is_deleted = 1 WHERE id = ? AND user_Id = ?";
  const data = [taskId, user_Id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        err,
      });
    }
    return res.status(201).json({
      success: true,
      message: "post Updated",
      result: result,
    });
  });
};



const updateTask = (req, res) => {
  const { is_completed } = req.body;
  const userId = req.token.userId;
  const postId = req.params.id;

  const query = "UPDATE tasks SET is_completed = ? WHERE user_id = ? AND id=?";

  const data = [is_completed, userId, postId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        err,
      });
    }

    res.status(201).json({
      success: true,
      result,
    });
  });
};

module.exports = { createTask, getMyTasks, deleteTask ,updateTask,getMyTasksIscompleted};
