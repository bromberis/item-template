const express = require("express");

const {
  getAllUsers,
  getUserById,
  getAllUserItems,
  createUserItems,
  findItemAndUpdate,
  findItemAndDelete,
  createUser,
  getEmail,
  loginUser,
} = require("./../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/register").post(createUser);
router.route("/email").get(getEmail);
router.route("/login").post(loginUser);
router.route("/:id").get(getUserById);

router.route("/:id/items/upd/:subID").patch(findItemAndUpdate);
router.route("/:id/items/dlt/:subID").patch(findItemAndDelete);
router.route("/:id/items").get(getAllUserItems).patch(createUserItems);

module.exports = router;
