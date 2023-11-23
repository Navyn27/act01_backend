const express = require("express");
const router = express.Router();

const {
  registerUserType,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

router.post("/newUserType", (req, res) => {
  registerUserType(req, res);
});

router.post("/newUser", (req, res) => {
  registerUser(req, res);
});

module.exports = router;
