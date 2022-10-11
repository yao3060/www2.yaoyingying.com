import { NextApiResponse, NextApiRequest } from "next";
import useWoocommerce from "hooks/useWoocommerce";

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
    total: 0,
    pages: 1,
  };

  const { perPage } = req?.query ?? {};

  try {
    const response = await woo.api.get("products", {
      per_page: perPage || 50,
    });

    responseData.success = true;
    responseData.message = "get products successfully.";
    responseData.data = response.data;
    responseData.pages = Number(response.headers["x-wp-totalpages"]);
    responseData.total = Number(response.headers["x-wp-total"]);

    res.status(200).json(responseData);
  } catch (error) {
    responseData.message = (error as Error).message;
    res.status(500).json(responseData);
  }
}
