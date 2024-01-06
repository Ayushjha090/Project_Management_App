const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const { registerUserSchema } = require("../validator/authValidator");

const saltRounds = Number(process.env.PASSWORD_SALT_ROUNDS);
if (!saltRounds) {
  throw new Error("PASSWORD_SALT_ROUNDS environment variable is missing!");
}

const generatePasswordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const handleUserRegisteration = async (req, res) => {
  const { body } = req;
  let data = {};
  try {
    data = await registerUserSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    return res.status(400).json({ errors: error.errors });
  }

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
