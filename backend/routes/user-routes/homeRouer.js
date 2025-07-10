const express = require("express");

const homeRouter = express.Router();

const homeController = require("../../controller/home");

homeRouter.get("/home", homeController.getHome);

module.exports = homeRouter;
