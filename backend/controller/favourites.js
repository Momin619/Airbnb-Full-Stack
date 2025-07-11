const path = require("path");
const mongoose = require("mongoose");
const rootPath = require("../utils/path-utils");
const { ObjectId } = require("mongodb");
const Home = require("../model/home");
const User = require("../model/user");

exports.postAddFavourites = async (req, res) => {
  const homeId = req.params.id;
  const userId = req.session.user?._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.redirect("/");
    }

    const homeObjectId = new mongoose.Types.ObjectId(homeId);

    // Prevent adding null/duplicate homeId
    const alreadyFavourited = user.favourites.some(
      (favId) => favId && favId.equals(homeObjectId)
    );

    if (!alreadyFavourited) {
      user.favourites.push(homeObjectId);
      await user.save();
      req.session.user = user; // Update session with latest favourites
    }

    res.status(201).json({ message: "Home added to favourites" });
  } catch (err) {
    console.error("Error adding to favourites:", err);
    res.status(500).send("Error adding to favourites");
  }
};

exports.getFavouriteHome = async (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/");

  try {
    // ✅ Step 1: Remove nulls from user's favourites
    await User.updateOne(
      { _id: req.session.user._id },
      { $pull: { favourites: null } }
    );

    // ✅ Step 2: Fetch updated user and populate favourites
    const user = await User.findById(req.session.user._id).populate(
      "favourites"
    );

    res.status(201).json({ message: "success", favourites: user.favourites });
  } catch (err) {
    console.error("Error fetching favourites:", err);
    res.status(500).send("Error fetching favourites");
  }
};

exports.removeFavouriteHome = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const homeId = req.params.id;

    // Remove the homeId from the user's favourites array
    await User.findByIdAndUpdate(userId, {
      $pull: { favourites: homeId },
    });

    // Refresh session user to reflect updated favourites
    const updatedUser = await User.findById(userId);
    req.session.user = updatedUser;

    res.redirect("/favourites");
  } catch (error) {
    console.error("Error in removing favourite:", error);
    res.status(500).send("Server error while removing favourite");
  }
};
