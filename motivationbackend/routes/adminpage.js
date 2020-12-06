const express = require("express");
const fileUpload = require("../middleware/file-upload");

const admincontroller = require("../controllers/admin-controller");
const usersController = require("../controllers/users-controllers");
const postsController = require("../controllers/posts-controllers");
const commentsController = require("../controllers/comments-controllers");

const router = express.Router();

//users managment
router.get("/users", admincontroller.getAllusers);
// router.get("/users/:uid", admincontroller.getUserById);
router.delete("/users/:uid", usersController.deactivate);

//about us managment
router.get("/aboutus/:aid", admincontroller.getAboutus);
// router.post("/aboutus", admincontroller.createaboutUS);
router.patch("/aboutus/:aid", admincontroller.editAboutUs);

//posts managements
router.get("/posts", postsController.getAllPosts);
router.delete("/posts/:pid", postsController.deletePost);
//comments managements
router.get("/comments", commentsController.getAllComments);
router.delete("/comments/:cid", commentsController.deleteComment);
//Article managment
router.get("/article", admincontroller.getArticle);
router.post(
  "/article",
  fileUpload.single("image"),
  admincontroller.createArticle
);
router.patch("/article/:aid", admincontroller.editArtucle);
router.delete("/article/:aid", admincontroller.deleteArticle);

//books managment
router.get("/books", admincontroller.getbooks);
router.post("/books", fileUpload.single("image"), admincontroller.createBook);
router.patch("/books/:bid", admincontroller.editbook);
router.delete("/books/:bid", admincontroller.deleteBook);

// video managment
router.get("/videos", admincontroller.getvideos);
router.post("/videos", fileUpload.single("image"), admincontroller.createvideo);
router.patch("/videos/:vid", admincontroller.editvideo);
router.delete("/videos/:vid", admincontroller.deletevideo);

// category managment
router.get("/cat", admincontroller.getcat);
router.post("/cat", fileUpload.single("image"), admincontroller.createcat);
router.patch("/cat/:cid", admincontroller.editcat);
router.delete("/cat/:cid", admincontroller.deletecat);
module.exports = router;
