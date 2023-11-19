import {
  Container,
  Flex,
  Heading,
  Box,
  Avatar,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Colors } from "./ColorScheme";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FaAddressBook } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

type BCProps = {
  role: string | null;
  href: string;
  username: string;
  profilesData: Array<{ title: string; path: string; icon: any }>;
  isLogin?: boolean;
};

const Breadcrumbs: React.FC<BCProps> = ({
  username,
  role,
  profilesData,
  isLogin,
}) => {
  const toast = useToast();

  const onComing = () => {
    toast({
      title: "Segera Hadir",
      description: "Fitur ini sedang dalam tahap pengembangan",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

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
          <div style={{ textAlign: "center" }}>
            <Avatar />
            <Heading size={"lg"}>{username}</Heading>
            <Text>{role}</Text>
          </div>
          <div style={{ marginTop: 10 }}>
            {profilesData?.map((link) => (
              // <Link href={link.path}>
              <Box
                display={isLogin ? "block" : "none"}
                key={link.title}
                onClick={() => onComing()}
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
                <Flex align={"center"} gap={2}>
                  <div style={{ fontSize: 24 }}>{link.icon}</div>
                  {link.title}
                </Flex>
              </Box>
              // </Link>
            ))}
            <Link
              href={"/user/orders"}
              style={{ display: isLogin ? "block" : "none" }}
            >
              <Box
                cursor={"pointer"}
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
                <Flex align={"center"} gap={2}>
                  <div style={{ fontSize: 24 }}>
                    <TbTruckDelivery />
                  </div>
                  Pesanan
                </Flex>
              </Box>
            </Link>
            <Box
              onClick={() => (isLogin ? signOut() : signIn())}
              cursor={"pointer"}
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
              <Flex align={"center"} gap={2}>
                <div style={{ fontSize: 24 }}>
                  {isLogin ? <BiLogOut /> : <BiLogIn />}
                </div>
                {isLogin ? "Log out" : "Login"}
              </Flex>
            </Box>
          </div>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Breadcrumbs;
