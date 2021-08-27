import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import v1 from './src/routes/v1';

const app = express();

const { AMBIENT, PORT } = process.env;

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.info(req.method, req.originalUrl);
  next();
}

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', v1);

if (AMBIENT === 'local') {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

export { app };