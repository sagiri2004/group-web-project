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

async function findUserByName(name) {
  try {
    const users = await db.User.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${name}%`,
        },
      },
      attributes: ["id", "username", "name", "avatar"],
    });

    return {
      message: "Users found",
      data: users,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateUser(userId, user) {
  try {
    await db.User.update(user, {
      where: {
        id: userId,
      },
    });

    const newUser = await db.User.findByPk(userId, {
      attributes: ["id", "username", "name", "avatar"],
    });

    return {
      message: "User updated successfully",
      user: newUser,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getMe,
  findUserByName,
  updateUser,
};
