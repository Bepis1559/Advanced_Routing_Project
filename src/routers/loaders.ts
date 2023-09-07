import { defer } from "react-router-dom";
import { getAll, getById } from "../services/read";

export async function userLoader(
  postsUrl: string,
  usersUrl: string,
  todosUrl: string,
  signal: RequestInit,
  params: user,
) {
  const currentUser: user = await getById(usersUrl, params?.id, signal);

  const posts: post[] = await getAll(postsUrl, signal);
  const currentUserPosts = posts.filter(
    (post) => post.userId === currentUser.id,
  );
  const todos: todo[] = await getAll(todosUrl, signal);
  const currentUserTodos = todos.filter(
    (todo) => todo.userId === currentUser.id,
  );

  const data = [currentUser, currentUserPosts, currentUserTodos];
  return data;
}

// should have : post title,post body,the userName , all related comments (by postId) with their email and body
export async function postLoader(
  postsUrl: string,
  usersUrl: string,
  commentsUrl: string,
  params: post,
  signal: RequestInit,
) {
  const currentPost: post = await getById(postsUrl, params?.id, signal);

  const deferredResult: postDeferredResult = {
    currentPostPromise: getById(postsUrl, params?.id, signal),
    currentUserPromise: getById(usersUrl, currentPost.userId, signal),
    allCommentsPromise: getAll(commentsUrl, signal),
  };

  return defer(deferredResult);
}

export function postsLoader(
  postsUrl: string,
  signal: RequestInit,
  url: string,
) {
  const initialPostsUrl = postsUrl;
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") ?? "";
  const userId = searchParams.get("userId");
  userId
    ? (postsUrl = `${postsUrl}?q=${query}&userId=${userId}`)
    : (postsUrl = `${postsUrl}?q=${query}`);

  if (userId == "0") {
    postsUrl = `${initialPostsUrl}?q=${query}`;
  }
  // const posts: post[] = await getAll(postsUrl, signal);
  // const result = { posts: posts };
  const deferredResult: postsDeferredResult = {
    postsPromise: getAll(postsUrl, signal),
  };
  return defer(deferredResult);
}

export function usersLoader(usersURL: string, signal: RequestInit) {
  const deferredResult: usersDeferredResult = {
    usersPromise: getAll(usersURL, signal),
  };
  return defer(deferredResult);
}

export function TodosLoader(todosUrl: string, signal: RequestInit) {
  const deferredResult: todosDeferredResult = {
    todosPromise: getAll(todosUrl, signal),
  };
  return defer(deferredResult);
}

export async function editPostLoader(
  postsUrl: string,
  usersUrl: string,
  params: post,
  signal: RequestInit,
) {
  const currentPost: post = await getById(postsUrl, params?.id, signal);

  const deferredResult: editPostDeferredResult = {
    currentPostPromise: getById(postsUrl, params?.id, signal),
    currentUserPromise: getById(usersUrl, currentPost.userId, signal),
  };
  return defer(deferredResult);
}
