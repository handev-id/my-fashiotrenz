import { NextApiRequest, NextApiResponse } from "next";
import { addToCarts } from "@/utils/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await addToCarts(
      req.body as any,
      req.query.username as string,
      ({ status, message }: { status: boolean; message: string }) => {
        if (status) {
          res.status(200).json({ status: true, message: message });
        } else {
          res.status(400).json({ status: false, message: message });
        }
      }
    );
    return new Promise((resolve) => {
      res.status(200).json({ status: true, message: "succsess" });
    });
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
