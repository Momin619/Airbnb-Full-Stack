const express = require("express");

const methodUrlRouter = express.Router();

methodUrlRouter.use((req, res, next) => {
  console.log("URL : ", req.url);
  console.log("Method : ", req.method);
  next();
});

module.exports = methodUrlRouter;
