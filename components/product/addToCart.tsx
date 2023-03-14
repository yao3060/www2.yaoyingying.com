import classNames from "classnames";
import { Product } from "interfaces";
import { useState } from "react";

type Props = {
  product: Product;
};

export default function AddToCart({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const addToCart = () => {
    console.log("add to cart", product);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mb-5">
      <button
        className={classNames("btn", { loading })}
        onClick={() => addToCart()}
      >
        Add to cart
      </button>
    </div>
  );
}
