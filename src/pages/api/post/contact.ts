import { NextApiRequest, NextApiResponse } from "next";
import { createData, productsData } from "@/utils/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await createData(
      "contacts",
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
  } else if (req.method === "GET") {
    const messages = await productsData("contacts");
    res.status(200).json({ status: true, message: "succsess", data: messages });
  }
}
