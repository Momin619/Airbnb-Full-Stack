const express = require("express");

const editHomeRouter = express.Router();

const homeController = require("../../controller/home");

editHomeRouter.get("/edit-home/home/:id", homeController.getEditHome);
const upload = require("../../routes/multer/multer.js");
editHomeRouter.post(
  "/edit-home/home/:id",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "rulesPdf", maxCount: 1 },
  ]),
  homeController.postEditHome
);

module.exports = editHomeRouter;
