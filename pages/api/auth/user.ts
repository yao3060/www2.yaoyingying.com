import { NextApiResponse, NextApiRequest } from "next";
import { withSessionRoute } from "utils/withSession";
import { User } from "hooks/useUser";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  console.log("req.session.user:", req.session?.user);
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({
      token: "",
      displayName: "",
      email: "",
      nicename: "",
    });
  }
}

export default withSessionRoute(userRoute);
