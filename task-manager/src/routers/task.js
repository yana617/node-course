const express = require('express');

const Task = require('../models/task');

const router = new express.Router();

router.post('/', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(key => allowedUpdates.includes(key));

    if (!isValidOperation) {
      return res.status(404).send({ error: 'Invalid updates!' });
    }

    const { id } = req.params;
    const updatedTask = req.body;
    const task = await Task.findByIdAndUpdate(id, updatedTask, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send(task);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.send(task);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

module.exports = router;