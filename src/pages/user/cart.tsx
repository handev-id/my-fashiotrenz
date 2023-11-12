import { Colors } from "@/components/ColorScheme";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useCarts } from "@/hooks/useProducts";
import Link from "next/dist/client/link";
import CartLoad from "@/components/skeletons/cart";

const CartPage = () => {
  const { data: session }: any = useSession();
  const nameInSession = session?.user?.fullname;

  const { data, isLoading, refetch } = useCarts();
  const cartDataFilter = data?.carts?.filter((product: any) => {
    return product.userName === nameInSession;
  });

  if (isLoading) {
    return (
      <Flex py={100} justify={"center"} bg={Colors.fourthirty}>
        <CartLoad />
      </Flex>
    );
  }

  if (session && cartDataFilter.length === 0) {
    return (
      <Flex py={100} bg={Colors.fourthirty} justify={"center"}>
        <Heading fontSize={{ base: 20, lg: 30 }} opacity={"80%"}>
          Keranjang Kosong
        </Heading>
      </Flex>
    );
  }

  if (!session) {
    return (
      <Flex py={100} bg={Colors.fourthirty} justify={"center"}>
        <div>
          <Heading fontSize={{ base: 20, lg: 30 }} opacity={"80%"}>
            Silahkan Login Terlebih Dulu
          </Heading>
          <Link href={"/auth/login"}>
            <Button
              mt={5}
              bg={Colors.secondary}
              _hover={{ bg: Colors.hoverPrimary }}
              color={"white"}
            >
              Login Sekarang
            </Button>
          </Link>
        </div>
      </Flex>
    );
  }

  const handleDeleteProduct = async (id: string) => {
    const res = await fetch(`/api/delete/cart/${id}`, {
      method: "DELETE",
    });
    refetch();
  };

  return (
    <div
      style={{
        background: Colors.fourthirty,
        padding: "100px 0",
      }}
    >
      <Box px={{ base: 2, lg: 0 }} w={"full"}>
        <Flex
          align={{ base: "center", lg: "start" }}
          w={"full"}
          gap={5}
          justify={"center"}
          direction={{ base: "column", lg: "row" }}
        >
          <Box w={{ base: "full", lg: 800 }}>
            <CartItem
              cartData={cartDataFilter}
              deleteProduct={handleDeleteProduct}
            />
          </Box>
          <Box w={{ base: "full", lg: 400 }}>
            <OrderSummary dataSummary={cartDataFilter} />
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default CartPage;
