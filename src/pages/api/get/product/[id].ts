import { productById } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getProductById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const product = await productById(req.query.id as string);
  res.status(200).json({ status: true, statusCode: 200, product });
}
