import {
  Card,
  Text,
  CardBody,
  HStack,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Colors } from "../ColorScheme";

const OrderSummary = ({ dataSummary }: any) => {
  const orderSum = dataSummary?.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  const totalProduct = dataSummary?.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  const productName = dataSummary?.map((item: any) => {
    return `-${item.title}, `;
  });

  return (
    <Card border={`1px solid #dedede`}>
      <CardBody>
        <Heading fontSize={{ base: "2xl", lg: "3xl" }} mb={8}>
          Ringkasan Pesanan
        </Heading>
        <HStack
          mb={2}
          justify={"space-between"}
          align={"center"}
          fontWeight={700}
        >
          <Text fontSize={{ base: 14, md: 16 }}>Subtotal: </Text>
          <Text opacity={"80%"} fontSize={{ base: 14, md: 16 }}>
            Rp.{orderSum.toLocaleString("id-ID")}
          </Text>
        </HStack>
        <HStack
          mb={2}
          align={"center"}
          justify={"space-between"}
          fontWeight={700}
        >
          <Text fontSize={{ base: 14, md: 16 }}>Jumlah Produk: </Text>
          <Text opacity={"80%"} fontSize={{ base: 14, md: 16 }}>
            {totalProduct}
          </Text>
        </HStack>
        <HStack mb={2} align={"center"} justify={"space-between"}>
          <Text fontSize={{ base: 14, md: 16 }} fontWeight={700}>
            Nama Nama Produk:{" "}
          </Text>
          <Text opacity={"80%"} fontSize={16}>
            {productName}
          </Text>
        </HStack>

        <Heading
          display={"flex"}
          mt={5}
          fontSize={{ base: "xl", lg: "2xl" }}
          as={"h3"}
        >
          Total:{"  "}{" "}
          <Text
            ml={4}
            fontWeight={700}
            fontSize={"16px"}
            as={"p"}
            opacity={"90%"}
          >
            Rp.
          </Text>
          {orderSum.toLocaleString("id-ID", {
            currency: "IDR",
          })}
        </Heading>
        <Button
          _hover={{
            bg: Colors.hoverPrimary,
          }}
          mt={10}
          w={"full"}
          py={{ base: 4, md: 6 }}
          fontSize={{ base: 18, lg: 20 }}
          bg={Colors.secondary}
          color={"white"}
        >
          <Flex gap={3} align={"center"}>
            Checkout
            <BsFillArrowRightCircleFill />
          </Flex>
        </Button>
      </CardBody>
    </Card>
  );
};

export default OrderSummary;
