import { productsData } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getContent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const content = await productsData("content");
  res.status(200).json({ status: true, statuCode: 200, content });
}
