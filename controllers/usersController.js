require("dotenv").config();

const bcrypt = require("bcryptjs");

//For users
const usersModel = require("../models/usersModel");
const userTypesModel = require("../models/userTypesModel");

const registerUserType = (req, res) => {
  const { userType } = req.body[0];
  userTypesModel
    .create({ userType: userType })
    .then(() => {
      res.status(200).json({ message: "User registration successful" });
    })
    .catch((err) => {
      res.status(400).json({ error: "Invalid User Type" });
      console.log(err.message);
    });
};

const registerUser = (req, res) => {
  const { username, password, userType, email } = req.body[0];

  //Remember to validate password, check username validity and email validity on Frontend before making request

  bcrypt.hash(password, Number(process.env.SALT_INT), (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      console.log(hashedPassword);
      res.end();
    }
  });

  // userTypesModel.findOne({ userType }, async (err, data) => {
  //   if (err) {
  //     res.status(400).json("Invalid user type");
  //   } else {
  //     // console.log({ username, password, data, email });
  //     const user = await usersModel
  //       .create({ username, hashedPassword, userType: data, email })
  //       .then(() => {
  //         res.status(200).json({ message: "User registration successful" });
  //       })
  //       .catch((err) => {
  //         res.status(400).json({ error: err.message });
  //       });
  //   }
  // });
};

//Update user
const updateUser = (req, res) => {
  const {
    username,
    password,
    email,
    newUsername,
    newPassword,
    newEmail,
    newUserType,
  } = req.body;

  if (newUserType) {
    userTypesModel.findOne({ userType: newUserType }).then((results) => {
      newUserType = results;
    });
  } else {
    newUserType = "";
  }

  usersModels
    .findOneAndUpdate(
      { username: username, password: password, email: email },
      {
        username: newUsername,
        password: newPassword,
        email: newEmail,
        userTypes: newUserType,
      }
    )
    .then(() => {
      res.status(200).json({ message: "User registration successful" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

//Delete user
const deleteUser = (req, res) => {
  userTypesModel
    .findOneAndDelete({ username: req.body.username, email: req.body.email })
    .then(() => {
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

module.exports = { registerUserType, registerUser, updateUser, deleteUser };
