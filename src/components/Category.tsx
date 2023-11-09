import { Box, Flex, HStack, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useCategory } from "@/hooks/useProducts";
import { Colors } from "./ColorScheme";
import { useRouter } from "next/router";

type CategoryType = {
  id: string;
  title: string;
  image: string;
};

const Category = () => {
  const { data, isLoading, error } = useCategory();
  const { push } = useRouter();

  return (
    <>
      <Flex
        justify={"center"}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        gap={{ base: 3, md: 5 }}
      >
        {data?.category.map((category: CategoryType) => (
          <Box
            key={category.id}
            cursor={"pointer"}
            onClick={() => push(`/products/category/${category.title}`)}
            rounded={"lg"}
            overflow={"hidden"}
            pos={"relative"}
            h={{ base: 300, md: 400 }}
            w={{ base: "48%", md: 300 }}
            _hover={{ transform: "scale(1.1)" }}
            transition={"all 0.3s ease"}
          >
            <Image
              zIndex={1}
              w={"full"}
              h={"full"}
              objectFit={"cover"}
              src={category.image}
            />
            <div
              className="overlay-category"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "end",
              }}
            >
              <Box p={3}>
                <Heading
                  fontSize={{ base: "xl", md: "2xl" }}
                  as={"h4"}
                  color={"white"}
                >
                  {category.title}
                </Heading>
                <Link
                  href={`/products/category/${category.title}`}
                  style={{ color: "white", height: "100%", width: "100%" }}
                >
                  Details
                </Link>
              </Box>
            </div>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default Category;
