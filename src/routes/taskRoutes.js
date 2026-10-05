const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const {
  createTaskValidator,
  updateTaskValidator,
  taskIdValidator,
  listTasksValidator,
} = require('../validators/taskValidators');
const validate = require('../middleware/validate');
const protect = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', createTaskValidator, validate, createTask);
router.get('/', listTasksValidator, validate, getTasks);
router.get('/:id', taskIdValidator, validate, getTaskById);
router.put('/:id', taskIdValidator, updateTaskValidator, validate, updateTask);
router.delete('/:id', taskIdValidator, validate, deleteTask);

module.exports = router;
