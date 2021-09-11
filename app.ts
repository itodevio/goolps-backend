import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import MongooseConnection from "./src/connection/Mongoose.connection";
import v1 from "./src/routes/v1";

MongooseConnection.connect();
const app = express();

const { AMBIENT, PORT } = process.env;

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.info(req.method, req.originalUrl);
  next();
};

app.use(helmet());
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", v1);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export { app };
