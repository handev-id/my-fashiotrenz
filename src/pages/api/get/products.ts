// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { productsData } from "@/utils/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit } = req.query;
  const products = await productsData("products");

  const parsedLimit = parseInt(limit as string, products.length);
  const validLimit = !isNaN(parsedLimit) ? parsedLimit : products.length;
  const limitedProducts = products.slice(0, validLimit);
  res.status(200).json({
    status: true,
    statusCode: 200,
    productsAMount: limitedProducts.length,
    products: limitedProducts,
  });
}
