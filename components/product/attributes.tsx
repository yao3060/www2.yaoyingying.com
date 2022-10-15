import classNames from "classnames";
import { Product } from "interfaces";
import { capitalize } from "lodash";
import React, { useState } from "react";

type Props = {
  product: Product;
};

export default function ProductAttributes({ product }: Props) {
  const visibles = product.attributes.map((attr) => attr.visible);
  const variations = product.attributes.map((attr) => attr.variation);

  const isSelected = (
    attribute: Props["product"]["attributes"][0],
    option: string
  ): boolean => {
    const item = product.default_attributes.find(
      (item) => item.name === attribute.name
    );
    console.log("item", item, option);

    if (item && capitalize(option) === capitalize(item.option)) {
      return true;
    }

    return false;
  };

  if (!product.attributes.length || !visibles.length || !variations.length) {
    return null;
  }

  return (
    <>
      <div className="attributes">
        {product.attributes.map(
          (attribute) =>
            attribute.variation && (
              <div key={attribute.name} className="pb-5">
                <span className="block text-lg pb-2.5">{attribute.name}</span>
                <div className="options">
                  {attribute.options.map((option) => (
                    <span
                      className={classNames("btn mr-2.5", {
                        "btn-square": attribute.name === "颜色",
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
      <div className="single_variation_wrap py-5">
        <div className="woocommerce-variation-price text-lg  text-success">
          <span className="woocommerce-Price-currencySymbol pr-1 ">&#36;</span>
          {product.price} {product.stock_status}
        </div>
      </div>
    </>
  );
}
