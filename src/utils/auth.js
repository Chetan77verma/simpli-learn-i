const { db } = require("../config/db");
const { compareHash, generateJWTToken, verifyJWTToken } = require("./utils");
const authSchema = require("./validation");
const { hashText } = require("../utils/utils");
const login = async (req, res) => {
  try {
    // await authSchema.validateAsync(req.body);

    let { email, password } = req.body;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.error("No user found");
    }
    // TODO: if no user found send error
    const validatePassword = await compareHash(password, user.password);
    if (!validatePassword) {
      return res.unauthorized("Either email or password is invalid");
    }
    const token = await generateJWTToken({ id: user.id });

    res.ok({ message: "Login Success", token });
  } catch (error) {
    console.log("Error", error);
    if (error.isJoi === true) res.error(error);
  }
};
const signup = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log("body", req.body);
    // check if email address is alreay registered
    const emailExits = await db.user.findUnique({ where: { email } });
    if (emailExits) {
      return res.error("User Already registered");
    }
    const hashPassword = await hashText(password);

    await db.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    res.ok("User Registered");
  } catch (error) {
    console.log("Error", error);
    res.error(error);
  }
};
const protect = async (req, res, next) => {
  console.log("req", req.url);
  const requestUrl = req.url;
  if (
    requestUrl !== "/api/signup" &&
    requestUrl !== "/api/login" &&
    requestUrl !== "/ping?dump=true" &&
    requestUrl !== "/ping"
  ) {
    const bearer = req.headers.authorization || req.headers.Authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.unauthorized();
    }
    const token = bearer.split("Bearer ")[1].trim();

    const payload = verifyJWTToken(token);
    if (!payload) {
      return res.unauthorized();
    }
    const user = await db.user.findUnique({
      where: { id: payload.id },
      select: {
        email: true,
        id: true,
      },
    });

    req.user = user;
  }
  next();
};
module.exports.protect = protect;
module.exports.signup = signup;
module.exports.login = login;
