import { NextApiResponse, NextApiRequest } from "next";
import { withSessionRoute } from "utils/withSession";

export default withSessionRoute(function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  req.session.destroy();
  res.send({ ok: true });
});
