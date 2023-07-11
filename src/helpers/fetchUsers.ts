const localServerUrl = "http://127.0.0.1:3000";
import { usersEndPoint } from "../json/urlEndPoints.json";
export async function fetchUsers() {
  try {
    const res = await fetch(`${localServerUrl}${usersEndPoint}`);
    return await res.json();
  } catch (error) {
    throw new Error("An error occurred while fetching users");
  }
}
