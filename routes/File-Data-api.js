const express = require("express");
const multer = require("multer");
const router = express.Router();
const cors = require("cors")
const { GridFsStorage } = require('multer-gridfs-storage');


const storage = new GridFsStorage({
  url: "mongodb://ahsanch:ahsanch@ac-wq8q6z9-shard-00-00.iueoiik.mongodb.net:27017,ac-wq8q6z9-shard-00-01.iueoiik.mongodb.net:27017,ac-wq8q6z9-shard-00-02.iueoiik.mongodb.net:27017/ahsan?ssl=true&replicaSet=atlas-yh7jn7-shard-0&authSource=admin&retryWrites=true&w=majority",
  file: (req, file) => {
    if (!file) {
      return null;
    }

    const data = ["image/png", "image/jpeg"];

    if (data.indexOf(file.mimetype) === -1) {
      return `${Date.now()} -file- ${file.originalname}`;
    }

    return {
   
      filename: `${Date.now()} -file- ${file.originalname}`
    };
  }
});


const upload = multer({ storage });

router.post("/Upload/Files", upload.single("file"), (req, res) => {

  const img = "https://whatsapp-api-khaki.vercel.app";
  const imgUrl = `${img}/file/${req.file.filename}`;
  
  console.log("File uploaded successfully:", imgUrl);
  
  return res.status(200).json({ message: "File uploaded successfully", imgUrl });
});



module.exports = router;
