import type { NextApiRequest, NextApiResponse } from "next";
import useWoocommerce from "hooks/useWoocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const woo = useWoocommerce();

  const responseData = {
    success: false,
    message: "",
    data: {},
  };

  try {
    const response = await woo.api.get(`products/${id}`);

    responseData.success = true;
    responseData.message = "get products successfully.";
    responseData.data = response.data;

    res.status(200).json(responseData);
  } catch (error) {
    responseData.message = (error as Error).message;
    res.status(500).json(responseData);
  }
}
