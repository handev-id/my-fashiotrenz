import { NextApiRequest, NextApiResponse } from "next";
import { productsData } from "@/utils/service";

// pages/api/products.js
// export default async function handler(req, res) {
//   // Mendapatkan parameter halaman dari query string atau gunakan nilai default
//   const page = req.query.page || 1;

//   // Panggil API atau sumber data lainnya untuk mendapatkan produk
//   // Implementasikan logika pengambilan data sesuai dengan kebutuhan proyek Anda
//   // ...

//   // Simulasikan data produk
//   const itemsPerPage = 10;
//   const totalProducts = 50;
//   const startIdx = (page - 1) * itemsPerPage;
//   const endIdx = Math.min(startIdx + itemsPerPage, totalProducts);

//   const products = Array.from({ length: endIdx - startIdx }, (_, index) => ({
//     id: startIdx + index + 1,
//     name: `Product ${startIdx + index + 1}`,
//   }));

//   // Hitung total halaman berdasarkan jumlah produk dan item per halaman
//   const totalPages = Math.ceil(totalProducts / itemsPerPage);

//   // Kembalikan data produk, halaman saat ini, dan total halaman sebagai respons JSON
//   res.status(200).json({
//     products,
//     currentPage: parseInt(page, 10),
//     totalPages,
//   });
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products = await productsData("products");
    const page = Number(req.query.page) || 1;
    const totalProducts = products?.length;
    const itemsPerpage = 8;
    const totalPages = Math.ceil(totalProducts / itemsPerpage);
    const idxFirts = (page - 1) * itemsPerpage;

    const filteredProducts = products.slice(idxFirts, page * itemsPerpage);

    res.status(200).json({
      status: true,
      code: 200,
      data: filteredProducts,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        status: false,
        code: 500,
        message: error.message,
      });
    }
  }
}
