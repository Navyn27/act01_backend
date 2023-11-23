//For orders
const ordersModel = require("../models/ordersModel");
const orderTypesModel = require("../models/orderTypesModel");

//For reservations
const reservationsModel = require("../models/reservationsModel");
const reservationTypesModel = require("../models/reservationTypesModel");

const requestService = (service, req, res) => {
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

const registerServiceType = (service, req, res) => {
  const { type, availability } = req.body;

  const data = { type, availability };
  switch (service) {
    case "reservation":
      reservationTypesModel
        .create({ ...data, amount: req.body, amount })
        .then(() => {
          res
            .status(200)
            .json({ message: "Reservation Type Created Successfully" });
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    case "order":
      orderTypesModel
        .create(data)
        .then(() => {
          res
            .status(200)
            .json({ message: "Reservation Type Created Successfully" });
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    default:
      res.status(404).json({ message: "Invalid Service Type" });
  }
};

module.exports = {
  requestService,
  confirmService,
  resolveService,
  resolveServicePayment,
  registerServiceType,
  cancelService,
};
