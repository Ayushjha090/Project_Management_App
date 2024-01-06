const express = require("express");
const router = express.Router();

const { handleUserRegisteration } = require("../controllers/authController");
const resourceValidationMiddleware = require("../middleware/resourceValidationMiddleware");
const { registerUserSchema } = require("../validator/authValidator");

router.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "Hello from the project management backend API!" });
});

router.post(
  "/register",
  resourceValidationMiddleware(registerUserSchema),
  handleUserRegisteration
);

module.exports = router;
