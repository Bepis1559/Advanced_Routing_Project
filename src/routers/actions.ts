import axios from "axios";
import { redirect } from "react-router-dom";

export async function newPostAction(postsUrl: string, request: Request) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  if (title == "") return "Title is required";
  if (body == "") return "body is required";
  await axios
    .post(postsUrl, { title, body }, { signal: request.signal })
    .then((res) => res)
    .catch((error) => console.log(error));
  return redirect(`/${postsUrl}`);
}
