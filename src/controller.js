import fs from "fs";
import { uniqueFileName, getMimeTypeForFileExtension } from "./utilities.js";
import { BadUserRequestError, NotFoundError } from "./error_handler.js";
const uploadFile = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				status: "Failed",
				message: "No file Uploaded",
			});
		}

		res.status(201).json({
			status: "success",
			name: req.file.originalname,
			message: "Video uploaded successfully",
			id: uniqueFileName,
		});
	} catch (error) {
		res.status(404).json({
			status: "failure",
			message: error.message,
		});
	}
};

const getFile = async (req, res) => {
	const uniqueName = req.params.uniqueName;

	if (!req.params.uniqueName) {
		res.status(400).json({
			status: "Failed",
			message: "File does not exist",
		});
	}

	const videoPath = `videos/${uniqueName}`;
	const existsSunc = fs.existsSync(videoPath);

	if (!existsSunc) {
		res.status(404).json({
			status: "Failed",
			message: "Incomplete URL",
		});
	}

	const fileExtension = uniqueName.split(".").pop();
	const mimeType = getMimeTypeForFileExtension(fileExtension);

	try {
		res.setHeader("Content-Type", mimeType);
		res.setHeader("Cache-control", "no-cache, no-store, must-revalidate");
		res.setHeader("Pragma", "no-cache");
		res.setHeader("Expires", "0");

		// Stream the video file
		const videoStream = fs.createReadStream(videoPath);
		videoStream.pipe(res);
	} catch (err) {
		console.log(err.stack);
		res.status(404).json({
			status: "Failed",
			message: "err.message",
		});
	}
};

export { uploadFile, getFile };
