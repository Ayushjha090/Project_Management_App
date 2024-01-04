const express = require("express");
const router = express.Router();

const { handleUserRegisteration } = require("../controllers/authController");

router.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "Hello from the project management backend API!" });
});

router.post("/register", handleUserRegisteration);

module.exports = router;
