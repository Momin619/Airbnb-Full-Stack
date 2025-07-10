const express = require("express");

const errorRouter = express.Router();

const path = require("path");

const rootPath = require("../../utils/path-utils");

errorRouter.use((req, res, next) => {
  res
    .status(404)
    .render(path.join(rootPath, "views", "error-view", "error.ejs"), {
      pageTitle: "404 Page not found ",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
});

exports.errorRouter = errorRouter;
