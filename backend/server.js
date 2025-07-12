const serverBootTime = Date.now();
const express = require("express");

const app = express();
// Place at the top of app.js

const mongoose = require("mongoose");

const path = require("path");

const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
const rootPath = require("./utils/path-utils");
const homeRouter = require("./routes/user-routes/homeRouter");

const hostHomeRouter = require("./routes/host-routes/hostHomeRouter");

const addHomeRouter = require("./routes/host-routes/addHomeRouter");

const editHomeRouter = require("./routes/host-routes/editHomeRouter");

const homeDetailsRouter = require("./routes/user-routes/homeDetailsRouter");

const {
  favouriteHomeRouter,
} = require("./routes/user-routes/favouriteHomeRouter");

const deleteHomeRouter = require("./routes/host-routes/deleteHomeRouter");

const { authRouter } = require("./routes/auth-route/authRouter");

const methodUrlRouter = require("./routes/method-url-route/methodUrlRouter");

const bookingRouter = require("./routes/user-routes/bookingRouter");

// external modules

const port = 3500;

const mongo_url =
  "mongodb+srv://root:root@full-stack-crud-app.tafe4zh.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Full-Stack-Crud-App";

const session = require("express-session");

const mongodb_session = require("connect-mongodb-session")(session);

const store = new mongodb_session({
  uri: mongo_url,
  collection: "sessions",
});

app.use(express.static("public"));
app.use("/uploads", express.static(path.join(rootPath, "uploads")));
app.use(
  "/rules",
  express.static(path.join(__dirname, "rules"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
      }
    },
  })
);

app.use(
  session({
    secret: "this is my website",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// ✅ Force session login state to false on first request (per session)
app.use((req, res, next) => {
  if (
    !req.session.bootTime || // first time ever
    req.session.bootTime < serverBootTime // server restarted after session created
  ) {
    req.session.isLoggedIn = false;
    req.session.user = null;
    req.session.bootTime = serverBootTime;
  }
  next();
});

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.set("views", "views");

app.use(methodUrlRouter);

// In your Express server (e.g., routes/auth.js or app.js)
app.get("/check-auth", (req, res) => {
  if (req.session.isLoggedIn && req.session.user) {
    return res.json({
      isLoggedIn: true,
      user: req.session.user,
    });
  } else {
    return res.json({
      isLoggedIn: false,
      user: null,
    });
  }
});

// app.use((req, res, next) => {
//   const loginSession = req.session.isLoggedIn;
//   const userSession = req.session.user;
//   // ✅ Correct logging
//   console.log("User session:", userSession);
//   console.log("Login session:", loginSession);
//   next();
// });

app.use(authRouter);
app.use("/host", hostHomeRouter);

app.use("/host", addHomeRouter);

app.use("/host", editHomeRouter);

app.use(favouriteHomeRouter);

app.use("/host", deleteHomeRouter);

app.use(bookingRouter);

app.use(homeRouter);

app.use(homeDetailsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

mongoose
  .connect(mongo_url)
  .then(() => {
    app.listen(port, () =>
      console.log("Server is running on http://localhost:3500")
    );
  })
  .catch((err) => console.log(err));
