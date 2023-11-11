import { Colors } from "@/components/ColorScheme";
import Loading from "@/components/LoadingPage";
import { useProduct } from "@/hooks/useProducts";
import {
  Box,
  Container,
  Image,
  Flex,
  HStack,
  Stack,
  Heading,
  Text,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillCartPlusFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
const DetailPage = () => {
  const params = useParams();
  const { data, isLoading, error } = useProduct(params?.id as string);
  const { data: session }: any = useSession();
  const userName = session?.user?.fullname;
  const toast = useToast();

  const discount = data?.product?.price + data?.product?.price * 0.3;
  const [chooseSize, setChooseSize] = useState<string>("");
  const [thumbnail, setThumbnail] = useState(0);

  const chooseSizeHandler = (size: string) => {
    setChooseSize(size);
  };

  const { mutate, isLoading: loadingCart } = useMutation({
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

  const handleAddToCarts = () => {
    if (!session || chooseSize == "") {
      toast({
        title: "Gagal",
        description: !session
          ? "Silahkan login terlebih dahulu"
          : "Silahkan pilih ukuran terlebih dahulu",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return null;
    } else {
      const product: any = {
        id: params?.id,
        title: data?.product.title,
        price: data?.product.price,
        thumbnail: data?.product.thumbnail,
        stock: data?.product.stock,
        size: chooseSize,
        quantity: 1,
      };
      mutate(product);
    }
  };

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <Box w={"full"} bg={Colors.fourthirty} pt={100} pb={50}>
      <Container maxW={"container.lg"}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 3, md: 10 }}
          bg={"white"}
          justify={{ base: "center", lg: "space-between" }}
          rounded={"lg"}
          shadow={"lg"}
          p={{ base: 5, md: 10 }}
        >
          <Box>
            <Stack w={{ base: 250, sm: 300 }} mx={"auto"}>
              <Image src={data?.product?.images[thumbnail]} />
              <Flex gap={5} justify={"space-between"} align={"center"}>
                {data?.product?.images?.map((img: string, index: number) => (
                  <Image
                    cursor={"pointer"}
                    w={{ base: 70, sm: 100 }}
                    h={{ base: 70, sm: 100 }}
                    objectFit={"contain"}
                    key={index}
                    src={img}
                    p={2}
                    border={`1px solid ${Colors.secondary}`}
                    opacity={thumbnail === index ? 1 : 0.5}
                    onClick={() => setThumbnail(index)}
                  />
                ))}
              </Flex>
            </Stack>
          </Box>
          <Stack>
            <div>
              <Text
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={Colors.secondary}
              >
                {data?.product?.category}
              </Text>
              <Heading size={{ base: "lg", md: "xl" }}>
                {data?.product?.title}
              </Heading>
            </div>
            <Heading size={{ base: "md", md: "lg" }}>
              Rp. {data?.product?.price?.toLocaleString("id-ID")}
            </Heading>
            <Flex gap={2}>
              <Text opacity={"80%"}>Potongan Harga Dari </Text>
              <Text
                fontWeight={"bold"}
                textDecoration={"line-through"}
                color={"red.300"}
              >
                Rp.{discount.toLocaleString("id-ID")}
              </Text>
            </Flex>
            <Text>{data?.product?.description}</Text>
            <Heading fontSize={18} mt={7} mb={2} opacity={"80%"}>
              PILIH UKURAN
            </Heading>
            <HStack spacing={3}>
              <Button
                onClick={() => chooseSizeHandler("S")}
                p={3}
                rounded={"full"}
                bg={chooseSize == "S" ? Colors.secondary : "#eee"}
                color={chooseSize == "S" ? "white" : Colors.hoverPrimary}
              >
                S
              </Button>
              <Button
                onClick={() => chooseSizeHandler("M")}
                p={3}
                rounded={"full"}
                bg={chooseSize == "M" ? Colors.secondary : "#eee"}
                color={chooseSize == "M" ? "white" : Colors.hoverPrimary}
              >
                M
              </Button>
              <Button
                onClick={() => chooseSizeHandler("L")}
                p={3}
                rounded={"full"}
                bg={chooseSize == "L" ? Colors.secondary : "#eee"}
                color={chooseSize == "L" ? "white" : Colors.hoverPrimary}
              >
                L
              </Button>
              <Button
                onClick={() => chooseSizeHandler("XL")}
                p={3}
                rounded={"full"}
                bg={chooseSize == "XL" ? Colors.secondary : "#eee"}
                color={chooseSize == "XL" ? "white" : Colors.hoverPrimary}
              >
                XL
              </Button>
            </HStack>

            <Flex
              direction={{ base: "column", md: "row" }}
              mt={{ base: 8, md: 10 }}
              gap={{ base: 3, md: 5 }}
              w={"full"}
            >
              <Button
                _hover={{
                  bg: Colors.hoverPrimary,
                }}
                bg={Colors.secondary}
                color={"white"}
                size={{ base: "md", md: "lg" }}
              >
                <Flex gap={3} align={"center"}>
                  Checkout
                  <BsFillArrowRightCircleFill />
                </Flex>
              </Button>
              <Button
                onClick={() => handleAddToCarts()}
                size={{ base: "md", md: "lg" }}
              >
                <Flex gap={3} align={"center"}>
                  {loadingCart ? <Spinner /> : "Tambah Ke Keranjang"}
                  <BsFillCartPlusFill fontSize={20} />
                </Flex>
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailPage;
