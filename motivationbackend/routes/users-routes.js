const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:uid", usersController.getUserById);
router.get("/confirmation/:token", usersController.confirmUser);

router.patch(
  "/:uid",
  [check("name").not().isEmpty()],
  usersController.EditUserInfo
);
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("age").not().isEmpty(),
  ],
  usersController.signup
);

router.delete("/:uid", usersController.deactivate);

router.post("/login", usersController.login);

module.exports = router;
