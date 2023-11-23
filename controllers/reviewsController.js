//For reviews
const reviewsModel = require("../models/reviewsModel");

//To record reviews
const addNewReview = (req, res) => {
  const { title, userFirstName, userEmail, body, rating, relevantDate } =
    req.body;

  reviewsModel
    .create({ title, userFirstName, userEmail, body, rating, relevantDate })
    .then(() => {
      res.status(200).json("Review Recorded");
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

module.exports = {
  addNewReview,
};
