require("dotenv").config();
const db = require("~/models");

async function getMe(userId) {
  try {
    const user = await db.User.findByPk(userId, {
      attributes: ["id", "username", "name", "avatar"],
    });

    return {
      message: "User found",
      data: user,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getMe,
};
