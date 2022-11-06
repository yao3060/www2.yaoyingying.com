import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export interface User {
  token: string;
  displayName: string;
  email: string;
  nicename: string;
}

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/auth/user");

  useEffect(() => {
    console.log("useUser:", user);

    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (user.token && redirectIfFound && redirectTo) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
