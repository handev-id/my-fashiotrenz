import {
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  Container,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Colors } from "../ColorScheme";

const ProductDetailLoad = () => {
  return (
    <Box w={"full"} bg={Colors.fourthirty} pt={100} pb={50}>
      <Container maxW={"container.lg"}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 3, md: 10 }}
          bg={"white"}
          justify={{ base: "center", lg: "space-between" }}
          rounded={"lg"}
          shadow={"lg"}
          p={{ base: 5, md: 10 }}
        >
          <Box>
            <Stack w={{ base: 250, sm: 300 }} mx={"auto"}>
              <Skeleton w={{ base: 250, lg: 350 }} h={{ base: 250, lg: 350 }} />
              <Flex
                gap={3}
                justify={"space-between"}
                align={"center"}
                ml={{ base: 0, lg: 7 }}
              >
                <Skeleton w={{ base: 70, sm: 100 }} h={{ base: 70, sm: 100 }} />
                <Skeleton w={{ base: 70, sm: 100 }} h={{ base: 70, sm: 100 }} />
                <Skeleton w={{ base: 70, sm: 100 }} h={{ base: 70, sm: 100 }} />
              </Flex>
            </Stack>
          </Box>
          <Stack>
            <div style={{ marginTop: 20 }}>
              <Skeleton h={5} w={200} />
            </div>
            <Flex>
              <Skeleton h={10} w={200} />
              <Skeleton h={10} w={200} />
            </Flex>
            <Skeleton h={300} w={"full"} />
            <Skeleton h={5} w={"30%"} />

            <HStack spacing={3}>
              <SkeletonCircle size={"10"} />
              <SkeletonCircle size={"10"} />
              <SkeletonCircle size={"10"} />
              <SkeletonCircle size={"10"} />
            </HStack>

            <Flex
              direction={{ base: "column", md: "row" }}
              mt={{ base: 8, md: 10 }}
              gap={{ base: 3, md: 5 }}
              w={"full"}
            >
              <Skeleton w={{ base: "100%", lg: "50%" }} h={10} />
              <Skeleton w={{ base: "100%", lg: "50%" }} h={10} />
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default ProductDetailLoad;
