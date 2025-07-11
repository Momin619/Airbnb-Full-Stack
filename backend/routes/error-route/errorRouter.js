const express = require("express");

const errorRouter = express.Router();

errorRouter.all("*", (req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

exports.errorRouter = errorRouter;
