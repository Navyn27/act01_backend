//For reviews
const reviewsModel = require("../models/reviewsModel");

//For orders
const ordersModel = require("../models/ordersModel");
const orderTypesModel = require("../models/orderTypesModel");

//For reservations
const reservationsModel = require("../models/reservationsModel");
const reservationTypesModel = require("../models/reservationTypesModel");

//For users
const usersModels = require("../models/usersModel");
const userTypesModel = require("../models/userTypesModel");

//For activity logs
const actionsModel = require("../models/actionsModel");
const logsModel = require("../models/logsModel");

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

//To handle services (orders and reservations)

const addNewService = (service, req, res) => {
  const { userFirstName, userLastName, phoneNumber, email } = req.body;

  const data = {
    userFirstName,
    userLastName,
    phoneNumber,
    email,
    status: "pending",
    paymentStatus: "pending",
  };
  switch (service) {
    case "order":
      //Find Order Type

      reservationsModel
        .create(data)
        .then(() => {
          res.status(200).json("Success");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    case "reservation":
      //Find Reservation Type

      reservationsModel
        .create({
          ...data,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        })
        .then(() => {
          res.status(200).json("Service Requested Successfully");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    default:
      res.status(400).json("Invalid service request");
  }
  ordersModel.create({ ...data, status: "pending", paymentStatus: "pending" });
};

const confirmService = (service, req, res) => {
  const { serviceId, userId } = req.body;

  //Check if the user is verified to perform such an action

  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Confirmed" })
        .then(() => {
          res.status(200).json("Success");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Confirmed" })
        .then(() => {
          res.status(200).json("Service Request Confirmed");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    default:
      res.status(400).json("Invalid service request");
  }
};

const resolveService = (service, req, res) => {
  const { serviceId, userId } = req.body;

  //Check if the user is verified to perform such an action

  //Confirm order
  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Resolved" })
        .then(() => {
          res.status(200).json("Success");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Resolved" })
        .then(() => {
          res.status(200).json("Service Resolved Successfully");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    default:
      res.status(400).json("Invalid service request");
  }
};

const resolveServicePayment = (service, req, res) => {
  const { serviceId, userId } = req.body;

  //Check if the user is verified to perform such an action

  //Confirm order
  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { paymentStatus: "Resolved" })
        .then(() => {
          res.status(200).json("Success");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { paymentStatus: "Resolved" })
        .then(() => {
          res.status(200).json("Service Payment Resolved Successfully");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    default:
      res.status(400).json("Invalid service request");
  }
};

const cancelService = (service, req, res) => {
  const { serviceId, userId } = req.body;

  //Check if the user is verified to perform such an action

  //Confirm order
  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Cancelled" })
        .then(() => {
          res.status(200).json("Success");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Cancelled" })
        .then(() => {
          res.status(200).json("Service Cancellation Successfull");
          //Record Log
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    default:
      res.status(400).json("Invalid service request");
  }
};

//Manager user
//Register a new user
//Change user account type
//

const registerUser = (req, res) => {
  const { username, password, userType, email } = req.params;

  userTypesModel.find({ userType }, (err, data) => {
    if (err) {
      res.status(400).json("Invalid user type");
    } else {
      usersModels
        .create({ username, password, userType: data, email })
        .then(() => {
          res.status(200).json({ message: "User registration successful" });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    }
  });
};

const updateUser = (req, res) => {};
const deleteuser = (req, res) => {};

//Handle actions or activities
const registerAction = (req, res) => {};

module.exports = {
  addNewReview,
  addNewService,
  confirmService,
  resolveService,
  resolveServicePayment,
  cancelService,
  registerUser,
  updateUser,
  deleteuser,
  registerAction,
};
