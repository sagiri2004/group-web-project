require("dotenv").config();
const db = require("~/models");
const jwt = require("jsonwebtoken");
const { comparePasswords } = require("~/utils/passwordUtils");

async function loginUser(rawUserData) {
    const { username, password } = rawUserData;
    
    // Kiểm tra nếu username hoặc password bị thiếu
    if (!username || !password) {
      return {
        EM: "Username or password missing",
        EC: 1,
      };
    }
  
    const user = await db.User.findOne({
      where: { username: username },
    });
  
    if (!user) {
      return {
        EM: "Username does not exist",
        EC: 1,
      };
    }
  
    const match = await comparePasswords(password, user.password);
    if (!match) {
      return {
        EM: "Password is incorrect",
        EC: 1,
      };
    }
  
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  
    return {
      EM: "Login successfully",
      EC: 0,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          roleId: user.roleId,
        },
      },
    };
  }
  

async function logoutUser() {
  return {
    EM: "Logout successfully",
    EC: 0,
  };
}

module.exports = {
  loginUser,
  logoutUser,
};
