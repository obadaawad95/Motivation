const { validationResult } = require("express-validator");
const User = require("../models/users");
const HttpError = require("../models/http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
// const Comment = require("../models/comments");
// const Post = require("../models/posts");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "fetching users faild please try again later",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed please try again later",
      500
    );
    return next(error);
  }

  res.json({
    user: user.toObject({ getters: true }),
  });
};

const EditUserInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, location, job, school, uni, aboutme } = req.body;
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "somthing went wrong could not find user for the provided id",
      500
    );
    return next(error);
  }
  user.name = name;
  user.location = location;
  user.job = job;
  user.school = school;
  user.uni = uni;
  user.aboutme = aboutme;

  try {
    await user.save().then();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong , could not update user information",
      500
    );
    return next(error);
  }

  res.status(200).json({
    user: user.toObject({ getters: true }),
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "obadaawad96@gmail.com",
    pass: "oaabnhizmzms",
  },
});
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, age } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email }); //finds one doc matching
  } catch (err) {
    const error = new HttpError("Signing up faild , please try again 1", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "Email already exists, please login instead",
      422
    );
    return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "could not create a user please try again !",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    age,
    aboutme: " ",
    location: " ",
    job: " ",
    school: " ",
    uni: " ",
    posts: [],
    comments: [],
  });

  try {
    createdUser.save().then();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
      },
      "supersecret_dont_share",
      { expiresIn: "1d" }
    );

    const url = `http://localhost:5000/api/users/confirmation/${token}`;
    await transporter.sendMail({
      to: createdUser.email,
      subject: "Confirm Email",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
    image: createdUser.image,
    token: token,
    age: createdUser.age,
  });
};

const confirmUser = async (req, res, next) => {
  try {
    const ii = jwt.verify(req.params.token, "supersecret_dont_share");
    console.log(ii.userId);
    await User.updateOne(
      { _id: ii.userId },
      {
        $set: { confirmed: true },
        function(err, res) {
          if (err) throw err;
          console.log(res.result.nModified + " document(s) updated");
          db.close();
        },
      }
    );
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  return res.redirect("http://localhost:3000");
  // let existingUser;
  // try {
  //   existingUser = await User.findById(userId); //finds one doc matching
  // } catch (err) {
  //   const error = new HttpError(err, 500);
  //   return next(error);
  // }
  // try {
  //   await existingUser.update({ confirmed: true });
  // } catch (err) {
  //   const error = new HttpError(err, 500);
  //   return next(error);
  // }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email }); //finds one doc matching
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials ,could not log you in",
      403
    );
    return next(error);
  }
  if (!existingUser.confirmed) {
    const error = new HttpError(
      "Invalid credentials ,please confirm your email",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("could not log you , please try again", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials ,could not log you in",
      403
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in faild , please try again 2", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    image: existingUser.image,
    token: token,
    age: existingUser.age,
  });
};

const deactivate = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Somthing went weong , could deavtivate your account",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user by the provided id ",
      404
    );
    return next(error);
  }
  // let comment;
  // try {
  //   await Comment.updateOne({ $pullAll: { creator: userId } });
  // } catch (err) {
  //   const error = new HttpError("deleting User faild, please try again ", 500);
  //   return next(error);
  // }
  // if (!comment) {
  //   const error = new HttpError(
  //     "Could not find a COMMENT for the provided id",
  //     404
  //   );
  //   return next(error);
  // }

  // let post;
  // try {
  //   await Post.updateOne({ $pullAll: { creator: userId } });
  // } catch (err) {
  //   const error = new HttpError("deleting User faild, please try again ", 500);
  //   return next(error);
  // }
  // if (!post) {
  //   const error = new HttpError(
  //     "Could not find a COMMENT for the provided id",
  //     404
  //   );
  //   return next(error);
  // }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await user.remove({ session: session });

    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json({ message: "USER DELETED " });
};
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.EditUserInfo = EditUserInfo;
exports.signup = signup;
exports.login = login;
exports.deactivate = deactivate;
exports.confirmUser = confirmUser;
