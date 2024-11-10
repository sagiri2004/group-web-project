import config from "~/config";

import {
  Authentication,
  HomePage,
  Settings,
  Classrooms,
  Classroom,
} from "~/pages";
import Default from "~/layouts/Default";

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
