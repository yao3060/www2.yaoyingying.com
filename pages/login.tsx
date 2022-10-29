import React, { useEffect, useRef, FormEvent, useState } from "react";
import Layout from "layouts/one-column-layout";
import { useRouter } from "next/router";
import useAuthStore from "stores/auth";
import { Login } from "apis/user";

const LoginPage = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [processing, setProcessing] = useState(false);

  const token = useAuthStore((state) => state.token);
  const setLoginData = useAuthStore((state) => state.setLoginData);

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    try {
      const res = await Login({
        username: usernameRef.current?.value as string,
        password: passwordRef.current?.value as string,
      });
      console.log(res);
      setLoginData(res.data);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }

    setProcessing(false);
  };

  useEffect(() => {
    if (token) {
      router.push("/profile");
    }
  }, []);

  return (
    <Layout title="Login">
      <div className="flex items-center w-full">
        <div className="w-1/2">
          <span>AD Image</span>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="w-1/2 loginForm mb-10">
          <form ref={formRef} onSubmit={(e) => signIn(e)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                ref={usernameRef}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs mt-5">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs mt-5">
              <button className="btn btn-block">
                {processing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
