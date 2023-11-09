import { productsData } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const carts = await productsData("carts");
  res.status(200).json({ status: true, statusCode: 200, carts });
}
