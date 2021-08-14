const { config } = require("../config/index");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

// hash password
const hashText = async (text) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

// compare hash
const compareHash = async (text, hash) => {
  try {
    const match = await bcrypt.compare(text, hash);
    return match;
  } catch (error) {
    console.log(error);
  }
};

const generateJWTToken = async (obj) => {
  return (
    "Bearer " +
    jwt.sign(obj, config.SECRETS.JWT, {
      expiresIn: config.SECRETS.JWTEXP,
    })
  );
};

const verifyJWTToken = (token) => {
  try {
    return jwt.verify(token, config.SECRETS.JWT);
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.verifyJWTToken = verifyJWTToken;
module.exports.generateJWTToken = generateJWTToken;
module.exports.compareHash = compareHash;
module.exports.hashText = hashText;
