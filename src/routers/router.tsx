import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import {
  defaultRoute,
  errorRoute,
  newPostRoute,
  postRoute,
  postsRoute,
  todosRoute,
  userRoute,
  usersRoute,
} from "./routerObjects";

const routes = [
  defaultRoute,
  usersRoute,
  userRoute,
  postRoute,
  todosRoute,
  postsRoute,
  newPostRoute,
  errorRoute,
];
export const router = createBrowserRouter([
  {
    element: <App />,
    children: routes,
  },
]);
