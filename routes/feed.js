const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

router.get('/posts', isAuth, feedController.getPosts);
router.get('/post/:postId', isAuth, feedController.getPost);
router.delete('/post/:postId', isAuth, feedController.deletePost);
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],

  feedController.createPost
);
router.put(
  '/post/:postId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],

  feedController.editPost
);

module.exports = router;
