// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { productsData } from "@/utils/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await productsData("products");
  res.status(200).json({
    status: true,
    statusCode: 200,
    products,
  });
}
