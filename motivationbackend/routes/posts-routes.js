const express = require("express");

const { check } = require("express-validator");

const postsController = require("../controllers/posts-controllers");

const chekAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/", postsController.getAllPosts);
router.get("/:pid", postsController.getPostsById);
router.get("/users/:uid", postsController.getPostsByUserId);

// router.use(chekAuth);

router.post(
  "/",
  [check("text").isLength({ min: 4 })],
  postsController.createPost
);

router.patch(
  "/:pid",
  [check("text").isLength({ min: 4 })],
  postsController.updatePost
);

router.delete("/:pid", postsController.deletePost);

module.exports = router;
