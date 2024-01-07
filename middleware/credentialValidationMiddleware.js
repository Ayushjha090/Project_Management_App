const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const credentialValidationMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message:
          "Invalid email or password. Please check your credentials and try again.",
      });
    }
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({
        message:
          "Invalid email or password. Please check your credentials and try again.",
      });
    }
    req.userId = user["_id"];
    next();
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    throw error;
  }
};

module.exports = credentialValidationMiddleware;
