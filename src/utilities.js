import multer from "multer";
import path from "path";
let uniqueFileName;

// Multer configuration

const storage = multer.diskStorage({
	destination: "./videos/",
	filename: (req, file, callback) => {
		const filename = file.originalname;
		const fileExtension = path.extname(filename);
		uniqueFileName = `${Date.now()}${fileExtension}`;
		callback(null, uniqueFileName);
	},
});
const upload = multer({ storage: storage });

function getMimeTypeForFileExtension(fileExtension) {
	switch (fileExtension.toLowerCase()) {
		case "mp4":
			return "video/mp4";
		case "webm":
			return "video/webm";
		case "ogg":
			return "video/ogg";
		default:
			return "application/octet-stream"; // Default to binary data
	}
}

export { uniqueFileName, upload, getMimeTypeForFileExtension };
