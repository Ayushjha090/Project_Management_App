const express = require("express");
const { verifyToken } = require("../config/jwt");

const User = require("../models/User");
const Session = require("../models/Session");

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      throw new Error("Authorization header missing");
    }

    const token = header.split(" ")[1];

    const decodedToken = verifyToken(token);
    const sessionDetails = await Session.findOne({ token });

    if (!decodedToken || !sessionDetails || sessionDetails.revoked) {
      throw new Error("Unauthorized Action");
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = { user: user, role: decodedToken.role, token: token };

    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
    throw error;
  }
};

module.exports = authenticate;
