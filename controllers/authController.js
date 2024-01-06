const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { saltRounds } = require("../config/constants");
const { generatePasswordHash } = require("../config/helper");

if (!saltRounds) {
  throw new Error("PASSWORD_SALT_ROUNDS environment variable is missing!");
}

const handleUserRegisteration = async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      try {
        const hashedPassword = await generatePasswordHash(password);
        data.password = hashedPassword;
        const newUser = new User({
          ...data,
        });

        await User.create(newUser);

        return res
          .status(201)
          .send({ message: "User registered successfully" });
      } catch (error) {
        res.status(500).send({ message: "Internal server error" });
        throw error;
      }
    }

    return res.status(400).send({ message: "User already exists" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error - Database error occured" });
    throw error;
  }
};

module.exports = {
  handleUserRegisteration,
};
