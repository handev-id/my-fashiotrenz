import { Colors } from "@/components/ColorScheme";
import Loading from "@/components/LoadingPage";
import ProductsList from "@/components/ProductsList";
import { Box, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const AllProducts = () => {
  const currentPage = useSearchParams().get("page");

  const router = useRouter();

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const response = await fetch(`/api/get/paginations?page=${currentPage}`);
      return response.json();
    },
  });

  const handleChangePage = (page: number) => {
    router.push({
      href: router.asPath,
      query: {
        page,
      },
    });
  };

  return (
    <Box py={100} bg={Colors.fourthirty}>
      <ProductsList data={data?.data} />
      {isLoading && <Loading />}
      <Button onClick={() => handleChangePage(1)}>-</Button>
      <Button onClick={() => handleChangePage(2)}>+</Button>
    </Box>
  );
};

export default AllProducts;
