import type { NextApiRequest, NextApiResponse } from "next";
import useWoocommerce from "hooks/useWoocommerce";

/**
 * @example http://localhost:3000/api/wc/v3/products/reviews?product=302
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const woo = useWoocommerce();

  const responseData = {
    success: false,
    message: "",
    data: [],
  };

  console.log("req.query:", req.query);

  try {
    const response = await woo.api.get(`products/reviews`, req.query);

    responseData.success = true;
    responseData.message = "get product reviews successfully.";
    responseData.data = response.data;

    res.status(200).json(responseData);
  } catch (error) {
    responseData.message = (error as Error).message;
    res.status(500).json(responseData);
  }
}
