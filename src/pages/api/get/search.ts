import { productsData } from "@/utils/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await productsData("products");
  const productsFiltered = products.filter((product: any) => {
    return (
      product.title.toLowerCase().includes(req.query.q as string) ||
      product.category.toLowerCase().includes(req.query.q as string)
    );
  });
  if (productsFiltered.length > 0) {
    res
      .status(200)
      .json({ status: true, statuCode: 200, products: productsFiltered });
  } else {
    res.status(404).json({
      status: false,
      statuCode: 404,
      message: "Produk Tidak Ditemukan",
    });
  }
}
