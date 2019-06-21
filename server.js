import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import winston from 'winston';
import routes from './server/routes/index';

dotenv.config();

const PORT = process.env.PORT || 2300;

const app = express();

app.use(cors());

routes(app);
app.get('/api/v1', (_, res) => {
  res.status(200).json({
    message: 'Welcome to PhoneNumberGenerator Api'
  });
});

app.listen(PORT, () => {
  winston.info(`app is running on port ${PORT}`);
});

export default app;
