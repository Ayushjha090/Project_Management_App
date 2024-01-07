const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

const { saltRounds } = require("./constants");

const generatePasswordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
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

module.exports = { generatePasswordHash, generateOTPObject };
