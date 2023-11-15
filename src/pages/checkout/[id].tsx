import CheckoutDetail from "@/components/CheckoutDetail";
import { Colors } from "@/components/ColorScheme";
import { useProduct } from "@/hooks/useProducts";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Box,
  Flex,
  Heading,
  Input,
  Textarea,
  HStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email().required("Name is required"),
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
});

const CheckoutPage = () => {
  const {
    query: { id },
  }: any = useRouter();
  const [rekeningName, setRekeningName] = useState<string>("");

  const { data, isLoading } = useQuery(["product"], async () => {
    const res = await fetch(`/api/get/carts/product/${id}`);
    return res.json();
  });

  const [choosePayment, setChoosePayment] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onCreateOrder = (data: any) => {
    mutate({
      ...data,
      payment: choosePayment,
      userRekening: rekeningName,
      product: id,
    });
  };

  const { mutate, isLoading: loadingOrder } = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/post/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response;
    },
  });

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
        shadow={"md"}
        p={5}
        w={{ base: "full", lg: "30%" }}
        h={"full"}
      >
        <CheckoutDetail productdata={data?.cart} isLoading={isLoading} />
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
        <form onSubmit={handleSubmit(onCreateOrder)}>
          <Flex mt={4} flexWrap={"wrap"} gap={5}>
            <div>
              <div>
                <label style={{ fontWeight: "bold" }}>Email</label>
                <Input
                  {...register("email")}
                  size={"sm"}
                  focusBorderColor={"gray.400"}
                  fontSize={16}
                  placeholder="Email"
                />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Nomor Telpon</label>
                <Input
                  {...register("phone")}
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
                {...register("name")}
                size={"sm"}
                focusBorderColor={"gray.400"}
                fontSize={16}
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label style={{ fontWeight: "bold" }}>Alamat Lengkap</label>
              <Textarea
                {...register("address")}
                size={"sm"}
                focusBorderColor={"gray.400"}
                fontSize={16}
                placeholder="Alamat Lengkap"
                rows={7}
              ></Textarea>
            </div>
          </Flex>
          <Button
            type="submit"
            size={"lg"}
            bg={Colors.secondary}
            color={"white"}
            _hover={{ bg: Colors.hoverPrimary }}
            ml={"auto"}
            mt={5}
          >
            Buat Pesanan
          </Button>
        </form>
        <div style={{ marginTop: 10 }}>
          <Heading size={"md"}>Metode Pembayaran: </Heading>
          <Flex gap={5} mt={3}>
            {paymentsMethode.map((pay, index) => (
              <HStack
                onClick={() => setChoosePayment(index)}
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
                  onChange={(e) => setRekeningName(e.target.value)}
                  placeholder="Nama Rekening anda"
                  focusBorderColor={Colors.secondary}
                />
              </div>
            </Flex>
          )}
        </div>

        <Flex justify={"end"}></Flex>
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
  { image: "/dana.webp", no: "085770274043" },
  { image: "/jago.png", no: "1034 8060 6937" },
];
