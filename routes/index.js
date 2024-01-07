const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "Hello from the project management backend API!" });
});

router.use("/users", require("./users/index"));

module.exports = router;
