import { Colors } from "@/components/ColorScheme";
import Loading from "@/components/LoadingPage";
import ProductsList from "@/components/ProductsList";
import ProductLoad from "@/components/skeletons/product";
import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SearchPage = () => {
  const { query } = useRouter();

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const response = await fetch(`/api/get/search?q=${query.q}`);
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [query.q]);

  if (!products || isLoading) {
    return (
      <Box py={100} bg={Colors.fourthirty}>
        <ProductLoad />
      </Box>
    );
  }

  return (
    <Box py={100} bg={Colors.fourthirty}>
      <ProductsList data={products?.products} />
      {<Heading textAlign={"center"}>{products?.message}</Heading>}
    </Box>
  );
};

export default SearchPage;
