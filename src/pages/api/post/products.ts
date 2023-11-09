import { NextApiRequest, NextApiResponse } from "next";
import { createProduct } from "@/utils/service";
import { ProductType } from "@/types/types";

export default async function postProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await createProduct(
      req.body as ProductType,
      ({ status, message }: { status: boolean; message: string }) => {
        if (status) {
          res.status(200).json({ status: true, message: message });
        } else {
          res.status(400).json({ status: false, message: message });
        }
      }
    );
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
