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
const { usersEndPoint, postsEndPoint, todosEndPoint } = urlEndPoints;
const { VITE_usersURL, VITE_postsUrl, VITE_commentsUrl, VITE_todosUrl } =
  import.meta.env;

export const defaultRoute = createRouterObject(
  "*",
  <Navigate to={usersEndPoint} />,
  undefined,
  <Error />,
);
export const usersRoute = createRouterObject(
  usersEndPoint,
  <Users />,
  async ({ request }) =>
    usersLoader(VITE_usersURL, request.signal as RequestInit),
  <Error />,
);
export const editPostRoute = createRouterObject(
  `${postsEndPoint}/:id/edit`,
  <EditPost />,
  async ({ request, params }) =>
    editPostLoader(
      VITE_postsUrl,
      VITE_usersURL,
      params as unknown as post,
      request.signal as RequestInit,
    ),
  <Error />,
  async ({ request }) => editPostAction(VITE_postsUrl, request as Request),
);
export const newPostRoute = createRouterObject(
  `${postsEndPoint}/new`,
  <NewPost />,
  undefined,
  <Error />,
  async ({ request }) => createNewPostAction(VITE_postsUrl, request as Request),
);

export const postsRoute = createRouterObject(
  postsEndPoint,
  <Posts />,
  async ({ request: { signal, url } }) =>
    postsLoader(VITE_postsUrl, signal as RequestInit, url),
  <Error />,
);

export const todosRoute = createRouterObject(
  todosEndPoint,
  <Todos />,
  async ({ request: { signal } }) =>
    TodosLoader(VITE_todosUrl, signal as RequestInit),
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
      VITE_postsUrl,
      VITE_usersURL,
      VITE_commentsUrl,
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
      VITE_postsUrl,
      VITE_usersURL,
      VITE_todosUrl,
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
