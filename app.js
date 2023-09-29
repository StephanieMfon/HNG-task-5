import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { router } from "./src/route.js";
import { globalErrorHandler } from "./src/globalErrorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
app.use(cors({ origin: "*" }));
app.use("/api", router);
app.use(globalErrorHandler);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
