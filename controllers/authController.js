const express = require("express");

const User = require("../models/User");
const OTP = require("../models/OTP");
const Session = require("../models/Session");
const { signToken } = require("../config/jwt");
const { saltRounds } = require("../utils/constants");
const { generateEncryptedHash } = require("../utils/helper");

if (!saltRounds) {
  throw new Error("PASSWORD_SALT_ROUNDS environment variable is missing!");
}

const handleUserRegisteration = async (req, role, res) => {
  if (!req || !req.body) {
    return res.status(500).send({ erro: "Internal server error" });
  }
  const data = req.body;
  const { email, password } = data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      try {
        const hashedPassword = await generateEncryptedHash(password);
        data.password = hashedPassword;
        const newUser = new User({
          ...data,
          role: role,
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

const hanldeSessionCreation = async (req, res) => {
  if (!req) {
    return res.status(500).send({ error: "Internal server error" });
  }
  if (!req.body || !req.body.oneTimePassword) {
    return res.status(400).send({ error: "Please provide one time password" });
  }
  const { oneTimePassword } = req.body;
  const user = req.user;

  try {
    const userOTP = await OTP.findOne({ user: user["_id"] });
    if (
      userOTP &&
      userOTP.otp &&
      userOTP.otp === oneTimePassword &&
      userOTP.expirationTime.getTime() >= new Date().getTime()
    ) {
      const token = signToken({
        id: user["_id"],
        role: user.role,
        expirationTime: new Date(
          new Date().getTime() + 2 * 24 * 60 * 60 * 1000
        ),
      });

      const newSession = new Session({
        user: user["_id"],
        token: token,
        revoked: false,
        expirationTime: new Date(
          new Date().getTime() + 2 * 24 * 60 * 60 * 1000
        ),
      });

      await Session.create(newSession);
      await OTP.deleteOne({ _id: userOTP["_id"] });

      return res.status(201).send({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        message: "Login successful",
        token: token,
      });
    }

    return res.status(401).send({ error: "Invalid One Time Password" });
  } catch (error) {
    res.status(500).send({ error: error.message });
    throw error;
  }
};

const handleSessionCompletion = async (req, res) => {
  if (!req) {
    return res.status(500).send({ error: "Internal server error" });
  }
  if (!req.user || !req.user.token) {
    return res.status(401).send({ error: "Unauthorized action" });
  }
  const user = req.user;
  const { token } = user;
  try {
    const session = await Session.findOne({ token });

    if (!session) {
      throw new Error("Invalid session token");
    }

    session.revoked = true;
    session.expirationTime = new Date();
    await session.save();

    return res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    res.status(400).send({ error: error.message });
    throw error;
  }
};

module.exports = {
  handleUserRegisteration,
  hanldeSessionCreation,
  handleSessionCompletion,
};
