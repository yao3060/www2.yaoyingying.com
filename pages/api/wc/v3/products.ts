import { NextApiResponse, NextApiRequest } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  return res.status(200).json([{ id: 1 }, { id: 2 }]);
}
