const express = require("express");

const editHomeRouter = express.Router();

const homeController = require("../../controller/home");

editHomeRouter.get("/edit-home/home/:id", homeController.getEditHome);
const upload = require("../../routes/multer/multer.js");
editHomeRouter.post(
  "/edit-home/home/:id",
  (req, res, next) => {
    console.log("Before multer");
    next();
  },
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "rulesPdf", maxCount: 1 },
  ]),
  (req, res, next) => {
    console.log("After multer, req.files:", req.files);
    next();
  },
  homeController.postEditHome
);

module.exports = editHomeRouter;
