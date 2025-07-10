const express = require("express");

const addHomeRouter = express.Router();

const homeController = require("../../controller/home");

const upload = require("../../routes/multer/multer");

addHomeRouter.get("/add-home", homeController.getAddHome);

const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "rulesPdf", maxCount: 1 },
]);

addHomeRouter.post("/add-home", uploadFields, homeController.postAddHome);

module.exports = addHomeRouter;
