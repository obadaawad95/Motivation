const { validationResult } = require("express-validator");
const HttpError = require("../models/http-errors");
const Post = require("../models/posts");
const User = require("../models/users");
const Comment = require("../models/comments");
const mongoose = require("mongoose");

const getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (err) {
    const error = new HttpError("Somthing went wrong.. can't reach POSTS", 500);
    return next(error);
  }
  if (!posts) {
    const error = new HttpError("NO POSTS TO VIEW", 404);
    return next(error);
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getPostsById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a post.",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError(
      "Could not find a post for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ post: post.toObject({ getters: true }) });
};

const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPosts;
  try {
    userWithPosts = await User.findById(userId).populate("posts");
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong.. can't reach POSTS for the provided id",
      500
    );
    return next(error);
  }
  if (!userWithPosts || userWithPosts.posts.length === 0) {
    return next(
      new HttpError("could not find a POSTS for the provided user id", 404)
    );
  }
  res.json({
    posts: userWithPosts.posts.map((post) => post.toObject({ getters: true })),
  });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { creator, name, text, pimg } = req.body;
  const createdPost = new Post({
    creator,
    name,
    text,
    pimg,
    comments: [],
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating POST faild ,please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for the provided id", 404);
    return next(error);
  }

  try {
    console.log('hay1')
    const session = await mongoose.startSession();
    console.log('hay2')
    session.startTransaction();
    console.log('hay3')
    await createdPost.save({ session: session });
    console.log('hay4')
    user.posts.push(createdPost);
    console.log('hay5')
    await user.save({ session: session });
    console.log('hay6')
    await session.commitTransaction();
    console.log('hay7')
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(201).json({ post: createdPost });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { text, creator } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong could not update the POST 1",
      500
    );
    return next(error);
  }

  if (post.creator.toString() !== creator) {
    const error = new HttpError("You are not allowed to update this post", 401);
    return next(error);
  }
  post.text = text;
  try {
    await post.save().then();
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong could not update the POST 2",
      500
    );
    return next(error);
  }
  res.status(200).json({ post: post.toObject({ getters: true }) });
};
const deletePost = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong , could not delete POST 1",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError(
      "Could not find a post for the provided id",
      404
    );
    return next(error);
  }
  let user;
  try {
    user = await User.findOne({ posts: post });
  } catch (err) {
    const error = new HttpError(
      "Could not delete Post ,please try again 1",
      500
    );
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for the provided id", 404);
    return next(error);
  }
  // let comments;
  // try {
  //   comments = await Comment.find({ thepost: [postId] });
  // } catch (err) {
  //   const error = new HttpError(err, 500);
  //   return next(error);
  // }

  // if (post.creator.id !== req.userData.userId) {
  //   const error = new HttpError("You are not allowed to delete this post", 401);
  //   return next(error);
  // }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.remove({ session: session });
    // await comments.remove({ session: session });
    user.posts.pull(post);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      // "Somthing went wrong , could not delete POST 2",
      err,
      500
    );
    console.log(err.message);
    return next(error);
  }

  res.status(200).json({ message: "POST DELETED" });
};

exports.getAllPosts = getAllPosts;
exports.getPostsById = getPostsById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
