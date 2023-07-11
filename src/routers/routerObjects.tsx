import { ReactElement } from "react";
import { getAll } from "../services/read";
import urlEndPoints from "../json/urlEndPoints.json";
import { Posts } from "../pages/Posts";
import { Error } from "../pages/Error";
import { Todos } from "../pages/Todos";
import { Post } from "../pages/Post";
import { postLoader, postsLoader, userLoader } from "./loaders";
import { User } from "../pages/User";
import { ActionFunction, LoaderFunction, Navigate } from "react-router-dom";
import { Users } from "../pages/Users";
import { NewPost } from "../pages/NewPost";
import { newPostAction } from "./actions";
const { usersEndPoint, postsEndPoint, commentsEndPoint, todosEndPoint } =
  urlEndPoints;
const localServerUrl = "http://127.0.0.1:3000";
const usersURL = `${localServerUrl}${usersEndPoint}`;
const postsUrl = `${localServerUrl}${postsEndPoint}`;
const commentsUrl = `${localServerUrl}${commentsEndPoint}`;
const todosUrl = `${localServerUrl}${todosEndPoint}`;

export const defaultRoute = createRouterObject(
  "*",
  <Navigate to={usersEndPoint} />,
  undefined,
  <Error />,
);
export const usersRoute = createRouterObject(
  usersEndPoint,
  <Users />,
  async ({ request }) => getAll(usersURL, request.signal as RequestInit),
  <Error />,
);

export const postsRoute = createRouterObject(
  postsEndPoint,
  <Posts />,
  async ({ request: { signal, url } }) =>
    // postsLoader(postsUrl, usersURL, signal as RequestInit, url),
    postsLoader(postsUrl, signal as RequestInit, url),
  <Error />,
);

export const todosRoute = createRouterObject(
  todosEndPoint,
  <Todos />,
  async ({ request }) => getAll(todosUrl, request.signal as RequestInit),
  <Error />,
);
export const errorRoute = createRouterObject(
  "/error",
  <Error />,
  undefined,
  <Error />,
);
export const postRoute = createRouterObject(
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

export const userRoute = createRouterObject(
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

export const newPostRoute = createRouterObject(
  `${postsEndPoint}/new`,
  <NewPost />,
  undefined,
  <Error />,
  async ({ request }) => newPostAction(postsUrl, request as Request),
);

function createRouterObject(
  path: string,
  element: ReactElement,
  loader?: LoaderFunction,
  errorElement?: ReactElement,
  action?: ActionFunction,
) {
  return {
    path: path,
    loader: loader,
    element: element,
    errorElement: errorElement,
    action: action,
  };
}
