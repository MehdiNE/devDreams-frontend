import { cookies } from "next/headers";

export default async function checkAuthStatus(): Promise<{
  isAuthenticated: boolean;
}> {
  const response = await fetch("http://localhost:3000/api/auth/status", {
    headers: { Cookie: cookies().toString() },
  }).then((res) => res.json());

  return response.isAuthenticated;
}
