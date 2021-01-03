const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.get('/me', async (req, res) => {
  res.send(req.user);
});

router.patch('/me', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(key => allowedUpdates.includes(key));

    if (!isValidOperation) {
      return res.status(404).send({ error: 'Invalid updates!' });
    }

    const { user } = req;
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(null, true);
  }
});

router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const { buffer } = req.file;

  const resizedBuffer = await sharp(buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  const { user } = req;
  user.avatar = resizedBuffer;
  await user.save();
  res.send();
  // eslint-disable-next-line no-unused-vars
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

router.delete('/me/avatar', auth, async (req, res) => {
  const { user } = req;
  user.avatar = undefined;
  await user.save();
  res.send();
});

router.get('/:id/avatar', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || !user.avatar) {
      throw new Error('No image or user found');
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  }
  catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    const { user, token } = req;
    user.tokens = user.tokens.filter(t => token !== t.token);
    await user.save();
    res.send();
  }
  catch (e) {
    res.status(500).send();
  }
});

router.post('/logoutAll', auth, async (req, res) => {
  try {
    const { user } = req;
    user.tokens = [];
    await user.save();
    res.send();
  }
  catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
