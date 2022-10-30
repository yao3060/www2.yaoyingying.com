import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  token: string;
  displayName: string;
  email: string;
  nicename: string;
  setDisplayName: (value: string) => void;
  setLoginData: (data: any) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        displayName: "",
        email: "",
        nicename: "",
        setDisplayName: (value: string) =>
          set((state) => ({ ...state, displayName: value }), false, {
            type: "auth/setDisplayName",
            value,
          }),
        setLoginData: (data: any) => {
          set(
            {
              token: data.token,
              displayName: data.user_display_name,
              email: data.user_email,
              nicename: data.user_nicename,
            },
            false,
            {
              type: "auth/login",
              data,
            }
          );
        },
      }),
      {
        name: "AuthStore",
      }
    )
  )
);

export default useAuthStore;
