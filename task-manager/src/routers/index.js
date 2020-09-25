const router = require('express').Router();

const taskRouter = require('./task');
const userRouter = require('./user');

router.use('/users', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;
