const express = require("express");
const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expirationTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 5 });

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
