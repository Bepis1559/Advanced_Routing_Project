export async function fetchUsers() {
  const { VITE_usersURL } = import.meta.env;
  try {
    const res = await fetch(VITE_usersURL);
    return await res.json();
  } catch (error) {
    throw new Error("An error occurred while fetching users");
  }
}
