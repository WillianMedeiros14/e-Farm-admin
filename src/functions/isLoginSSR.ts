import { cookies } from "next/headers";

export function isLoginSSR() {
  const cookieStore = cookies();
  const isUserId = cookieStore.get("user")?.value;

  if (isUserId) {
    return true;
  } else {
    return false;
  }
}
