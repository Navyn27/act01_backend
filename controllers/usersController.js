require("dotenv").config();

const bcrypt = require("bcrypt");

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

  bcrypt
    .hash(password, Number(process.env.SALT_INT))
    .then((hashedPassword) => {
      userTypesModel.findOne({ userType: userType }, (err, data) => {
        console.log(userType);
        if (err) {
          console.log(err);
          res.status(500).json(err.message);
        }
        if (!data) {
          res.status(400).json({ Error: "Invalid user type" });
        } else {
          console.log({ username, hashedPassword, userType: data, email });
          usersModel
            .create({
              username,
              password: hashedPassword,
              userType: data,
              email,
            })
            .then(() => {
              res.status(200).json({ message: "User registration successful" });
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Error: "Internal Server Error" });
    });
};

//Update user
const updateUser = (req, res) => {
  const {
    username,
    password,
    email,
    newUsername,
    newPassword,
    newUserType,
    newEmail,
  } = req.body[0];

  usersModel
    .findOne({ username, email })
    .then((data) => {
      if (data) {
        const storedPassword = data.password;
        userTypesModel.findOne({ userType: newUserType }).then((userType) => {
          bcrypt.compare(password, storedPassword).then((result) => {
            if (result) {
              bcrypt
                .hash(newPassword, Number(process.env.SALT_INT))
                .then((hashedPassword) => {
                  usersModel
                    .findByIdAndUpdate(data._id, {
                      username: newUsername,
                      password: hashedPassword,
                      userType,
                      email: newEmail,
                    })
                    .then(() => {
                      res
                        .status(200)
                        .json({ Message: "User Updation Successfull" });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.status(500).json({ err: err.message });
                    });
                });
            } else {
              res.status(400).json({ Error: "Wrong credentials" });
            }
          });
        });
      }
    })
    .catch((err) => {});
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
