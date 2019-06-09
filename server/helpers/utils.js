import fs from 'fs';
/* eslint-disable no-unused-expressions */
const getRandomNumber =
(min, max) => Math.floor(Math.random() * (max - min) + min);

export const sortNumberInAscAndDesc = (values, order) => {
  let sortedValue;
  order === 'ASC' ?
    sortedValue = values.sort((a, b) => a - b) :
    sortedValue = values.sort((a, b) => b - a);
  return sortedValue;
};

export const getRandomPhoneNumber = (min, max) => {
  let phoneNumber;
  phoneNumber = `0${getRandomNumber(min, max)}`;
  return phoneNumber;
};

export const savePhoneNumberToFile = async (quantity, phoneNumber) => {
  try {
    const generatedNumbers = [];
    const maxNumber = 999999999;
    const minNumber = 100000000;
    const filePath = 'server/phoneData/phoneNumbers';
    while (generatedNumbers.length < quantity) {
      phoneNumber = getRandomPhoneNumber(minNumber, maxNumber);
      if (!generatedNumbers.includes(phoneNumber)) {
        generatedNumbers.push(phoneNumber);
      }
    }
    const savedNumbers = fs.writeFile(`${filePath}.txt`,
      generatedNumbers, 'utf8', (err) => {
        if (err) throw err;
      });

    return {
      numberList: generatedNumbers,
      savedPhoneNumber: savedNumbers
    };
  } catch (error) {
    return error;
  }
};
