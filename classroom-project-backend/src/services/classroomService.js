require("dotenv").config();
const db = require("~/models");

async function getAll(userId) {
  const classrooms = await db.Classroom.findAll({
    where: { userId },
  });

  return {
    data: classrooms,
  };
}

async function create(name, description, imageUrl) {
  const classroom = await db.Classroom.create({
    name,
    description,
    imageUrl,
  });

  return {
    data: classroom,
  };
}

async function getAllClassrooms() {
  const classrooms = await db.Classroom.findAll();

  return {
    data: classrooms,
  };
}

module.exports = {
  getAll,
  create,
  getAllClassrooms,
};