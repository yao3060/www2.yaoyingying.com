import React from "react";
import Layout from "layouts/one-column-layout";
import { withSessionSsr } from "utils/withSession";
import { User } from "hooks/useUser";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res }) {
    const user = req.session.user;

    console.log("Profile SSR Props:", user);

    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return {
        props: {
          user: { id: 0, displayName: "", token: "" } as User,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  }
);

interface Props {
  user: User;
}

export default function ProfilePage({ user }: Props) {
  return (
    <Layout title={user.displayName}>
      <div>
        <pre>{JSON.stringify(user)}</pre>
      </div>
    </Layout>
  );
}
