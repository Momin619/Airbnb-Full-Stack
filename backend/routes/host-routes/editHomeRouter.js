const express = require("express");

const editHomeRouter = express.Router();

const homeController = require("../../controller/home");

editHomeRouter.get("/edit-home/home/:id", homeController.getEditHome);

editHomeRouter.post("/edit-home/home/:id", homeController.postEditHome);

module.exports = editHomeRouter;
