const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

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

module.exports = { generateEncryptedHash, generateOTPObject };
