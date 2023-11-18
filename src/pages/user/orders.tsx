import { Colors } from "@/components/ColorScheme";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import HeaderRoom from "@/components/HeaderRoom";

const OrdersPage = () => {
  const { data: session }: any = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/get/orders");
      return res.json();
    },
  });

  const ordersDataFiltered = data?.orders.filter((order: any) => {
    return order.accountName === session?.user.fullname;
  });

  return (
    <div style={{ backgroundColor: Colors.fourthirty, height: "100vh" }}>
      <HeaderRoom />
      <Container maxW={"container.xl"} p={0} bg={"white"}>
        {ordersDataFiltered?.map((order: any) => (
          // <Link href={link.path}>
          <Box
            key={order.id}
            mt={3}
            style={{
              fontWeight: "bold",
              width: "100%",
            }}
            p={{ base: 1, md: 3 }}
            rounded={"lg"}
          >
            <Flex justify={"space-between"}>
              <div>
                <Flex gap={2}>
                  <Image
                    objectFit={"contain"}
                    src={order.image}
                    h={{ base: 50, md: 100 }}
                    w={{ base: 50, md: 100 }}
                  />
                  <div>
                    <Heading size={{ base: "xs", md: "md" }}>
                      {order.title}
                    </Heading>
                    <Flex gap={2}>
                      <Text fontWeight={700} opacity={"80%"}>
                        {order.quantity}x
                      </Text>
                      <p style={{ opacity: "80%", fontSize: 14 }}>
                        Ukuran: {order.size}
                      </p>
                    </Flex>
                    <p style={{ marginTop: "10px" }}>
                      Rp.{order.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </Flex>
              </div>

              <div>
                <Button
                  size={{ base: "xs", md: "md" }}
                  bg={Colors.secondary}
                  color={"white"}
                  px={3}
                  rounded={"lg"}
                  py={1}
                >
                  {order.status ? (
                    <Flex gap={2} align={"center"}>
                      <TbTruckDelivery />
                      Sedang Dikirim
                    </Flex>
                  ) : (
                    <Flex gap={2} align={"center"}>
                      <FaClockRotateLeft />
                      Menunggu Pembayaran
                    </Flex>
                  )}
                </Button>
                <Text fontSize={14} mt={10} textAlign={"end"}>
                  {order.timestamp}
                </Text>
              </div>
            </Flex>
          </Box>
          // </Link>
        ))}
      </Container>
    </div>
  );
};

export default OrdersPage;
