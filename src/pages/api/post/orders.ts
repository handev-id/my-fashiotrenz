import { createData } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await createData(
      "orders",
      req.body as object,
      ({ status, message }: { status: boolean; message: string }) => {
        if (status) {
          res
            .status(200)
            .json({ status: true, message: "Pesan Berhasil Terkirim" });
        } else {
          res.status(400).json({ status: false, message: message });
        }
      }
    );
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
