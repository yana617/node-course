const express = require('express');

const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { user } = req;
    await user.populate('tasks').execPopulate();
    res.send(user.tasks);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const task = await Task.findOne({ _id: id, owner: user._id });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(key => allowedUpdates.includes(key));

    if (!isValidOperation) {
      return res.status(404).send({ error: 'Invalid updates!' });
    }

    const { id } = req.params;
    const { user } = req;
    const updatedTask = req.body;

    const task = await Task.findOne({ _id: id, owner: user._id });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    updates.forEach((update) => task[update] = updatedTask[update]);
    await task.save();
    
    res.send(task);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const task = await Task.findOneAndDelete({ _id: id, owner: user._id });

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