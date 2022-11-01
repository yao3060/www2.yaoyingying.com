import { NextApiResponse, NextApiRequest } from "next";
import { withSessionRoute } from "utils/withSession";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  // get user from database then:
  const user = {
    id: 230,
    displayName: "YYY",
    token: "a.b.c",
    email: "yao3060@gmail.com",
    nicename: "YAO",
  };
  req.session.user = user;
  await req.session.save();
  res.send(user);
}

export default withSessionRoute(loginRoute);
