import config from "~/config";

import { Authentication, HomePage } from "~/pages";
import Default from "~/layouts/Default";

const publicRoutes = [
  {
    path: config.routes.home,
    component: HomePage,
    layout: Default,
  },
  { path: config.routes.login, component: Authentication, layout: null },
  { path: config.routes.signup, component: Authentication, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
