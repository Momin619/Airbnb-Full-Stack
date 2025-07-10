const express = require("express");

const authRouter = express.Router();

const authController = require("../../controller/auth");
authRouter.get("/signup", authController.getSignup);

authRouter.post("/signup", authController.postSignup);

authRouter.get("/", authController.getLogin);

authRouter.post("/login", authController.postLogin);

authRouter.post("/logout", authController.postLogout);

exports.authRouter = authRouter;
