const express = require("express");

const bookingRouter = express.Router();

const homeController = require("../../controller/home");

bookingRouter.get("/booking", homeController.getBooking);

module.exports = bookingRouter;
