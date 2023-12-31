import { useProducts } from "@/hooks/useProducts";
import { ProductType } from "@/types/types";
import { storage } from "@/utils/firebase";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { deleteObject, ref } from "firebase/storage";

const ProductList = () => {
  const { data, refetch } = useProducts();

  const deleteProduct = async (id: string, imagesId: string[]) => {
    const confirmDelete = confirm("Yakin AKan Menghapus Data Ini?");
    if (!confirmDelete) {
      return;
    }
    imagesId?.forEach(async (img) => {
      await deleteObject(ref(storage, img));
    });
    const response = await fetch(`/api/deleteProduct?id=${id}`, {
      method: "DELETE",
    });
    refetch();
    return response;
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple" rounded={'lg'} bg={"white"} mt={5}>
          <Thead>
            <Tr>
              <Th>Fill</Th>
              <Th>No</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.products.map((product: ProductType) => (
              <Tr key={product.id}>
                <Td>
                  <input type="checkbox" />
                </Td>
                <Td>
                  <img src={product.thumbnail} width={60} alt="" />
                </Td>
                <Td>{product.title}</Td>
                <Td>{product.description.slice(0, 20)}...</Td>
                <Td>Rp. {product.price.toLocaleString('id')}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  {/* <Button
                    onClick={() => {
                      push(`/dashboard/upload/update?id=${product.id}`);
                    }}
                    colorScheme="success"
                  >
                    Edit
                  </Button> */}
                  <Button
                    onClick={() => deleteProduct(product.id, product.images)}
                    variant={"outline"}
                    colorScheme={"red"}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductList;
