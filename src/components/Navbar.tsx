import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";

import Link from "next/link";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Colors } from "./ColorScheme";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { BsFillCartDashFill, BsFillCartCheckFill } from "react-icons/bs";
import { ModalSearch } from "./Modal";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { data }: any = useSession();

  const router = useRouter();
  const pathName = [
    "/",
    "/user/profile",
    "/user/cart",
    "/products",
    "/products/details/[id]",
    "/products/search",
    "/products/category/[title]",
  ];
  if (!pathName.includes(router.pathname)) {
    return null;
  }

  return (
    <>
      <Box position="fixed" top={0} zIndex={999} w="full">
        <Flex
          bg={"white"}
          color={"white"}
          minH={"60px"}
          py={{ base: 4 }}
          px={{ base: 4, lg: 10 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"gray.200"}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
            <Heading
              display={{ md: "none" }}
              my="auto"
              ml={3}
              size="lg"
              color={Colors.secondary}
            >
              FashioTrendz
            </Heading>
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "left", md: "start" }}>
            <Heading
              display={{ base: "none", md: "block" }}
              size="lg"
              color={Colors.secondary}
            >
              FashioTrendz
            </Heading>

            <Flex display={{ base: "none", md: "flex" }} my="auto" ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>

          <Stack
            display={{ base: "none", md: "flex" }}
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              onClick={() => (data ? signOut({ callbackUrl: '/' }) : signIn())}
              cursor="pointer"
              as={"a"}
              opacity="80%"
              bg="transparent"
              border={`1px solid ${Colors.secondary}`}
              px={5}
              fontWeight={600}
            >
              {data ? "Log Out" : "Login"}
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontWeight={600}
              color={"white"}
              bg={`${Colors.secondary}`}
              href={"/auth/register"}
              mr={4}
              _hover={{
                bg: Colors.primary,
              }}
            >
              Register
            </Button>
          </Stack>
          <Flex gap={3} align="center">
            <Link href={"/user/cart"}>
              {data ? (
                <BsFillCartCheckFill
                  color={Colors.secondary}
                  fontSize={30}
                  cursor="pointer"
                />
              ) : (
                <BsFillCartDashFill
                  color={Colors.secondary}
                  fontSize={30}
                  cursor="pointer"
                />
              )}
            </Link>
            <ModalSearch />
          </Flex>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                href={navItem.href ?? "/"}
                style={{ textDecoration: "none" }}
              >
                <Box
                  p={2}
                  fontWeight={500}
                  color={"gray.600"}
                  _hover={{
                    textDecoration: "none",
                    color: "gray.800",
                  }}
                >
                  {navItem.label}
                </Box>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={"white"}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link href={href}>
      <Box
        color={Colors.primary}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: "green.50" }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: Colors.secondary }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={Colors.secondary} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};

const MobileNav = () => {
  const { data } = useSession();
  return (
    <Stack shadow={"md"} bg={"white"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Flex gap={4} mt={5}>
        <Button
          onClick={() => signIn()}
          cursor="pointer"
          as={"a"}
          opacity="80%"
          bg="transparent"
          border={`1px solid ${Colors.secondary}`}
          px={5}
          fontWeight={600}
        >
          {data ? "Log Out" : "Login"}
        </Button>
        <Button
          as={"a"}
          fontWeight={600}
          color={"white"}
          bg={`${Colors.secondary}`}
          href={"/auth/register"}
          mr={4}
          _hover={{
            bg: Colors.primary,
          }}
        >
          Register
        </Button>
      </Flex>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={"gray.600"}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={"gray.200"}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: any;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Category",
    children: [
      {
        label: "Jacket Pria",
        subLabel: "Kumpulan Jacket Pria Berkualitas Terbaik",
        href: "/products/category/jacket pria",
      },
      {
        label: "Jacket Wanita",
        subLabel: "Kumpulan Jacket Wanita Berkualitas Terbaik",
        href: "/products/category/jacket wanita",
      },
      {
        label: "Pakaian Wanita",
        subLabel: "Kumpulan Pakaian Wanita Berkualitas Terbaik",
        href: "/products/category/pakaian wanita",
      },
      {
        label: "Pakaian Pria",
        subLabel: "Kumpulan Pakaian Pria Berkualitas Terbaik",
        href: "/products/category/pakaian Pria",
      },
    ],
  },
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Profile",
    href: "/user/profile",
  },
];
