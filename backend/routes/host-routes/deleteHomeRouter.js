const express = require("express");

const deleteHomeRouter = express.Router();

const homeController = require("../../controller/home");

deleteHomeRouter.delete("/delete-home/home/:id", homeController.postDeleteHome);

module.exports = deleteHomeRouter;
