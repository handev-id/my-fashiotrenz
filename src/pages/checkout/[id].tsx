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
import { FaArrowLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";

const schema = yup.object({
  email: yup.string().email().required("Isi Email"),
  name: yup.string().min(6).required("Isi Nama"),
  phone: yup.number().required("Isi No Telpon"),
  address: yup.string().min(50).required("Isi Alamat"),
});

const CheckoutPage = () => {
  const { data: session }: any = useSession();
  const {
    push,
    query: { id, qty, sz },
    back,
  }: any = useRouter();
  const [rekeningName, setRekeningName] = useState<string>("");
  if (!session) {
    return null;
  }

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery(["product"], async () => {
    const res = await fetch(`/api/get/product/${id}`);
    return res.json();
  });

  const [choosePayment, setChoosePayment] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onCreateOrder = (data: any) => {
    mutate({
      ...data,
      payment: paymentsMethode[choosePayment as number].title,
      userRekening: rekeningName,
      product: product.id,
      title: product.title,
      price: product.price,
      quantity: qty,
      size: sz,
      status: false,
      image: product.thumbnail,
      accountName: session?.user?.fullname,
      timestamp: new Date().toDateString(),
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
    onSuccess: () => {
      push("/user/orders");
    },
  });

  return (
    <>
      <Flex h={"70px"} bg={Colors.secondary} align={"center"}>
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
          <CheckoutDetail
            productdata={product?.product}
            isLoading={isLoading}
          />
        </Box>
        <Box
          pb={20}
          pos={"relative"}
          rounded={"lg"}
          bg={"white"}
          shadow={"lg"}
          pt={5}
          px={5}
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
                    type="email"
                    {...register("email")}
                    size={"sm"}
                    focusBorderColor={errors?.email ? "crimson" : "gray.400"}
                    fontSize={16}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label style={{ fontWeight: "bold" }}>Nomor Telpon</label>
                  <Input
                    type="number"
                    {...register("phone")}
                    size={"sm"}
                    focusBorderColor={errors?.phone ? "crimson" : "gray.400"}
                    fontSize={16}
                    placeholder="Nomor Telpon"
                  />
                </div>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Nama Penerima</label>
                <Input
                  {...register("name")}
                  size={"sm"}
                  focusBorderColor={errors?.name ? "crimson" : "gray.400"}
                  fontSize={16}
                  placeholder="Nama Lengkap"
                />
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>Alamat Lengkap</label>
                <Textarea
                  {...register("address")}
                  size={"sm"}
                  focusBorderColor={errors?.address ? "crimson" : "gray.400"}
                  fontSize={16}
                  placeholder="Alamat Lengkap"
                  rows={7}
                ></Textarea>
              </div>
            </Flex>
            <Button
              isDisabled={choosePayment === null || rekeningName == ""}
              pos={"absolute"}
              right={3}
              bottom={3}
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
                  key={index}
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
    </>
  );
};

export default CheckoutPage;

type paymentsType = {
  title: string;
  image: string;
  no: string;
};

const paymentsMethode: Array<paymentsType> = [
  { title: "Gopay", image: "/gopay.png", no: "085770274043" },
  { title: "Dana", image: "/dana.webp", no: "085770274043" },
  { title: "Jago", image: "/jago.png", no: "1034 8060 6937" },
];
