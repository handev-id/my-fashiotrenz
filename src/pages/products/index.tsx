import { Colors } from "@/components/ColorScheme";
import Loading from "@/components/LoadingPage";
import ProductsList from "@/components/ProductsList";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import Head from "next/head";

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
    router.replace({
      href: router.asPath,
      query: {
        page,
      },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      refetch();
    }
  }, [currentPage]);

  return (
    <body style={{ background: Colors.fourthirty, height: '100vh' }}>
      <Head>
        <title>Products - Fashiotrendz</title>
      </Head>
      <Box py={100} bg={Colors.fourthirty}>
        <ProductsList data={data?.data} />
        {isLoading && <Loading />}
        <Flex justify="center" mt={10}>
          <HStack>
            {data?.currentPage !== 1 && (
              <Button
                py={5}
                onClick={() => handleChangePage(data?.currentPage - 1)}
                bg={"white"}
                mr={2}
              >
                <FaCircleArrowLeft fontSize={20} />
              </Button>
            )}
            {new Array(data?.totalPages).fill(1).map((val, index) => (
              <Button
                key={index}
                onClick={() => handleChangePage(index + 1)}
                bg={
                  data?.currentPage === index + 1 ? Colors.hoverPrimary : "white"
                }
                color={
                  data?.currentPage === index + 1 ? "white" : Colors.hoverPrimary
                }
              >
                {index + 1}
              </Button>
            ))}
            {data?.currentPage !== data?.totalPages && (
              <Button
                onClick={() => handleChangePage(data?.currentPage + 1)}
                py={5}
                bg={"white"}
                ml={2}
              >
                <FaCircleArrowRight fontSize={20} />
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>
    </body>
  );
};

export default AllProducts;
