import {
  Text,
  Flex,
  HStack,
  Heading,
  Image,
  VStack,
  Center,
  Input,
  Button,
} from "@chakra-ui/react";
import { Colors } from "../ColorScheme";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { ProductType } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/router";

interface CartProps {
  cartData?: Array<ProductType>;
  deleteProduct: (id: string) => void;
}

const CartItem: React.FC<CartProps> = ({ cartData, deleteProduct }) => {
  const { push } = useRouter();
  return (
    <div>
      {cartData?.map((product: ProductType) => (
        <HStack
          pos={"relative"}
          mb={3}
          p={{ base: 2, md: 3 }}
          bg={"white"}
          justify={"space-between"}
        >
          <Flex gap={3} w={"80%"}>
            <Image
              rounded={"lg"}
              src={product.thumbnail}
              h={{ base: 100, md: 150 }}
              objectFit={"cover"}
              w={{ base: 100, md: 150 }}
            />
            <div>
              <Heading size={{ base: "sm", md: "md" }} color={Colors.primary}>
                {product.title}
              </Heading>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                Stok: {product.stock}
              </Text>
            </div>
          </Flex>
          <VStack spacing={{ base: 1, md: 3 }}>
            {/* <Center
              p={2}
              _hover={{ color: Colors.primary, bg: Colors.fourthirty }}
              style={{ cursor: "pointer" }}
            >
              <AiOutlinePlus fontSize={{ base: 16, md: 20 }} />
            </Center> */}
            <Text fontSize={{ base: 16, md: 20 }}>{product.quantity}</Text>
            {/* <Center
              style={{ cursor: "pointer" }}
              p={2}
              _hover={{ color: Colors.primary, bg: Colors.fourthirty }}
            >
              <AiOutlineMinus fontSize={{ base: 16, md: 20 }} />
            </Center> */}
          </VStack>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: 100,
              padding: 3,
            }}
          >
            <Flex gap={1}>
              <p>Rp.</p>
              <Heading fontSize={{ base: "lg", md: "xl" }}>
                {product.price.toLocaleString("id-ID")}
              </Heading>
            </Flex>
            <Flex
              cursor={"pointer"}
              align={"center"}
              gap={{ base: 1, md: 2 }}
              padding={{ base: 1, md: 3 }}
              opacity={"80%"}
              as="button"
              rounded={"md"}
              _hover={{
                color: Colors.primary,
                bg: Colors.fourthirty,
                opacity: "100%",
              }}
              onClick={() => deleteProduct(product.id)}
            >
              <BsFillTrash3Fill />
              <Text fontSize={{ base: "sm", md: "md" }}>Hapus</Text>
            </Flex>
          </div>
          <Link href={`/checkout/${product.id}`}>
            <Button
              size={{ base: "xs", md: "sm" }}
              _hover={{ bg: Colors.hoverPrimary }}
              color={"white"}
              bg={Colors.secondary}
              pos={"absolute"}
              bottom={0}
              left={0}
            >
              Checkout
            </Button>
          </Link>
        </HStack>
      ))}
    </div>
  );
};

export default CartItem;
