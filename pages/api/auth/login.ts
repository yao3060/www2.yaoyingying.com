import { Login } from "apis/user";
import { NextApiResponse, NextApiRequest } from "next";
import { withSessionRoute } from "utils/withSession";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    // get user from database then:
    const response = await Login(req.body);
    console.log("loginRoute:", response.data);
    const user = {
      displayName: response.data.user_display_name,
      token: response.data.token,
      email: response.data.user_email,
      nicename: response.data.user_nicename,
    };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error: any) {
    res.status(error.response.status).json(error.response.data);
  }
}

export default withSessionRoute(loginRoute);
