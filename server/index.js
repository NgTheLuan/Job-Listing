import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import fileUpload from "express-fileupload";

import UserRoutes from "./routes/user-routes.js";
import CategoryRoutes from "./routes/category-routes.js";
import UploadRoutes from "./routes/upload-router.js";
import JobRoutes from "./routes/job-routes.js";
import CVRoutes from "./routes/cv-routes.js";

dotenv.config();
//CONFIG FILE
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept, Authorization "
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

//ROUTER
app.use("/api/categories", CategoryRoutes);
app.use("/api/jobs", JobRoutes);
app.use("/api/photo", UploadRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/cvs", CVRoutes);

app.use("/uploads/image", express.static(path.join("uploads", "image")));

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MDB_CONNECT, {
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(`${err} did not connect`));
