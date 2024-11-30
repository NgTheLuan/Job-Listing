import express from "express";
import cloudinary from "cloudinary";
import fs from "fs";
const router = express.Router();

//Upload image on Cloudinary
cloudinary.config({
  cloud_name: "ngtheluan",
  api_key: "745714459533618",
  api_secret: "cGT5jUWMLh03WlqbjiWN9RSQjNc",
});

//Upload image
router.post("/upload", (req, res) => {
  try {
    // console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files were uploaded." });
    }

    const file = req.files.file;
    // 1024 * 1024 = 1MB
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Size too large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "jobsTLK" },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);
        // res.json({ result });
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//Delete image
router.post("/destroy", (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No images Selected" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;
      res.json({ msg: "Deleted Image" });
    });
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default router;
