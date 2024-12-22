require("dotenv").config();
const db = require("~/models");
const jwt = require("jsonwebtoken");
const { comparePasswords, hashPassword } = require("~/utils/passwordUtils");

async function loginUser(rawUserData) {
  const { username, password } = rawUserData;
  if (!username || !password) {
    return {
      message: "Username or password missing",
      success: false,
    };
  }

  const user = await db.User.findOne({
    where: { username: username },
  });

  if (!user) {
    return {
      message: "Username does not exist",
      success: false,
    };
  }

  const match = await comparePasswords(password, user.password);
  if (!match) {
    return {
      message: "Password is incorrect",
      success: false,
    };
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "100h" }
  );

  return {
    message: "Login successfully",
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        roleId: user.roleId,
      },
    },
  };
}

async function logoutUser() {
  return {
    message: "Logout successfully",
    success: true,
  };
}

async function registerUser(rawUserData) {
  const { username, password } = rawUserData;
  if (!username || !password) {
    return {
      message: "Username or password missing",
      success: false,
    };
  }

  const user = await db.User.findOne({
    where: { username: username },
  });

  if (user) {
    return {
      message: "Username already exists",
      success: false,
    };
  }

  const defaultAvatar =
    "https://assets.quizlet.com/static/i/animals/126.70ed6cbb19b8447.jpg";
  const defaultName = username;
  const hashedPassword = await hashPassword(password);

  await db.User.create({
    username,
    password: hashedPassword,
    avatar: defaultAvatar,
    name: defaultName,
  });

  return {
    message: "Register successfully",
    success: true,
  };
}

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
};
