import { redirect } from "react-router-dom";
import { CreateDelay } from "../helpers/CreateDelay";

export async function getAll(
  url: string,
  signal?: RequestInit,
  redirectPathIfResponseIsNotOk = "/error",
) {
  const res = await fetch(url, signal);
  CreateDelay(500);
  if (res.ok) return res.json();
  throw redirect(redirectPathIfResponseIsNotOk);
}
export async function getById(
  url: string,
  id: number,
  signal?: RequestInit,
  redirectPathIfResponseIsNotOk = "/error",
) {
  signal ? signal : new AbortController().signal;
  url = `${url}/${id}`;
  const res = await fetch(url, signal);
  if (res.ok) return res.json();
  throw redirect(redirectPathIfResponseIsNotOk);
}
