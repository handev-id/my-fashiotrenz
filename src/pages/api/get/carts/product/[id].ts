import { productByIdCart } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cart = await productByIdCart(req.query.id as string);
  res.status(200).json({ status: true, statusCode: 200, cart });
}
