var mongoose = require('mongoose');
const express = require("express")
const router = express.Router()
var Grid = require('gridfs-stream');
const cors = require("cors")

let gfs,bucket
const corsOptions = {
  origin: 'https://what-app-sand.vercel.app', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

router.use(cors(corsOptions));

const conn = mongoose.connection;
conn.once('open', function () {
  // Create GridFSBucket and GridFSStream objects
  bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs'
  });
  gfs =Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});


router.get("/file/:filename", async (req, res) => {
   try {

    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const readStream = bucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;