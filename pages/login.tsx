import React, { useEffect } from "react";
import Layout from "layouts/one-column-layout";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();

  const signIn = () => {
    //
  };

  useEffect(() => {
    if (false) {
      router.push("/profile");
    }
  }, []);

  return (
    <Layout title="Login">
      <div className="loginForm">
        <button className="btn" onClick={() => signIn()}>
          Google SignIn
        </button>
      </div>
    </Layout>
  );
};

export default LoginPage;
