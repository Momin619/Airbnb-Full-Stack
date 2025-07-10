const express = require("express");
const hostHomeRouter = express.Router();

const homeController = require("../../controller/home");

hostHomeRouter.get("/home", homeController.getHostHome);

module.exports = hostHomeRouter;
