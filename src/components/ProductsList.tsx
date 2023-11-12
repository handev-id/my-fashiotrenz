import { useProducts } from "@/hooks/useProducts";
import { ProductType } from "@/types/types";
import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Colors } from "./ColorScheme";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import Loading from "./LoadingPage";
import Link from "next/link";
import ProductLoad from "./skeletons/product";

interface ProductsProps {
  data: any;
  isLoading?: boolean;
  error?: any;
}

const ProductsList: React.FC<ProductsProps> = ({ data, isLoading, error }) => {
  const { data: session }: any = useSession();
  const userName = session?.user?.fullname;
  const toast = useToast();

  const { mutate: addToCarts, isLoading: loadingCart } = useMutation({
    mutationFn: async (cartData) => {
      const response = await fetch(`/api/post/carts?username=${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });
      if (response.status === 200) {
        toast({
          title: "Suksess",
          description: "Produk ditambahkan ke keranjang",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      return response;
    },
  });

  const handleAddToCarts = (product: any) => {
    if (!session) {
      toast({
        title: "Gagal",
        description: "Silahkan login terlebih dahulu",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return null;
    } else {
      const data: any = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        size: "",
        quantity: 1,
      };
      addToCarts(data);
    }
  };

  if (isLoading) {
    return <ProductLoad />;
  }

  return (
    <Flex flexWrap={"wrap"} justify={"center"} gap={{ base: 4, md: 5 }}>
      {loadingCart ? <Loading /> : null}
      {data?.map((product: ProductType) => (
        <Box
          key={product.id}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          gap={{ base: 1, md: 3 }}
          w={{ base: 150, sm: 220, md: 285 }}
        >
          <Link href={`/products/details/${product.id}`}>
            <Stack
              cursor={"pointer"}
              spacing={{ base: 2, md: 3 }}
              w={"full"}
              h={{ base: 200, md: 300 }}
              bg={"white"}
              p={{ base: 2, md: 4 }}
            >
              <Image
                transition={"all 0.3s"}
                _hover={{ transform: "scale(1.1)" }}
                src={product.thumbnail}
                objectFit={"contain"}
                w={"full"}
                h={{ base: "70%", md: "80%" }}
              />
              <Heading
                opacity={"80%"}
                w={"full"}
                size={{ base: "xs", md: "md" }}
              >
                {product.title}
              </Heading>
            </Stack>
          </Link>
          <Flex
            p={{ base: 1, md: 3 }}
            justify={"space-between"}
            bg={"white"}
            align={"center"}
          >
            <Button
              size={{ base: "xs", md: "md" }}
              _hover={{ bg: Colors.hoverPrimary }}
              bg={Colors.secondary}
            >
              <Box
                as={"button"}
                disabled={loadingCart}
                onClick={() => handleAddToCarts(product)}
                display={{ base: "none", md: "block" }}
              >
                <BsFillCartPlusFill color={"white"} fontSize={26} />
              </Box>
              <Box
                as={"button"}
                disabled={loadingCart}
                onClick={() => handleAddToCarts(product)}
                display={{ base: "block", md: "none" }}
              >
                <BsFillCartPlusFill color={"white"} fontSize={20} />
              </Box>
            </Button>
            <Text
              fontSize={{ base: "md", md: "2xl" }}
              color={Colors.secondary}
              textAlign={"end"}
            >
              Rp.
              {product.price.toLocaleString("id-ID", {
                currency: "IDR",
              })}
            </Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default ProductsList;
