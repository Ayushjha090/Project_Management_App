const express = require("express");
const router = express.Router();

const {
  handleUserRegisteration,
  hanldeSessionCreation,
} = require("../../controllers/authController");

const resourceValidationMiddleware = require("../../middleware/resourceValidationMiddleware");
const credentialValidationMiddleware = require("../../middleware/credentialValidationMiddleware");
const auth = require("../../middleware/auth");

const {
  registerUserSchema,
  generateOtpSchema,
  loginSchema,
} = require("../../validator/authValidator");
const { sendOtp } = require("../../controllers/otpController");
const { getUserById } = require("../../controllers/userController");

router.post(
  "/",
  resourceValidationMiddleware(registerUserSchema),
  async (req, res) => await handleUserRegisteration(req, "user", res)
);

router.post(
  "/admin",
  resourceValidationMiddleware(registerUserSchema),
  async (req, res) => await handleUserRegisteration(req, "admin", res)
);

router.post(
  "/otp",
  resourceValidationMiddleware(generateOtpSchema),
  credentialValidationMiddleware,
  sendOtp
);

router.post(
  "/login",
  resourceValidationMiddleware(loginSchema),
  credentialValidationMiddleware,
  hanldeSessionCreation
);

router.get("/:id", auth, getUserById);

module.exports = router;
