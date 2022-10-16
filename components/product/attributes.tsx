import classNames from "classnames";
import { Product, Variation } from "interfaces";
import { capitalize, isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  product: Product;
};

export default function ProductAttributes({ product }: Props) {
  const [parent] = useAutoAnimate();
  const _visibles = product.attributes.map((attr) => attr.visible);
  const _variations = product.attributes.map((attr) => attr.variation);

  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock_status);
  const [variations, setVariations] = useState<Variation[] | undefined>(
    undefined
  );
  const [selected, setSelected] = useState(product.default_attributes);

  const isSelected = (
    attribute: Props["product"]["attributes"][0],
    option: string
  ): boolean => {
    const item = selected.find((item) => item.name === attribute.name);

    if (item && capitalize(option) === capitalize(item.option)) {
      return true;
    }

    return false;
  };

  const getVariations = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/wc/v3/products/${id}/variations`
    );
    const items = await res.json();
    setVariations(items.data);
  };

  const handleSelect = (
    attribute: Props["product"]["attributes"][0],
    option: string
  ) => {
    const newSelected = { id: attribute.id, name: attribute.name, option };

    let finded = false;
    const items = selected.map((item) => {
      if (item.name === attribute.name) {
        item.option = option;
        finded = true;
      }
      return item;
    });
    if (!finded) {
      items.push(newSelected);
    }
    setSelected(items);

    const variation = variations?.find((item) =>
      isEqual(item.attributes, selected)
    );
    console.log("intersectionWith", variation);
    if (variation) {
      setPrice(`${variation?.price}`);
      setStock(variation.stock_status);
    } else {
      setPrice("");
      setStock("");
    }
  };

  useEffect(() => {
    getVariations(product.id);
  }, [product.id]);

  useEffect(() => {
    console.log("selected", selected);
  }, [selected]);

  if (!product.attributes.length || !_visibles.length || !_variations.length) {
    return null;
  }

  return (
    <div ref={parent}>
      <div className="attributes">
        {product.attributes.map(
          (attribute) =>
            attribute.variation && (
              <div key={attribute.name} className="pb-5">
                <span className="block text-lg pb-2.5">{attribute.name}</span>
                <div className="options">
                  {attribute.options.map((option) => (
                    <span
                      onClick={() => handleSelect(attribute, option)}
                      className={classNames("btn mr-2.5", {
                        "btn-circle": attribute.name === "颜色",
                        "default-value btn-outline": !isSelected(
                          attribute,
                          option
                        ),
                      })}
                      key={option}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
      {price && (
        <div className="single_variation_wrap py-5">
          <div className="woocommerce-variation-price text-lg  text-success">
            <span className="woocommerce-Price-currencySymbol pr-1 ">
              &#36;
            </span>
            {price} {stock}
          </div>
        </div>
      )}
    </div>
  );
}
