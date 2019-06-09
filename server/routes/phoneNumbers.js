import express from 'express';
import phoneNumber from '../controllers/generateRandomNumber';

const { generateRandomPhoneNumber, getPhoneNumbers } = phoneNumber;

const apiPrefix = '/numbers';

const phoneNumbersRouter = express.Router();
phoneNumbersRouter
  .route(`${apiPrefix}/generate`).get(generateRandomPhoneNumber);
phoneNumbersRouter
  .route(`${apiPrefix}`).get(getPhoneNumbers);

export default phoneNumbersRouter;
