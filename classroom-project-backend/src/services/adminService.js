const { User } = require("~/models");
const hashPassword = require("~/utils/passwordUtils").hashPassword;

const userService = {
  getAllUsers: async () => {
    return await User.findAll();
  },

  getUserById: async (id) => {
    return await User.findByPk(id);
  },

  createUser: async (userData) => {
    userData.password = await hashPassword(userData.password);
    return await User.create(userData);
  },

  updateUser: async (id, userData) => {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(userData);
    }
    return null;
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (user) {
      return await user.destroy();
    }
    return null;
  },

  updateUserStatus: async (id, status) => {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update({ status });
    }
    return null;
  },
};

module.exports = userService;
