import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "layouts/one-column-layout";
import { withSessionSsr } from "utils/withSession";
import { User } from "hooks/useUser";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, res, locale }) {
    const { user } = req.session;

    console.log("Profile SSR Props:", user);

    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return {
        props: {
          user: { token: "", displayName: "", email: "", nicename: "" } as User,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale!, ["common"])),
        user,
      },
    };
  }
);

interface Props {
  user: User;
}

export default function ProfilePage({ user }: Props) {
  user.token = "SE.CR.ET";
  return (
    <Layout title={user.displayName ?? "displayName"}>
      <div>
        <pre>{JSON.stringify(user)}</pre>
      </div>
    </Layout>
  );
}
