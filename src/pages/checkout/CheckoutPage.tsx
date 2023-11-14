import { Colors } from "@/components/ColorScheme";
import { useProduct } from "@/hooks/useProducts";
import { Box, Flex, Heading, Input, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const CheckoutPage = () => {
  const {
    query: { id },
  }: any = useRouter();
  const { data: product, isLoading } = useProduct(id as string);
  console.log(product);

  return (
    <Flex
      h="100vh"
      bg={Colors.fourthirty}
      p={10}
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
        <h1>Helo</h1>
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
          <Flex></Flex>
        </div>
      </Box>
    </Flex>
  );
};
