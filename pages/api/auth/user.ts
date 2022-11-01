import { NextApiResponse, NextApiRequest } from "next";
import { withSessionRoute } from "utils/withSession";
import { User } from "hooks/useUser";

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({
      id: 0,
      token: "",
      displayName: "",
    });
  }
}

export default withSessionRoute(userRoute);
