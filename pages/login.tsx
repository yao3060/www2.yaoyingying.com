import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Layout from "layouts/one-column-layout";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session, router]);

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
