import { productsData } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = (await productsData("products")).length;
  const users = (await productsData("users")).length;
  const orders = (await productsData("orders")).length;
  const traffic = {
    today: users + products + orders,
    thisWeek: (users * products) / users,
    thisMonth: users * products * orders,
  };

  res.status(200).json({
    status: true,
    statusCode: 200,
    products,
    users,
    orders,
    traffic,
  });
}
