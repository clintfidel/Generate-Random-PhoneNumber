import express from 'express';
import phoneNumber from '../controllers/generateRandomNumber';

const {
  generateRandomPhoneNumber,
  getPhoneNumbers,
  sortNumbers,
  getMinAndMaxNumber
} = phoneNumber;

const apiPrefix = '/numbers';

const phoneNumbersRouter = express.Router();
phoneNumbersRouter
  .route(`${apiPrefix}/generate`).get(generateRandomPhoneNumber);
phoneNumbersRouter
  .route(`${apiPrefix}`).get(getPhoneNumbers);
phoneNumbersRouter
  .route(`${apiPrefix}/sort`).get(sortNumbers);
phoneNumbersRouter
  .route(`${apiPrefix}/min-and-max`).get(getMinAndMaxNumber);

export default phoneNumbersRouter;
