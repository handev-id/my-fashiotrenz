import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  link: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, link: "dashboard" },
  { name: "Products", icon: FiHome, link: "dashboard/products" },
  { name: "Upload", icon: FiTrendingUp, link: "dashboard/upload" },
  { name: "Content", icon: FiCompass, link: "dashboard/content" },
  { name: "Orders", icon: FiStar, link: "dashboard/orders" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={Colors.primary}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          color={"white"}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          ShopMedia.
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} link={link.link} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, link }: NavItemProps) => {
  return (
    <Link href={`/${link}`} style={{ textDecoration: "none" }}>
      <Box color={"white"} _focus={{ boxShadow: "none" }}>
        <Flex
          mt={2}
          _hover={{
            bg: Colors.secondary,
          }}
          align="center"
          p="4"
          mx="4"
          borderRadius="md"
          fontWeight={"semibold"}
          fontSize={"md"}
          role="group"
          cursor="pointer"
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="20"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={Colors.secondary}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={""} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color={Colors.fivethirty}>
                    {"Admin"}
                  </Text>
                  <Text fontSize="xs" color={Colors.fourthirty} opacity={"70%"}>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={"white"} borderColor={"gray.200"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

import { ReactNode } from "react";
import { Colors } from "@/components/ColorScheme";

type SidebarWithHeaderProps = {
  children: ReactNode;
};

import { useSession } from "next-auth/react";
import NotFoundPage from "@/pages/404";

const SidebarWithHeader: React.FC<SidebarWithHeaderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session }: any = useSession();

  if (session?.user.role !== "admin" || !session) {
    return <NotFoundPage />;
  }

  return (
    <Box minH="100vh" bg={"gray.100"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
