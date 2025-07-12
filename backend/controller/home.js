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
  console.log(req.session.user);
  const userId = req.session.user._id;
  try {
    const homes = await Home.find({ owner: userId });
    console.log(homes);
    if (homes) {
      res.status(200).json({ homes });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getHome = async (req, res, next) => {
  try {
    const homes = await Home.find();
    console.log(`homes  :${homes}`);
    res.status(200).json({ homes });
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
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not logged in" });
  }
  const userId = req.session.user._id;
  console.log("userId ", userId);
  try {
    const { title, price, description, location } = req.body;
    console.log(req.body);
    console.log(req.files);
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
      owner: userId,
    });

    await home.save();

    res.status(201).json({
      message: "Home added successfully",
      home: {
        title,
        price,
        description,
        location,
        image: imagePath,
        rulesPdf: rulesPath,
        owner: userId,
      },
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
    res.status(201).json({ home });
  } catch (error) {
    console.log("Error in getEditHome:", error);
    res.status(500).json({ message: "Failed to fetch home" });
  }
};

const fs = require("fs");
// const path = require("path");
// const Home = require("../models/home");

// const path = require("path");

// const Home = require("../models/home");

exports.postEditHome = async (req, res, next) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  try {
    const homeId = req.params.id;

    const home = await Home.findById(homeId);
    if (!home) {
      console.log("Home not found");
      return res.status(404).json({ message: "Home not found" });
    }

    const update = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      location: req.body.location,
    };

    // ✅ Handle image update
    if (req.files?.image && req.files.image.length > 0) {
      if (home.image) {
        const oldImagePath = path.join(__dirname, "..", home.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.log("Failed to delete old image:", err.message);
        });
      }
      update.image = "/" + req.files.image[0].path.replace(/\\/g, "/");
    }

    // ✅ Handle rulesPdf update
    if (req.files?.rulesPdf && req.files.rulesPdf.length > 0) {
      if (home.rulesPdf) {
        const oldPdfPath = path.join(__dirname, "..", home.rulesPdf);
        fs.unlink(oldPdfPath, (err) => {
          if (err) console.log("Failed to delete old PDF:", err.message);
        });
      }
      update.rulesPdf = "/" + req.files.rulesPdf[0].path.replace(/\\/g, "/");
    }

    // ✅ Save the update
    const updatedHome = await Home.findByIdAndUpdate(homeId, update, {
      new: true, // return updated doc
    });

    res.status(201).json({
      message: "Home updated successfully",
      home: updatedHome,
    });
  } catch (err) {
    console.error("Error in postEditHome:", err);
    res.status(500).json({ message: "Error updating home" });
  }
};

exports.postDeleteHome = async (req, res, next) => {
  const homeId = req.params.id;

  try {
    const home = await Home.findById(homeId);
    if (!home) {
      return res.redirect("/host/home");
    }

    // ✅ Delete home image if exists
    if (home.image) {
      const imagePath = path.join(__dirname, "..", home.image);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.log("Image deletion failed:", err.message);
        });
      }
    }

    // ✅ Delete rulesPdf if exists
    if (home.rulesPdf) {
      const pdfPath = path.join(__dirname, "..", home.rulesPdf);
      if (fs.existsSync(pdfPath)) {
        fs.unlink(pdfPath, (err) => {
          if (err) console.log("PDF deletion failed:", err.message);
        });
      }
    }

    // ✅ Delete home from DB
    await Home.findByIdAndDelete(homeId);

    // ✅ Remove home from all users' favourites array
    await User.updateMany(
      { favourites: homeId },
      { $pull: { favourites: homeId } }
    );

    res.status(201).json({ message: "Home deleted successfully" });
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
    res.status(201).json({ home });
  } catch (error) {
    console.log(error);
  }
};
