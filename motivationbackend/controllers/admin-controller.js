const { validationResult } = require("express-validator");
const HttpError = require("../models/http-errors");
const mongoose = require("mongoose");
const User = require("../models/users");
const Article = require("../models/articles");
const Aboutus = require("../models/aboutus");
const Book = require("../models/books");
const Video = require("../models/video");
const Cat = require("../models/category");

const getArticle = async (req, res, next) => {
  let article;
  try {
    article = await Article.find();
  } catch (err) {
    const error = new HttpError(
      "something went wrong , could not find Articles",
      500
    );
    return next(error);
  }
  res.json({
    article: article.map((articles) => articles.toObject({ getters: true })),
  });
};

//creating articles
const createArticle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { thecat, title, undertitle, description } = req.body;
  const createdAtricle = new Article({
    thecat,
    title,
    undertitle,
    description,
    image: req.file.path,
  });

  let cat;
  try {
    cat = await Cat.findById(thecat);
  } catch (err) {
    const error = new HttpError(
      "Creating Article faild ,please try again 2",
      500
    );
    return next(error);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdAtricle.save({ session: session });
    cat.articles.push(createdAtricle);
    await cat.save({ session: session });
    await session.commitTransaction();
    // await createdAtricle.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(201).json({ createdAtricle: createdAtricle });
};
//editing articles
const editArtucle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const Articleid = req.params.aid;

  let article;
  try {
    article = await Article.findById(Articleid);
  } catch (err) {
    const error = new HttpError(
      "something went wrong , could not find this article",
      500
    );
    return next(error);
  }
  const { title, undertitle, description } = req.body;
  article.title = title;
  article.undertitle = undertitle;
  article.description = description;
  // article.pic = article.pic;
  try {
    await article.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(200).json({ article: article.toObject({ getters: true }) });
};

const deleteArticle = async (req, res, next) => {
  const articleId = req.params.aid;
  let article;

  try {
    article = await Article.findById(articleId);
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong could not delete Article",
      500
    );
    return next(error);
  }

  if (!article) {
    const error = new HttpError(
      "could not find article by the provided id ",
      500
    );
    return next(error);
  }

  let cat;
  try {
    cat = await Cat.findOne({ articles: article });
  } catch (err) {
    const error = new HttpError(
      "Could not delete Article ,please try again 2",
      500
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await article.remove({ session: session });
    cat.articles.pull(article);
    await cat.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(200).json({ message: "Article Deleted" });
};
//getting about us
const getAboutus = async (req, res, next) => {
  const aboutusId = req.params.aid;
  let aboutus;
  try {
    aboutus = await Aboutus.findById(aboutusId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong , couldnot find this About us",
      500
    );
    return next(error);
  }
  if (!aboutus) {
    const error = new HttpError(
      "could not find about by the provided id ",
      500
    );
    return next(error);
  }
  res.json({
    aboutus: aboutus.toObject({ getters: true }),
  });
};
// creating aboutus for footer
// const createaboutUS = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }
//   const { title, description } = req.body;
//   const createdAboutus = new Aboutus({
//     title,
//     description,
//   });

//   try {
//     createdAboutus.save().then();
//   } catch (err) {
//     const error = new HttpError(
//       "Creating aboutus  faild ,please try again later",
//       500
//     );
//     return next(error);
//   }
//   res.status(201).json({ createdAboutus: createdAboutus });
// };

//editing aboutus
const editAboutUs = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const aboutID = req.params.aid;
  let aboutus;
  try {
    aboutus = await Aboutus.findOne({
      _id: aboutID,
    });
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong , could not update your data .. Please try again later !!",
      500
    );
    return next(error);
  }

  const { title, description } = req.body;
  aboutus.title = title;
  aboutus.description = description;
  try {
    await aboutus.save();
  } catch (err) {
    const error = new HttpError(
      "Creating aboutus  faild ,please try again later",
      500
    );
    return next(error);
  }
  res.status(200).json({ aboutus: aboutus.toObject({ getters: true }) });
};
// geting all users from the database
const getAllusers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError("Somthing went wrong.. can't reach users", 500);
    return next(error);
  }
  if (!users) {
    const error = new HttpError("NO users TO VIEW", 404);
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

//geting user by id from database
const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ user: user.toObject({ getters: true }) });
};

//get all book
const getbooks = async (req, res, next) => {
  let book;
  try {
    book = await Book.find();
  } catch (err) {
    const error = new HttpError(
      "something went wrong , couldnot find book",
      500
    );
    return next(error);
  }
  res.json({
    book: book.map((books) => books.toObject({ getters: true })),
  });
};
//creating book
const createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { thecat, title, undertitle, description } = req.body;

  const createdbook = new Book({
    thecat,
    title,
    undertitle,
    description,
    image: req.file.path,
  });

  let cat;
  try {
    cat = await Cat.findById(thecat);
  } catch (err) {
    const error = new HttpError(
      "Creating Category faild ,please try again 2",
      500
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdbook.save({ session: session });
    cat.books.push(createdbook);
    await cat.save({ session: session });
    await session.commitTransaction();
    await session.commitTransaction();

    // await createdbook.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong , pls try again later ;; ",
      500
    );
    return next(error);
  }
  res.status(201).json({ createdbook: createdbook });
};
//editing book
const editbook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const bookid = req.params.bid;
  const { title, description, undertitle } = req.body;

  let book;
  try {
    book = await Book.findById(bookid);
  } catch (err) {
    const error = new HttpError(
      "something went wrong , could not find this book",
      500
    );
    return next(error);
  }

  book.title = title;
  book.description = description;
  book.undertitle = undertitle;
  // article.pic = article.pic;
  try {
    await book.save().then();
  } catch (err) {
    const error = new HttpError(
      "something went wrong could not edit book ",
      500
    );
    return next(error);
  }
  res.status(200).json({ book: book.toObject({ getters: true }) });
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      "could not find book with the provided id",
      404
    );
    return next(error);
  }
  if (!book) {
    const error = new HttpError(
      "could not find a book with the provided id ",
      404
    );
    return next(error);
  }
  let cat;
  try {
    cat = await Cat.findOne({ books: book });
  } catch (err) {
    const error = new HttpError(
      "Could not delete book ,please try again 2",
      500
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await book.remove({ session: session });
    cat.books.pull(book);
    await cat.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong ,could not delete this Book"
    );
    return next(error);
  }
  res.status(200).json({ message: "Book Deleted" });
};

//getvideos
const getvideos = async (req, res, next) => {
  let video;
  try {
    video = await Video.find();
  } catch (err) {
    const error = new HttpError(
      "something went wrong , could not find Videos",
      500
    );
    return next(error);
  }
  res.json({
    video: video.map((videos) => videos.toObject({ getters: true })),
  });
};

//creating videos
const createvideo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { thecat, title, undertitle, description } = req.body;
  const createdVideo = new Video({
    thecat,
    title,
    undertitle,
    description,
    image: req.file.path,
  });
  let cat;
  try {
    cat = await Cat.findById(thecat);
  } catch (err) {
    const error = new HttpError(
      "Creating Category faild ,please try again 2",
      500
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdVideo.save({ session: session });
    cat.videos.push(createdVideo);
    await cat.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(201).json({ createdVideo: createdVideo });
};
//editing videos
const editvideo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const VideoId = req.params.vid;

  let video;
  try {
    video = await Video.findById(VideoId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong , could not find this video",
      500
    );
    return next(error);
  }
  const { title, undertitle, description } = req.body;

  video.title = title;
  video.undertitle = undertitle;
  video.description = description;
  // article.pic = article.pic;
  try {
    await video.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(200).json({ video: video.toObject({ getters: true }) });
};

const deletevideo = async (req, res, next) => {
  const videoId = req.params.vid;
  let video;

  try {
    video = await Video.findById(videoId);
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong could not delete Video",
      500
    );
    return next(error);
  }

  if (!video) {
    const error = new HttpError(
      "could not find video by the provided id ",
      500
    );
    return next(error);
  }

  let cat;
  try {
    cat = await Cat.findOne({ videos: video });
  } catch (err) {
    const error = new HttpError(
      "Could not delete Video ,please try again 2",
      500
    );
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await video.remove({ session: session });
    cat.videos.pull(video);
    await cat.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong ,could not delete this Video"
    );
    return next(error);
  }
  res.status(200).json({ message: "Video Deleted" });
};

/////////////////////////////////

const getcat = async (req, res, next) => {
  let cat;
  try {
    cat = await Cat.find();
  } catch (err) {
    const error = new HttpError(
      "something went wrong , could not find Category",
      500
    );
    return next(error);
  }
  res.json({
    cat: cat.map((cats) => cats.toObject({ getters: true })),
  });
};

//creating category
const createcat = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { type } = req.body;
  const createdCat = new Cat({
    type,
    image: req.file.path,
    articles: [],
    books: [],
    videos: [],
  });
  try {
    await createdCat.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong , pls try again later ",
      500
    );
    return next(error);
  }
  res.status(201).json({ createdCat: createdCat });
};
//editing category
const editcat = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const catId = req.params.cid;

  let cat;
  try {
    cat = await Cat.findById(catId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong , could not find this category",
      500
    );
    return next(error);
  }
  const { type } = req.body;
  cat.type = type;
  try {
    await cat.save();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(200).json({ cat: cat.toObject({ getters: true }) });
};

const deletecat = async (req, res, next) => {
  const catId = req.params.cid;
  let cat;
  try {
    cat = await Cat.findById(catId);
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong could not delete Category",
      500
    );
    return next(error);
  }
  if (!cat) {
    const error = new HttpError(
      "could not find Category by the provided id ",
      500
    );
    return next(error);
  }
  try {
    await cat.remove();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong ,could not delete this Category"
    );
    return next(error);
  }
  res.status(200).json({ message: "Category Deleted" });
};

exports.getAllusers = getAllusers;
exports.getUserById = getUserById;
// exports.createaboutUS = createaboutUS;
exports.editAboutUs = editAboutUs;
exports.getAboutus = getAboutus;
exports.createArticle = createArticle;
exports.editArtucle = editArtucle;
exports.getArticle = getArticle;
exports.createBook = createBook;
exports.getbooks = getbooks;
exports.editbook = editbook;
exports.deleteArticle = deleteArticle;
exports.deleteBook = deleteBook;
exports.getvideos = getvideos;
exports.createvideo = createvideo;
exports.editvideo = editvideo;
exports.deletevideo = deletevideo;
exports.getcat = getcat;
exports.createcat = createcat;
exports.editcat = editcat;
exports.deletecat = deletecat;
