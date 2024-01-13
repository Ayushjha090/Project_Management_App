const express = require("express");

const User = require("../models/User");

const { checkObjectIdValid } = require("../utils/helper");

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!checkObjectIdValid(id)) {
      throw new Error("Invalid User ID provided");
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(200).send({ message: "User not found" });
    }

    const { password, __v, ...userDetails } = user.toObject();

    return res
      .status(200)
      .send({ user: userDetails, message: "User found successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
    throw error;
  }
};

module.exports = { getUserById };
