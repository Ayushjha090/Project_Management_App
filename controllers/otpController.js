const express = require("express");

const OTP = require("../models/OTP");
const { generateOTPObject } = require("../utils/helper");

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = req.user;

  if (!email || !user) {
    throw new Error("Invalid email or user id.");
  }
  try {
    let otpObject = await generateOTPObject();
    let isOTPExisiting = await OTP.findOne({ otp: otpObject.otp });
    while (isOTPExisiting) {
      otpObject = await generateOTPObject();
      result = await OTP.findOne({ otp: otpObject.otp });
    }

    const otp = new OTP({ ...otpObject, email: email, user: user["_id"] });
    await OTP.create(otp);

    return res.status(201).send({ message: "OTP sent to registered email id" });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
    throw error;
  }
};

module.exports = { sendOtp };
