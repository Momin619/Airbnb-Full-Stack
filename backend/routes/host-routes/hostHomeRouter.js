const express = require("express");
const hostHomeRouter = express.Router();

const homeController = require("../../controller/home");

hostHomeRouter.get("/homes", homeController.getHostHome);

module.exports = hostHomeRouter;
