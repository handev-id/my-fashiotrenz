import { Colors } from "@/components/ColorScheme";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import HeaderRoom from "@/components/HeaderRoom";
import Loading from "@/components/LoadingPage";
import MetaTag from "@/components/MetaTag";

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

  if (!ordersDataFiltered) {
    return <Loading />;
  }

  return (
    <div style={{ backgroundColor: Colors.fourthirty, height: "100vh" }}>
      <MetaTag title="Orders - User - Fashiotrenz" description="Orderan anda" />
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
                      Dikirim
                    </Flex>
                  ) : (
                    <Flex gap={2} align={"center"}>
                      <FaClockRotateLeft />
                      Menunggu Pembayaran
                    </Flex>
                  )}
                </Button>
                <Text fontSize={14} textAlign={"end"}>
                  {order.timestamp}
                </Text>
                <Flex justify={"end"}>
                  <DetailOrder
                    name={order.name}
                    email={order.email}
                    phone={order.phone}
                    address={order.address}
                    payment={order.payment}
                    userRekening={order.userRekening}
                    status={order.status}
                  />
                </Flex>
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

interface DetailOrderProps {
  address?: string;
  phone?: number;
  name?: string;
  email?: string;
  payment?: string;
  userRekening?: string;
  status?: boolean;
}

const DetailOrder: React.FC<DetailOrderProps> = ({
  address,
  phone,
  name,
  email,
  payment,
  userRekening,
  status,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} size={"sm"} mt={2}>
        Detail
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detail Pesanan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Heading size={"sm"}>Nama Penerima: {name}</Heading>
              <Heading size={"sm"}>Email: {email}</Heading>
              <Heading size={"sm"}>Nomor Telpon: {phone}</Heading>
              <Text>Alamat: {address}</Text>
              <Text fontWeight={"bold"} mt={2} fontSize={20}>
                Metode Pembayaran: {payment}
              </Text>
              <Text fontSize={18}>Rekening Anda: {userRekening}</Text>
              <Text
                fontWeight={"bold"}
                color={Colors.secondary}
                mt={2}
                fontSize={20}
              >
                Status: {status ? "Dikirim" : "Menunggu Pembayaran"}
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={Colors.secondary}
              color={"white"}
              _hover={{ bg: Colors.hoverPrimary }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
