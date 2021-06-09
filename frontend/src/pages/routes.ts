import { RouteConfig } from "react-router-config";

import { paths } from "./paths";

import { HomePage } from "./home/page";
import { Error404Page } from "./error404/page";

export const ROUTES: RouteConfig[] = [
  {
    path: paths.home(),
    exact: true,
    component: HomePage,
  },
  {
    path: "*",
    component: Error404Page,
  },
];
