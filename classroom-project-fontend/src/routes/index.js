import {
  Authentication,
  HomePage,
  Settings,
  Classrooms,
  Classroom,
  FlashCardPage,
  EditFlashcardPage,
  MessengerPage,
  MyFlashcardSetPage,
} from "~/pages";
import Default from "~/layouts/Default";
import config from "~/config";

const publicRoutes = [
  {
    path: config.routes.home,
    component: HomePage,
    layout: Default,
  },
  { path: config.routes.login, component: Authentication, layout: null },
  { path: config.routes.signup, component: Authentication, layout: null },
  { path: config.routes.settings, component: Settings, layout: Default },
  { path: config.routes.classrooms, component: Classrooms, layout: Default },
  { path: config.routes.classroom, component: Classroom, layout: Default },
  { path: config.routes.assignments, component: Classroom, layout: Default },
  {
    path: config.routes.assignmentDetail,
    component: Classroom,
    layout: Default,
  },
  {
    path: config.routes.classroomAdmin,
    component: Classroom,
    layout: Default,
  },
  { path: config.routes.flashCards, component: FlashCardPage, layout: Default },
  { path: config.routes.edit, component: EditFlashcardPage, layout: Default },
  {
    path: config.routes.myFlashcardSets,
    component: MyFlashcardSetPage,
    layout: Default,
  },
  {
    path: config.routes.messenger,
    component: MessengerPage,
    layout: Default,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
