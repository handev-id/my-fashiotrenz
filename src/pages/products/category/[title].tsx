import { Colors } from "@/components/ColorScheme";
import Loading from "@/components/LoadingPage";
import ProductsList from "@/components/ProductsList";
import ProductLoad from "@/components/skeletons/product";
import { useProducts } from "@/hooks/useProducts";
import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const { data, isLoading } = useProducts();
  const params: any = useParams();
  const titleCategory = params?.title?.toLowerCase();

  const filteredProducts = data?.products?.filter((product: any) =>
    product.category.includes(titleCategory)
  );

  if (!data) {
    return (
      <Box py={100} bg={Colors.fourthirty}>
        <ProductLoad />
      </Box>
    );
  }

  return (
    <Box py={100} bg={Colors.fourthirty}>
      <ProductsList data={filteredProducts} />
      {/* {<Heading textAlign={"center"}>{products?.message}</Heading>} */}
      {isLoading && <Loading />}
    </Box>
  );
};

export default CategoryPage;
