require("dotenv").config();
const db = require("~/models");

async function search(query) {
  // se search theo name cua user, name cua classroom, title cua flashcardSet
  const users = await db.User.findAll({
    where: {
      name: {
        [db.Sequelize.Op.like]: `%${query}%`,
      },
    },
  });

  const classrooms = await db.Classroom.findAll({
    where: {
      name: {
        [db.Sequelize.Op.like]: `%${query}%`,
      },
    },
  });

  const flashcardSets = await db.FlashcardSet.findAll({
    where: {
      title: {
        [db.Sequelize.Op.like]: `%${query}%`,
      },
    },
  });

  return {
    users,
    classrooms,
    flashcardSets,
  };
}

module.exports = {
  search,
};
