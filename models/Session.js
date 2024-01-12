const express = require("express");
const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    revoked: {
      type: Boolean,
      required: false,
      default: false,
    },
    expirationTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
