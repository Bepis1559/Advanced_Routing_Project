import { ReactElement } from "react";
import urlEndPoints from "../json/urlEndPoints.json";
import { Posts } from "../pages/Posts";
import { Error } from "../pages/Error";
import { Todos } from "../pages/Todos";
import { Post } from "../pages/Post";
import {
  TodosLoader,
  editPostLoader,
  postLoader,
  postsLoader,
  userLoader,
  usersLoader,
} from "./loaders";
import { User } from "../pages/User";
import {
  ActionFunction,
  LoaderFunction,
  Navigate,
  RouteObject,
} from "react-router-dom";
import { Users } from "../pages/Users";
import { EditPost } from "../pages/EditPost";
import { editPostAction, createNewPostAction } from "./actions";
import { NewPost } from "../pages/NewPost";
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
  async ({ request }) => usersLoader(usersURL, request.signal as RequestInit),
  <Error />,
);
export const editPostRoute = createRouterObject(
  `${postsEndPoint}/:id/edit`,
  <EditPost />,
  async ({ request, params }) =>
    editPostLoader(
      postsUrl,
      usersURL,
      params as unknown as post,
      request.signal as RequestInit,
    ),
  <Error />,
  async ({ request }) => editPostAction(postsUrl, request as Request),
);
export const newPostRoute = createRouterObject(
  `${postsEndPoint}/new`,
  <NewPost />,
  undefined,
  <Error />,
  async ({ request }) => createNewPostAction(postsUrl, request as Request),
);

export const postsRoute = createRouterObject(
  postsEndPoint,
  <Posts />,
  async ({ request: { signal, url } }) =>
    postsLoader(postsUrl, signal as RequestInit, url),
  <Error />,
);

export const todosRoute = createRouterObject(
  todosEndPoint,
  <Todos />,
  async ({ request: { signal } }) =>
    TodosLoader(todosUrl, signal as RequestInit),
  <Error />,
);
export const errorRoute = createRouterObject(
  "/error",
  <Error />,
  undefined,
  <Error />,
);

export const postRoute = createRouterObject(
  `${postsEndPoint}/:id`,
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

function createRouterObject(
  path: string,
  element: ReactElement,
  loader?: LoaderFunction,
  errorElement?: ReactElement,
  action?: ActionFunction,
  children?: RouteObject[],
): RouteObject {
  return {
    path,
    loader,
    element,
    errorElement,
    action,
    children,
  };
}
