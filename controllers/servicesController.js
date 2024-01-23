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
        if (results.availability) {
          ordersModel.create({ ...data, orderType: results._id }).then(() => {
            console.log("working");
            res.status(200).json("Order created successfully");
          });
        } else {
          res.status(200).json("Service Currently unavailable");
        }
      });
      break;

    case "reservation":
      const { reservationType } = req.body;

      reservationTypesModel.findOne({ reservationType }).then((results) => {
        console.log(results);
        if (results.availability) {
          ordersModel
            .create({ ...data, reservationType: results._id })
            .then(() => {
              console.log("working");
              res.status(200).json("Reservation created successfully");
            });
        } else {
          res.status(200).json("Service Currently unavailable");
        }
      });
      break;
    default:
      res.status(400).json("Invalid service request");
  }
};

const confirmService = (service, req, res) => {
  const { serviceId, userId } = req.body;

  //Check if the user is verified to perform such an action
  console.log(service);
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
