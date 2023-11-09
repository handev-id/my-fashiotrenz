import { Colors } from "@/components/ColorScheme";
import Loading from "@/components/LoadingPage";
import ProductsList from "@/components/ProductsList";
import { useProducts } from "@/hooks/useProducts";
import { Box, Heading } from "@chakra-ui/react";

const AllProducts = () => {
  const { data: products, isLoading } = useProducts();
  return (
    <Box py={100} bg={Colors.fourthirty}>
      <ProductsList data={products?.products} />
      {isLoading && <Loading />}
    </Box>
  );
};

export default AllProducts;
