import CheckoutDetail from "@/components/CheckoutDetail";
import { Colors } from "@/components/ColorScheme";
import { useProduct } from "@/hooks/useProducts";
import {
  Box,
  Flex,
  Heading,
  Input,
  Textarea,
  Text,
  HStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const CheckoutPage = () => {
  const {
    query: { id },
  }: any = useRouter();

  const { data, isLoading } = useQuery(["product"], async () => {
    const res = await fetch(`/api/get/carts?id=${id}`);
    return res.json();
  });

  const [choosePayment, setChoosePayment] = useState<number | null>(null);

  const onChoosePayment = (index: number) => {
    setChoosePayment(index);
  };

  return (
    <Flex
      bg={Colors.fourthirty}
      p={{ base: 5, lg: 10 }}
      direction={{ base: "column", lg: "row" }}
      gap={{ base: 3, lg: 6 }}
    >
      <Box
        rounded={"lg"}
        bg={"white"}
        shadow={"lg"}
        p={5}
        w={{ base: "full", lg: "30%" }}
      >
        <CheckoutDetail productdata={data?.carts} isLoading={isLoading} />
      </Box>
      <Box
        rounded={"lg"}
        bg={"white"}
        shadow={"lg"}
        p={5}
        w={{ base: "full", lg: "80%" }}
      >
        <Heading size={"lg"}>Isi Data Diri Anda</Heading>
        <p>Data Ini Akan Aman</p>
        <form>
          <Flex mt={4} flexWrap={"wrap"} gap={5}>
            <div>
              <div>
                <label style={{ fontWeight: "bold" }}>Email</label>
                <Input
                  size={"sm"}
                  focusBorderColor={"gray.400"}
                  fontSize={16}
                  placeholder="Email"
                />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Nomor Telpon</label>
                <Input
                  size={"sm"}
                  focusBorderColor={"gray.400"}
                  fontSize={16}
                  placeholder="Nomor Telpon"
                />
              </div>
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Nama Lengkap</label>
              <Input
                size={"sm"}
                focusBorderColor={"gray.400"}
                fontSize={16}
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Alamat Lengkap</label>
              <Textarea
                size={"sm"}
                focusBorderColor={"gray.400"}
                fontSize={16}
                placeholder="Alamat Lengkap"
                rows={7}
              ></Textarea>
            </div>
          </Flex>
        </form>
        <div style={{ marginTop: 10 }}>
          <Heading size={"md"}>Metode Pembayaran: </Heading>
          <Flex gap={5} mt={3}>
            {paymentsMethode.map((pay, index) => (
              <HStack
                onClick={() => onChoosePayment(index)}
                spacing={1}
                cursor={"pointer"}
                p={3}
                border={
                  choosePayment === index
                    ? `2px solid ${Colors.secondary}`
                    : "1px solid #ccc"
                }
              >
                <Image src={pay.image} w={100} />
              </HStack>
            ))}
          </Flex>
          {choosePayment === null ? null : (
            <Flex flexWrap={"wrap"} my={5} gap={3}>
              <div style={{ border: "1px solid #ccc", padding: "12px 20px" }}>
                <p>Bayar Ke Nomor Rekening Berikut:</p>
                <Heading size={"md"} mt={3}>
                  <span style={{ opacity: "80%" }}>
                    {paymentsMethode[choosePayment]?.no}
                  </span>
                </Heading>
              </div>
              <div>
                <Image
                  mb={2}
                  src={paymentsMethode[choosePayment]?.image}
                  w={100}
                />
                <Input
                  placeholder="Nama Rekening anda"
                  focusBorderColor={Colors.secondary}
                />
              </div>
            </Flex>
          )}
        </div>

        <Flex justify={"end"}>
          <Button
            size={"lg"}
            bg={Colors.secondary}
            color={"white"}
            _hover={{ bg: Colors.hoverPrimary }}
            ml={"auto"}
            mt={5}
          >
            Buat Pesanan
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CheckoutPage;

type paymentsType = {
  image: string;
  no: string;
};

const paymentsMethode: Array<paymentsType> = [
  { image: "/gopay.png", no: "085770274043" },
  { image: "/dana.webp", no: "6285770274043" },
  { image: "/jago.png", no: "123 456 6285770274043" },
];
