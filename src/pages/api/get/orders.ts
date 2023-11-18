import { productsData } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const orders = await productsData("orders");
  res.status(200).json({ status: true, code: 200, orders });
}
