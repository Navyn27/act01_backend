//For orders
const ordersModel = require("../models/ordersModel");
const orderTypesModel = require("../models/orderTypesModel");

//For reservations
const reservationsModel = require("../models/reservationsModel");
const reservationTypesModel = require("../models/reservationTypesModel");

const requestService = (req, res) => {
  const { service, userFirstName, userLastName, phoneNumber, email } = req.body;

  console.log(req.body);
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
      const { orderType } = req.body;

      orderTypesModel.findOne({ orderType }).then((results) => {
        if (results && results.availability) {
          ordersModel.create({ ...data, orderType: results._id }).then(() => {
            console.log("Order created successfully");
            res.status(200).json("Order created successfully");
          });
        } else if (!results) {
          console.log("Invalid Service Request");
          res.status(400).json("Invalid Service Request");
        } else {
          console.log("Service Currently Unavailable");
          res.status(200).json("Service Currently unavailable");
        }
      });
      break;

    case "reservation":
      const { reservationType, startDate, endDate } = req.body;

      reservationTypesModel.findOne({ reservationType }).then((results) => {
        console.log(results);
        if (results && results.availability) {
          reservationsModel
            .create({
              ...data,
              reservationType: results._id,
              startDate,
              endDate,
            })
            .then(() => {
              console.log("Reservation created successfully");
              res.status(200).json("Reservation created successfully");
            });
        } else if (!results) {
          console.log("Invalid Service Request");
          res.status(400).json("Invalid Service Request");
        } else {
          console.log("Service Currently Unavailable");
          res.status(200).json("Service Currently unavailable");
        }
      });

      break;
    default:
      res.status(400).json("Invalid service request");
  }
};

const confirmService = (req, res) => {
  const { serviceId, userId, service } = req.body;

  //Check if the user is verified to perform such an action
  //Do the action
  //Record log

  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Confirmed" })
        .then((results) => {
          if (results) {
            res.status(200).json("Service Request Confirmed");
          } else {
            res.status(400).json("Service request not found");
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
      break;
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Confirmed" })
        .then((results) => {
          if (results) {
            res.status(200).json("Service Request Confirmed");
          } else {
            res.status(400).json("Service request not found");
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
      break;
    default:
      res.status(400).json("Invalid service request");
  }
};

const resolveService = (req, res) => {
  const { serviceId, userId, service } = req.body;

  //Check if the user is verified to perform such an action
  //Do the action
  //Record log

  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Resolved" })
        .then((results) => {
          if (results) {
            res.status(200).json("Service Request Resolved");
          } else {
            res.status(400).json("Service request not found");
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
      break;
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Resolved" })
        .then((results) => {
          if (results) {
            res.status(200).json("Service Request Resolved");
          } else {
            res.status(400).json("Service request not found");
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
      break;
    default:
      res.status(400).json("Invalid service request");
  }
};

const resolveServicePayment = (req, res) => {
  const { service, serviceId, userId } = req.body;

  //Check if the user is verified to perform such an action
  //Resolve service payment
  //Record log

  console.log(req.body);

  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { paymentStatus: "Resolved" })
        .then((results) => {
          if (results) {
            console.log("Service Payment Resolved");
            res.status(200).json("Service Payment Resolved");
          } else {
            cconsole.log("Service Payment Resolved");
            res.status(400).json("Service not found");
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
      break;
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { paymentStatus: "Resolved" })
        .then((results) => {
          if (results) {
            console.log("Service Payment Resolved");
            res.status(200).json("Service Payment Resolved");
          } else {
            res.status(400).json("Service not found");
          }
        })
        .catch((err) => {
          console.log("Service Payment Resolved");
          res.status(400).json(err.message);
        });
      break;
    default:
      res.status(400).json("Invalid service request");
  }
};

const cancelService = (req, res) => {
  const { serviceId, userId, service } = req.body;

  //Check if the user is verified to perform such an action
  //Do the action
  //Record log

  switch (service) {
    case "order":
      ordersModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Cancelled" })
        .then((results) => {
          if (results) {
            res.status(200).json("Service Request Cancelled");
          } else {
            res.status(400).json("Service request not found");
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
      break;
    case "reservation":
      reservationsModel
        .findByIdAndUpdate({ _id: serviceId }, { status: "Cancelled" })
        .then((results) => {
          if (results) {
            res.status(200).json("Service Request Cancelled");
          } else {
            res.status(400).json("Service request not found");
          }
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
      break;
    default:
      res.status(400).json("Invalid service request");
  }
};

const registerReservationType = (req, res) => {
  const { reservationType, availability } = req.body;

  const data = { reservationType, availability };
  reservationTypesModel
    .create(data)
    .then(() => {
      res
        .status(200)
        .json({ message: "Reservation Type Created Successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const registerOrderType = (req, res) => {
  const { orderType, availability } = req.body;

  const data = { orderType, availability };
  orderTypesModel
    .create(data)
    .then(() => {
      res.status(200).json({ message: "Order Type Created Successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  requestService,
  confirmService,
  resolveService,
  resolveServicePayment,
  registerReservationType,
  registerOrderType,
  cancelService,
};
