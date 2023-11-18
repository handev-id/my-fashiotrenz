import { Colors } from "@/components/ColorScheme";
import { Box, Container, Flex, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const OrdersPage = () => {
  const { data: session }: any = useSession();
  const { back } = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/get/orders");
      return res.json();
    },
  });

  const ordersDataFiltered = data?.orders.filter((order: any) => {
    return order.userName === session?.user.fullname;
  });

  return (
    <div style={{ backgroundColor: Colors.fourthirty, height: "100vh" }}>
      <Flex bg={Colors.secondary} h={20} align={"center"}>
        <Box
          cursor={"pointer"}
          onClick={() => back()}
          style={{ margin: "0 20px" }}
          _hover={{ opacity: "70%" }}
          bg={"#067d68"}
          p={3}
          rounded={"lg"}
        >
          <FaArrowLeft color="white" fontSize={22} />
        </Box>
      </Flex>

      <Container maxW={"container.xl"} bg={"white"} h={300} shadow={"lg"}>
        {ordersDataFiltered?.map((order: any) => (
          // <Link href={link.path}>
          <Box
            key={order.id}
            mt={3}
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: "100%",
            }}
            border={"2px"}
            borderColor={Colors.fourthirty}
            _hover={{ bg: Colors.fourthirty }}
            p={3}
            rounded={"lg"}
          >
            <Flex align={"center"} gap={2}>
              <Image src={order.image} />
            </Flex>
          </Box>
          // </Link>
        ))}
      </Container>
    </div>
  );
};

export default OrdersPage;
