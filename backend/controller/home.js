const Home = require("../model/home");

const path = require("path");

const rootPath = require("../utils/path-utils");

const User = require("../model/user");

exports.getBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.render(path.join(rootPath, "views", "user-views", "booking.ejs"), {
      pageTitle: "Booking List",
      bookings: bookings,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getHostHome = async (req, res, next) => {
  try {
    const homes = await Home.find();
    res.render(path.join(rootPath, "views", "user-views", "home.ejs"), {
      pageTitle: "Host home List ",
      homes: homes,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getHome = async (req, res, next) => {
  try {
    const homes = await Home.find();
    res.render(path.join(rootPath, "views", "user-views", "home.ejs"), {
      pageTitle: "Home ",
      homes: homes,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddHome = (req, res, next) => {
  res.render(path.join(rootPath, "views", "host-views", "add-home.ejs"), {
    pageTitle: "Add Home ",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddHome = async (req, res, next) => {
  try {
    const { title, price, description, location } = req.body;

    // Get image path
    const imagePath = req.files?.image?.[0]?.path
      ? "/" + req.files.image[0].path.replace(/\\/g, "/")
      : null;

    // Get rules PDF path
    const rulesPath = req.files?.rulesPdf?.[0]?.path
      ? "/" + req.files.rulesPdf[0].path.replace(/\\/g, "/")
      : null;

    // Debug log
    console.log("Image Path:", imagePath);
    console.log("Rules PDF Path:", rulesPath);

    // Validate image upload
    if (!imagePath) {
      return res.status(400).redirect("/host/add-home");
    }

    // Save to database
    const home = new Home({
      title,
      price,
      description,
      location,
      image: imagePath,
      rulesPdf: rulesPath,
    });

    await home.save();

    res.render(path.join(rootPath, "views", "user-views", "home-added.ejs"), {
      pageTitle: "Home Added",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log("Error in postAddHome:", error);
    res.redirect("/host/add-home");
  }
};

exports.getEditHome = async (req, res, next) => {
  try {
    const homeId = req.params.id;
    const home = await Home.findById(homeId);
    res.render(path.join(rootPath, "views", "host-views", "edit-home.ejs"), {
      pageTitle: "Edit Home",
      home: home,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      // isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {}
};

const fs = require("fs");
// const path = require("path");
// const Home = require("../models/home");

exports.postEditHome = async (req, res, next) => {
  try {
    const homeId = req.params.id;

    const update = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      location: req.body.location,
    };

    const home = await Home.findById(homeId);
    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/home");
    }

    // Handle new image upload
    if (req.files?.image?.[0]) {
      if (home.image) {
        const oldImagePath = path.join(__dirname, "..", home.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log("Failed to delete old image:", err.message);
        });
      }

      update.image = "/" + req.files.image[0].path.replace(/\\/g, "/");
    }

    // Handle new rules PDF upload
    if (req.files?.rulesPdf?.[0]) {
      if (home.rulesPdf) {
        const oldPdfPath = path.join(__dirname, "..", home.rulesPdf);
        fs.unlink(oldPdfPath, (err) => {
          if (err) console.log("Failed to delete old PDF:", err.message);
        });
      }

      update.rulesPdf = "/" + req.files.rulesPdf[0].path.replace(/\\/g, "/");
    }

    await Home.findByIdAndUpdate(homeId, update);
    res.redirect("/host/home");
  } catch (err) {
    console.log("Error in postEditHome:", err);
    res.redirect("/host/home");
  }
};

// const path = require("path");
// const Home = require("../models/home");
// const User = require("../models/user");

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.id;

  try {
    const home = await Home.findById(homeId);
    if (!home) {
      return res.redirect("/host/home");
    }

    // Delete image file from uploads folder
    const imagePath = path.join(__dirname, "..", home.image); // example: /uploads/image.jpg
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log("Image deletion failed:", err.message);
      }
    });

    // Delete home from DB
    await Home.findByIdAndDelete(homeId);

    // Remove home from all users' favourites array
    await User.updateMany(
      { favourites: homeId },
      { $pull: { favourites: homeId } }
    );

    res.redirect("/host/home");
  } catch (err) {
    console.log("Error deleting home:", err);
    res.redirect("/host/home");
  }
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const homeId = req.params.id;
    const home = await Home.findById(homeId);
    console.log("pdf:", home.rulesPdf);
    if (!home) {
      return res.status(404).render(path.join(rootPath, "views", "error.ejs"), {
        pageTitle: "Home Not Found",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    }
    res.render(path.join(rootPath, "views", "user-views", "home-details.ejs"), {
      pageTitle: "Home Details",
      home: home,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (error) {
    console.log(error);
  }
};
