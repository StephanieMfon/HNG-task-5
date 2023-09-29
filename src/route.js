import express from "express";
import { upload } from "./utilities.js";
import { uploadFile, getFile } from "./controller.js";

const router = express.Router();

// Handle video uploads Controller
router.post("/upload", upload.single("video"), uploadFile);

// Handle video retrieval controller

router.get("/getVideo/:uniqueName", getFile);

export { router };
