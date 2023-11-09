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
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillCartPlusFill } from "react-icons/bs";

const DetailPage = () => {
  const params = useParams();
  const { data, isLoading, error } = useProduct(params?.id as string);
  const discount = data?.product?.price + data?.product?.price * 0.3;

  const [chooseSize, setChooseSize] = useState<null | number>(null);
  const [thumbnail, setThumbnail] = useState(1);

  const chooseSizeHandler = (size: number) => {
    setChooseSize(size);
  };

  if (isLoading) {
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
                onClick={() => chooseSizeHandler(1)}
                p={3}
                rounded={"full"}
                bg={chooseSize === 1 ? Colors.secondary : "#eee"}
                color={chooseSize === 1 ? "white" : Colors.hoverPrimary}
              >
                S
              </Button>
              <Button
                onClick={() => chooseSizeHandler(2)}
                p={3}
                rounded={"full"}
                bg={chooseSize === 2 ? Colors.secondary : "#eee"}
                color={chooseSize === 2 ? "white" : Colors.hoverPrimary}
              >
                M
              </Button>
              <Button
                onClick={() => chooseSizeHandler(3)}
                p={3}
                rounded={"full"}
                bg={chooseSize === 3 ? Colors.secondary : "#eee"}
                color={chooseSize === 3 ? "white" : Colors.hoverPrimary}
              >
                L
              </Button>
              <Button
                onClick={() => chooseSizeHandler(4)}
                p={3}
                rounded={"full"}
                bg={chooseSize === 4 ? Colors.secondary : "#eee"}
                color={chooseSize === 4 ? "white" : Colors.hoverPrimary}
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
              <Button size={{ base: "md", md: "lg" }}>
                <Flex gap={3} align={"center"}>
                  Tambah Ke Keranjang
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
