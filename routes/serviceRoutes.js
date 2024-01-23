const express = require("express");
const router = express.Router();

const {
  requestService,
  confirmService,
  resolveService,
  resolveServicePayment,
  cancelService,
  registerOrderType,
  registerReservationType,
} = require("../controllers/servicesController");

router.post("/service", (req, res) => {
  requestService("order", req, res);
});

router.patch("/service", (req, res) => {
  confirmService(req, res);
});
router.post("/cancelService", (req, res) => {
  cancelService(req, res);
});

router.post("/resolveService", (req, res) => {
  resolveService(req, res);
});

router.post("/orderType", (req, res) => {
  registerOrderType(req, res);
});

router.post("/reservationType", (req, res) => {
  registerReservationType(req, res);
});

router.patch("/resolveServicePay", (req, res) => {
  resolveServicePayment(req, res);
});

module.exports = router;
