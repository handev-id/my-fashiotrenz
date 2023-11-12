import { Box, Flex, Skeleton } from "@chakra-ui/react";

const CartLoad = () => {
  return (
    <Box px={{ base: 2, lg: 0 }} w={"full"}>
      <Flex
        align={{ base: "center", lg: "start" }}
        w={"full"}
        gap={5}
        justify={"center"}
        direction={{ base: "column", lg: "row" }}
      >
        <Box w={{ base: "full", lg: 800 }}>
          <Skeleton w={"full"} h={150} mb={3} />
          <Skeleton w={"full"} h={150} mb={3} />
          <Skeleton w={"full"} h={150} mb={3} />
        </Box>
        <Box w={{ base: "full", lg: 400 }}>
          <Skeleton w={"full"} h={360} />
        </Box>
      </Flex>
    </Box>
  );
};

export default CartLoad;
