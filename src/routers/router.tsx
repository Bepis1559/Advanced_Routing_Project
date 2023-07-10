import { Navigate, createBrowserRouter } from "react-router-dom";
import { Users } from "../pages/Users";
import { Error } from "../pages/Error";
import { User } from "../pages/User";
import { postLoader, userLoader } from "./loaders";
import { Post } from "../pages/Post";
import { getAll } from "../services/read";
import { Todos } from "../pages/Todos";
import { App } from "../App";
import urlEndPoints from "../json/urlEndPoints.json";
import { Posts } from "../pages/Posts";
import { createRouterObject } from "./routerObjects";
const localServerUrl = "http://127.0.0.1:3000";
const { usersEndPoint, postsEndPoint, commentsEndPoint, todosEndPoint } =
  urlEndPoints;
const usersURL = `${localServerUrl}${usersEndPoint}`;
const postsUrl = `${localServerUrl}${postsEndPoint}`;
const commentsUrl = `${localServerUrl}${commentsEndPoint}`;
const todosUrl = `${localServerUrl}${todosEndPoint}`;

const defaultRoute = createRouterObject(
  "*",
  <Navigate to={usersEndPoint} />,
  undefined,
  <Error />,
);
const usersRoute = createRouterObject(
  usersEndPoint,
  <Users />,
  async ({ request }) => getAll(usersURL, request.signal as RequestInit),
  <Error />,
);
const userRoute = createRouterObject(
  `${usersEndPoint}/:id`,
  <User />,
  async ({ request, params }) =>
    userLoader(
      postsUrl,
      usersURL,
      todosUrl,
      request.signal as RequestInit,
      params as unknown as user,
    ),
  <Error />,
);
const postRoute = createRouterObject(
  `${postsEndPoint}/:id/comments`,
  <Post />,
  async ({ request, params }) =>
    postLoader(
      postsUrl,
      usersURL,
      commentsUrl,
      params as unknown as post,
      request.signal as RequestInit,
    ),
  <Error />,
);
const todosRoute = createRouterObject(
  todosEndPoint,
  <Todos />,
  async ({ request }) => getAll(todosUrl, request.signal as RequestInit),
  <Error />,
);
const postsRoute = createRouterObject(
  postsEndPoint,
  <Posts />,
  async ({ request }) => getAll(postsUrl, request.signal as RequestInit),
  <Error />,
);
const errorRoute = createRouterObject(
  "/error",
  <Error />,
  undefined,
  <Error />,
);
const routes = [
  defaultRoute,
  usersRoute,
  userRoute,
  postRoute,
  todosRoute,
  postsRoute,
  // singleUserPostsRoute,
  errorRoute,
];
export const router = createBrowserRouter([
  {
    element: <App />,
    children: routes,
  },
]);
