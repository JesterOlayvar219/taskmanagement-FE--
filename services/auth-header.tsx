export default function authHeader(): Record<string, string> {
  const user = localStorage.getItem("user");

  try {
    const parsedUser = user ? JSON.parse(user) : null;

    if (parsedUser && parsedUser.accessToken) {
      return { Authorization: `Bearer ${parsedUser.accessToken}` };
    }
  } catch (error) {
    console.error("Error parsing user data from localstorage:", error);
  }

  return {};
}
