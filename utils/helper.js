const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const ObjectId = require("mongoose").Types.ObjectId;

const { saltRounds } = require("./constants");

const generateEncryptedHash = async (contentToBeHashed) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedContent = await bcrypt.hash(contentToBeHashed, salt);
    return hashedContent;
  } catch (error) {
    throw error;
  }
};

const generateOTPObject = async () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const expirationTime = new Date().getTime() + 5 * 60000;

  return { otp, expirationTime };
};

const checkObjectIdValid = (id) => {
  if (ObjectId.isValid(id)) {
    if (new ObjectId(id) == id) {
      return true;
    }
  }

  return false;
};

module.exports = {
  generateEncryptedHash,
  generateOTPObject,
  checkObjectIdValid,
};
