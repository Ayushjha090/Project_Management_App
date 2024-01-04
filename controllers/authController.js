const User = require("../models/User");

const handleUserRegisteration = (req, res) => {
  console.log("request payload", req.body);

  return res.status(200).send({ message: "User Registeration" });
};

module.exports = {
  handleUserRegisteration,
};
