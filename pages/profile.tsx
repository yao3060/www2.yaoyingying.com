import React, { useEffect } from "react";
import Layout from "layouts/one-column-layout";
import useAuthStore from "stores/auth";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const displayName = useAuthStore((state) => state.displayName);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <Layout title={displayName}>
      <div>
        <h1 className="text-4xl mt-10">Comming soom</h1>
      </div>
    </Layout>
  );
}
