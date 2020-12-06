const express = require("express");

const { check } = require("express-validator");

const commentsController = require("../controllers/comments-controllers");
const chekAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", commentsController.getAllComments);

router.use(chekAuth);

router.post(
  "/",
  [check("text").isLength({ min: 4 })],
  commentsController.createComment
);

router.patch(
  "/:cid",
  [check("text").isLength({ min: 4 })],
  commentsController.updateComment
);

router.delete("/:cid", commentsController.deleteComment);

module.exports = router;
