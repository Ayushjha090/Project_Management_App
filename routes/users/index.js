const express = require("express");
const router = express.Router();

const { handleUserRegisteration } = require("../../controllers/authController");
const resourceValidationMiddleware = require("../../middleware/resourceValidationMiddleware");
const {
  registerUserSchema,
  generateOtpSchema,
  loginSchema,
} = require("../../validator/authValidator");

router.post(
  "/",
  resourceValidationMiddleware(registerUserSchema),
  handleUserRegisteration
);

router.post(
  "/otp",
  resourceValidationMiddleware(generateOtpSchema),
  (req, res) => {
    console.log("body", req.body);
    return res.status(200).send({ message: "Generate OTP" });
  }
);

module.exports = router;
