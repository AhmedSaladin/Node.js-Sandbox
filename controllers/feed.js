const { validationResult } = require('express-validator');
const Post = require('../models/post');

////Fetch All Posts
exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({
        posts: posts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        statusCode = 500;
      }
      next(err);
    });
};

/////Create Post
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/duck.jpg',
    creator: { name: 'Yuri' }
  });
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfuly',
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

////Fetch Single Post
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById({ _id: postId })
    .then(post => {
      if (!post) {
        const error = new Error('Post not found.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ post: post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
