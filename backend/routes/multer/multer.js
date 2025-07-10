const multer = require("multer");
const path = require("path");

// Generate random string for filenames
const randomString = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Filter file types
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
  const allowedPdfTypes = ["application/pdf"];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedPdfTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PNG, JPG, JPEG, and PDF allowed."),
      false
    );
  }
};

// Custom dynamic destination for each type
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, "rules");
    } else {
      cb(null, "uploads");
    }
  },
  filename: (req, file, cb) => {
    const random = randomString(5); // generate 5 random characters
    const originalName = path
      .parse(file.originalname)
      .name.replace(/\s+/g, "-"); // remove spaces and get name without extension
    const ext = path.extname(file.originalname); // get file extension (.pdf, .jpg, etc.)
    cb(null, `${random}-${originalName}${ext}`);
  },
});

// Final multer instance
const upload = multer({
  storage,
  fileFilter,
});

// Register static folders

module.exports = upload;
