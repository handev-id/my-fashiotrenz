import { deleteProductInCarts } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    await deleteProductInCarts(
      req.query.id as string,
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
