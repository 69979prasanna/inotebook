const express = require("express");
const multer = require("multer");
const fetchuser = require("../middleware/fetchuser");
const File = require("../models/Files");
const supabase = require("../supabase"); 

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", fetchuser, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `users/${req.user.id}/${Date.now()}-${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from("inotebook")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Inotebook upload failed" });
    }

    const TEN_YEARS = 60 * 60 * 24 * 365 * 10
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("inotebook")
      .createSignedUrl(filePath, TEN_YEARS) 

    if (urlError) {
      console.error(urlError);
      return res.status(500).json({ message: "URL generation failed" });
    }

    const file = new File({
      userId: req.user.id,
      filename: req.file.originalname,
      fileType: req.file.mimetype,
      fileUrl: signedUrlData.signedUrl, 
    });

    await file.save();

    res.json({
      message: "File uploaded successfully",
      file,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

router.get("/list", fetchuser, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    res.json({ files });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch files" });
  }
})
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await File.findOne({ _id: fileId, userId: req.user.id });
    if (!file) return res.status(404).json({ message: "File not found" });

    const signedUrl = file.fileUrl;

    let path = signedUrl.split("/inotebook/")[1].split("?")[0];
    path = decodeURIComponent(path);

    console.log("Extracted path:", path);

    const { error: deleteError } = await supabase.storage
      .from("inotebook")
      .remove([path]);

    if (deleteError) {
      console.log(deleteError);
      return res.status(500).json({ message: "Supabase delete failed" });
    }

    await File.deleteOne({ _id: fileId });

    res.json({ message: "File deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
})


module.exports = router;
