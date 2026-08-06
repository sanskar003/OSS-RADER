import { cookies } from "next/headers"

//FETCH USER
export const fetchCurrentUser = async ()=> {
  const cookieStore = await cookies();
  
  const res = await fetch(
    "https://bookish-train-v6rq5gpj7xr93x7g6-5000.app.github.dev/api/auth/me",
  {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store"
  })

  
  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));

  const body = await res.text();
  console.log(body);

  return null;
}