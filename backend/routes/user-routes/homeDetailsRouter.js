const express = require("express");

const homeDetailsRouter = express.Router();

const homeController = require("../../controller/home");

homeDetailsRouter.get("/home-details/home/:id", homeController.getHomeDetails);

module.exports = homeDetailsRouter;
