const express = require("express");
const router = express.Router();

const {
  registerUserType,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

router.post("/userType", (req, res) => {
  registerUserType(req, res);
});

router.post("/user", (req, res) => {
  registerUser(req, res);
});

router.patch("/user", (req, res) => {
  updateUser(req, res);
});

router.post("deleteUser", (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
