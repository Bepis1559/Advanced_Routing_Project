import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import {
  defaultRoute,
  editPostRoute,
  errorRoute,
  newPostRoute,
  // newPostRoute,
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
  editPostRoute,
  errorRoute,
];
export const router = createBrowserRouter([
  {
    element: <App />,
    children: routes,
  },
]);
