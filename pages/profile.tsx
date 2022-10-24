import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "layouts/one-column-layout";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <Layout title="Profile">
      <div>
        <h1>profile</h1>
        <button className="btn" onClick={() => signOut()}>
          signOut
        </button>
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </Layout>
  );
}
