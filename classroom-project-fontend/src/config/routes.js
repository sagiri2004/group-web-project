const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  settings: "/settings",
  classrooms: "/classrooms",
  classroom: "/classroom/:classroomId",
  assignments: "/classroom/:classroomId/assignments",
  classroomAdmin: "/classroom/:classroomId/admin",
  assignmentDetail: "/classroom/:classroomId/assignment/:assignmentId",
  flashCards: "/flashcards/:id",
  edit: "/flashcards/:id/edit",
  messenger: "/messenger/:receiverId",
};

export default routes;
