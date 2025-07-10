const path = require("path");
const { check, validationResult } = require("express-validator");
const rootPath = require("../utils/path-utils");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
// GET /login
exports.getLogin = (req, res, next) => {
  res.render(path.join(rootPath, "views", "auth-views", "login.ejs"), {
    pageTitle: "Login",
    isLoggedIn: req.session.isLoggedIn,
    oldInput: { email: "" },
    user: {},
  });
};

// POST /login
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("form data came ", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ errors: ["user dont exists"] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).json({ errors: ["passwords not matched"] });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    return res.status(200).json({
      message: "Login successful",
      redirectTo: user.userType === "guest" ? "/home" : "/host/home",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      },
      isLoggedIn: true,
    });
  } catch (error) {
    onsole.error(err);
    return res.status(500).json({ errors: ["Internal server error"] });
  }
};

// POST /logout
exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    console.log("session destroyed");
    res.status(200).json({ message: "Logged out" });
  });
};

// GET /signup
exports.getSignup = (req, res, next) => {
  res.render(path.join(rootPath, "views", "auth-views", "signup.ejs"), {
    pageTitle: "Signup",
    isLoggedIn: req.session.isLoggedIn,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    user: {},
  });
};

// POST /signup
exports.postSignup = [
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name should be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name should contain only letters and spaces"),

  check("lastName")
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name should contain only letters and spaces"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Include lowercase")
    .matches(/[A-Z]/)
    .withMessage("Include uppercase")
    .matches(/[0-9]/)
    .withMessage("Include number"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("userType")
    .notEmpty()
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms").custom((value, { req }) => {
    if (!req.body.terms) {
      throw new Error("You must agree to the terms and conditions");
    }
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map((e) => e.msg),
      });
    }

    const { firstName, lastName, email, password, userType } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];
