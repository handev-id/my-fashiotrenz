import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Colors } from "./ColorScheme";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "./LoadingPage";

const HeaderRoom = () => {
  const { back, push } = useRouter();
  const { data: session }: any = useSession();
  if (!session) {
    return <Loading />;
  }

  return (
    <Flex
      bg={Colors.secondary}
      h={20}
      align={"center"}
      justify={"space-between"}
    >
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
      <Box
        cursor={"pointer"}
        onClick={() => push("/")}
        style={{ margin: "0 20px" }}
        _hover={{ opacity: "70%" }}
        bg={"#067d68"}
        p={3}
        rounded={"lg"}
      >
        <FaHome color="white" fontSize={22} />
      </Box>
    </Flex>
  );
};

export default HeaderRoom;
