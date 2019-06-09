import fs from 'fs';
/* eslint-disable require-jsdoc */
import {
  getRandomPhoneNumber,
  savePhoneNumberToFile,
  sortNumberInAscAndDesc
} from '../helpers/utils';

const filePath = 'server/phoneData/phoneNumbers';
const phoneNumbers = fs.readFileSync(`${filePath}.txt`, 'utf8');
const allNumbers = !phoneNumbers ? [] : phoneNumbers.split(',');

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

  static async sortNumbers(req, res, next) {
    try {
      const { order } = req.query;
      const totalNumbersGotten = allNumbers.length;

      const sort = await sortNumberInAscAndDesc(allNumbers, order);

      if (!order) {
        return res.status(200).json({
          message: 'All numbers gotten',
          allNumbers,
          totalNumbersGotten
        });
      }
      return res.status(200).json({
        message: 'All number successfully sorted',
        sortedNumber: sort
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getPhoneNumbers(req, res, next) {
    try {
      const { size, order } = req.query;
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
      if (order) {
        return PhoneNumberGenerator.sortNumbers(req, res, next);
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

  static async getMinAndMaxNumber(_, res, next) {
    try {
      const min = Math.min(...allNumbers);
      const max = Math.max(...allNumbers);
      if (!allNumbers) {
        return res.status(404).json({
          message: 'numbers not found'
        });
      }
      return res.status(200).json({
        message: 'Min and Max for Phone number retrieved successfully',
        minAndMax: {
          max: `0${max}`,
          min: `0${min}`
        }
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default PhoneNumberGenerator;
