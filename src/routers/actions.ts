import axios from "axios";
import { redirect } from "react-router-dom";
import { getAll } from "../services/read";

export async function newPostAction(postsUrl: string, request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const title = formData.get("title");
  const body = formData.get("body");
  if (title == "") return "Title is required";
  if (body == "") return "body is required";

  await axios
    .post(postsUrl, { userId, title, body }, { signal: request.signal })
    .then((res) => res)
    .catch((error) => console.log(error));

  const posts: post[] = await getAll(postsUrl);

  return redirect(`/posts/${posts.length}/comments`);
}
export async function editPostAction(postsUrl: string, request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const title = formData.get("title");
  const body = formData.get("body");
  if (title == "") return "Title is required";
  if (body == "") return "body is required";

  await axios
    .post(postsUrl, { userId, title, body }, { signal: request.signal })
    .then((res) => res)
    .catch((error) => console.log(error));

  const posts: post[] = await getAll(postsUrl);

  return redirect(`/posts/${posts.length}/comments`);
}
