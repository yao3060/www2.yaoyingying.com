import React from "react";
import Layout from "layouts/one-column-layout";

export default function ProfilePage() {
  const signOut = () => {
    //
  };

  return (
    <Layout title="Profile">
      <div>
        <h1>profile</h1>
        <button className="btn" onClick={() => signOut()}>
          signOut
        </button>
      </div>
    </Layout>
  );
}
