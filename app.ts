import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import MongooseConnection from "./src/connection/Mongoose.connection";
import v1 from "./src/routes/v1";

MongooseConnection.connect();
const app = express();

const { AMBIENT, PORT } = process.env;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", v1);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(400);
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({
    message: error.message,
  });
});

app.listen(PORT, () => console.log(`[${AMBIENT}] - Listening on port ${PORT}`));

export { app };
