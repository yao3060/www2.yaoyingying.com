import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { WP_ROOT_URL } from "utils/constants";

const useWoocommerce = () => {
  const api = new WooCommerceRestApi({
    url: WP_ROOT_URL,
    consumerKey: process.env.WOO_KEY,
    consumerSecret: process.env.WOO_SECRET,
    version: "wc/v3",
  });

  return {
    api,
  };
};

export default useWoocommerce;
