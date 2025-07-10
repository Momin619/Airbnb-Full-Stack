const express = require("express");

const deleteHomeRouter = express.Router();

const homeController = require("../../controller/home");

deleteHomeRouter.post("/delete-home/home/:id", homeController.postDeleteHome);

module.exports = deleteHomeRouter;
