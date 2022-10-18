import { NextApiResponse, NextApiRequest } from "next";
import useWoocommerce from "hooks/useWoocommerce";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  console.log("req.query:", req.query);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const woo = useWoocommerce();

  const responseData = {
    success: false,
    message: "",
    data: {},
  };

  try {
    const response = await woo.api.get(`products/${id}/variations`);

    responseData.success = true;
    responseData.message = "get product variations successfully.";
    responseData.data = response.data;

    res.status(200).json(responseData);
  } catch (error) {
    responseData.message = (error as Error).message;
    res.status(500).json(responseData);
  }
}
