import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/uploads");
  },
  filename: (req, file, callback) => {
    const fileName = `${new Date().getTime()}${file.originalname}`;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
