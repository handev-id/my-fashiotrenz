import { Register } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await Register(
      req.body,
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
