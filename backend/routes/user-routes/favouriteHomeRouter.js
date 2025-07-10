const express = require("express");

const favouriteHomeRouter = express.Router();

const favouriteController = require("../../controller/favourites");

favouriteHomeRouter.post(
  "/favourite/home/:id",
  favouriteController.postAddFavourites
);

favouriteHomeRouter.post(
  "/remove-favourite/home/:id",
  favouriteController.removeFavouriteHome
);

favouriteHomeRouter.get("/favourites", favouriteController.getFavouriteHome);

exports.favouriteHomeRouter = favouriteHomeRouter;
