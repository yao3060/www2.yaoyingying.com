import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { WP_ROOT_URL } from "utils/constants";

const useWoocommerce = () => {
  const api = new WooCommerceRestApi({
    url: WP_ROOT_URL,
    consumerKey: process.env.WOO_KEY as string,
    consumerSecret: process.env.WOO_SECRET as string,
    version: "wc/v3",
  });

  return {
    api,
  };
};

export default useWoocommerce;
