import { Colors } from "@/components/ColorScheme";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { MdSearchOff } from "react-icons/md";
import { useRouter } from "next/router";

const NotFoundPage = () => {
  const { back } = useRouter();
  return (
    <Center h={"100vh"}>
      <Box pos={"absolute"} translateX={"-50%"} translateY={"-50%"}>
        <MdSearchOff fontSize={"30rem"} opacity={"10%"} />
      </Box>
      <Center flexDirection={"column"}>
        <Heading color={Colors.secondary} size={"4xl"} fontWeight={"bold"}>
          404
        </Heading>
        <p>Halaman Tidak Ditemukan</p>
        <Button onClick={() => back()} mt={5}>
          Kembali
        </Button>
      </Center>
    </Center>
  );
};

export default NotFoundPage;
