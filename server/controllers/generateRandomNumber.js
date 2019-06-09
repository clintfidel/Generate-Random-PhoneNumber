import fs from 'fs';
/* eslint-disable require-jsdoc */
import {
  getRandomPhoneNumber,
  savePhoneNumberToFile,
} from '../helpers/utils';

const filePath = 'server/phoneData/phoneNumbers';

class PhoneNumberGenerator {
  static async generateRandomPhoneNumber(req, res, next) {
    try {
      const { size } = req.query;
      const maxSize = size || 10000;
      const { numberList } =
      await savePhoneNumberToFile(maxSize, getRandomPhoneNumber);
      if (!numberList) {
        return res.status(404).json({
          message: 'numbers not found'
        });
      }
      res.status(201).json({
        message: 'Numbers generated successfully',
        phoneNumbers: numberList,
        quantityGenerated: maxSize
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getPhoneNumbers(req, res, next) {
    try {
      const { size } = req.query;
      const phoneNumbers = fs.readFileSync(`${filePath}.txt`, 'utf8');
      const allNumbers = !phoneNumbers ? [] : phoneNumbers.split(',');
      const totalNumbersGotten = allNumbers.length;
      if (!totalNumbersGotten) {
        return res.status(404).json({
          message: 'numbers not found'
        });
      }
      if (size) {
        const numbersGotten = allNumbers.splice(0, size);
        return res.status(200).json({
          message: 'All numbers gotten',
          Numbers: numbersGotten,
          totalNumbersGotten: numbersGotten.length
        });
      }
      return res.status(200).json({
        message: 'All numbers gotten',
        allNumbers,
        totalNumbersGotten
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default PhoneNumberGenerator;
