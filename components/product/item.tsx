import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Product } from "interfaces";
import Link from "next/link";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Card>
      {product.images.length && (
        <div
          className="h-60 w-full bg-center bg-cover  bg-no-repeat"
          style={{ backgroundImage: `url(${product.images[0].src})` }}
        />
      )}

      <CardContent>
        <h5 className="pb-2.5">{product.name}</h5>
        <div dangerouslySetInnerHTML={{ __html: product.price_html }}></div>
      </CardContent>

      <CardActions className="justify-end">
        <Button size="small">
          <Link href={`/products/${product.id}`}>
            <a>Learn more</a>
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
