import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Colors } from "../ColorScheme";

const ProfileLoad = () => {
  return (
    <Flex
      pt={{ base: 280, md: 300 }}
      h={300}
      justify="center"
      align={"center"}
      w={"full"}
      bg={Colors.secondary}
    >
      <Container maxW={"container.lg"}>
        <Stack
          rounded={"lg"}
          bg={"white"}
          p={{ base: 2, md: 5 }}
          shadow={"lg"}
          pb={10}
        >
          <VStack spacing={3} justify={"center"}>
            <SkeletonCircle size={{ base: "100px", md: "80px" }} />
            <Skeleton width={200} height={5} />
            <Skeleton width={80} height={5} />
          </VStack>
          <div style={{ marginTop: 10 }}>
            <Box
              mt={3}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                width: "100%",
              }}
              border={"2px"}
              borderColor={Colors.fourthirty}
              _hover={{ bg: Colors.fourthirty }}
              p={3}
              rounded={"lg"}
            >
              <Skeleton width={"100%"} height={10} />
            </Box>
            <Box
              mt={3}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                width: "100%",
              }}
              border={"2px"}
              borderColor={Colors.fourthirty}
              _hover={{ bg: Colors.fourthirty }}
              p={3}
              rounded={"lg"}
            >
              <Skeleton width={"100%"} height={10} />
            </Box>
            <Box
              mt={3}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                width: "100%",
              }}
              border={"2px"}
              borderColor={Colors.fourthirty}
              _hover={{ bg: Colors.fourthirty }}
              p={3}
              rounded={"lg"}
            >
              <Skeleton width={"100%"} height={10} />
            </Box>
          </div>
        </Stack>
      </Container>
    </Flex>
  );
};

export default ProfileLoad;
