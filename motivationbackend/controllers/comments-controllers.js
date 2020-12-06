const { validationResult } = require("express-validator");
const Comment = require("../models/comments");
const Post = require("../models/posts");
const User = require("../models/users");
const HttpError = require("../models/http-errors");
const mongoose = require("mongoose");

const getAllComments = async (req, res, next) => {
  let comments;
  try {
    comments = await Comment.find();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong.. can't reach COMMENT",
      500
    );
    return next(error);
  }
  if (!comments) {
    const error = new HttpError("NO COMMENTS TO VIEW", 404);
    return next(error);
  }
  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { thepost, creator, name, cimg, text } = req.body;

  const createdComment = new Comment({
    thepost,
    creator,
    name,
    cimg,
    text,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating COMMENT faild ,please try again 1",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for the provided id", 404);
    return next(error);
  }

  let post;
  try {
    post = await Post.findById(thepost);
  } catch (err) {
    const error = new HttpError(
      "Creating COMMENT faild ,please try again 2",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find POST for the provided id", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    await createdComment.save({ session: session });
    post.comments.push(createdComment);
    user.comments.push(createdComment);
    await user.save({ session: session });
    await post.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(201).json({ comment: createdComment });
};

const updateComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { text, creator } = req.body;
  const commentId = req.params.cid;

  let comment;
  try {
    comment = await Comment.findById(commentId);
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong could not update the COMMENT 1",
      500
    );
    return next(error);
  }

  if (comment.creator.toString() !== creator) {
    const error = new HttpError(
      "You are not allowed to update this comment",
      401
    );
    return next(error);
  }
  comment.text = text;

  try {
    await comment.save().then();
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong could not update the COMMENT 2",
      500
    );
    return next(error);
  }
  res.status(200).json({ comment: comment.toObject({ getters: true }) });
};
const deleteComment = async (req, res, next) => {
  const commentId = req.params.cid;

  let comment;
  try {
    comment = await Comment.findById(commentId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong , could not delete COMMENT 1",
      500
    );
    return next(error);
  }

  if (!comment) {
    const error = new HttpError(
      "Could not find a COMMENT for the provided id",
      404
    );
    return next(error);
  }

  let user;
  try {
    user = await User.findOne({ comments: comment });
  } catch (err) {
    const error = new HttpError(
      "Could not delete Comment ,please try again 1",
      500
    );
    return next(error);
  }

  // if (!user) {
  //   const error = new HttpError("Could not find user for the provided id", 404);
  //   return next(error);
  // }

  let post;
  try {
    post = await Post.findOne({ comments: comment });
  } catch (err) {
    const error = new HttpError(
      "Could not delete Comment ,please try again 2",
      500
    );
    return next(error);
  }

  // if (!post) {
  //   const error = new HttpError("Could not find POST for the provided id", 404);
  //   return next(error);
  // }

  // if (comment.creator.id !== req.userData.userId) {
  //   const error = new HttpError(
  //     "You are not allowed to delete this comment",
  //     401
  //   );
  //   return next(error);
  // }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await comment.remove({ session: session });
    if (user) {
      user.comments.pull(comment);
      await user.save({ session: session });
    }
    if (post) {
      post.comments.pull(comment);
      await post.save({ session: session });
    }
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(200).json({ message: "COMMENT DELETED" });
};

exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
exports.getAllComments = getAllComments;
