const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const privateKey = fs.readFileSync(
  path.join(__dirname, "..", "keys", "private.pem"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "..", "keys", "public.pem"),
  "utf8"
);

if (!privateKey) {
  throw new Error("Private Key is required for JWT token.");
}

if (!publicKey) {
  throw new Error("Public Key is required for JWT token.");
}

const signToken = (payload) => {
  try {
    const jwtToken = jwt.sign(payload, privateKey, {
      expiresIn: "2d",
      algorithm: "RS256",
    });
    if (jwtToken) {
      return jwtToken;
    } else {
      throw new Error("Error generating JWT token");
    }
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    const isTokenVerified = jwt.verify(token, publicKey, {
      algorithm: "RS256",
    });
    return isTokenVerified;
  } catch (error) {
    throw error;
  }
};

module.exports = { signToken, verifyToken };
