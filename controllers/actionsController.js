//For activity logs
const actionsModel = require("../models/actionsModel");

const registerAction = (req, res) => {
  const { type, permittedUsers } = req.body;

  const permitted = [];

  permittedUsers.forEach((user) => {
    userTypesModel.find({ userType: user }).then((result) => {
      permitted.push(results);
    });
  });

  actionsModel
    .create({ type, permitted })
    .then(() => {
      res.status(200).json({ message: "User Type registered successfully" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

module.exports = { registerAction };
