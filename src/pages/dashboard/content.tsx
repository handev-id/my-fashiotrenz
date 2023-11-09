import { Colors } from "@/components/ColorScheme";
import SidebarWithHeader from "@/components/Dashboard/SidebarWithHeader";
import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const ContentPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await fetch("../api/get/content");
      const content = await response.json();
      return content;
    },
  });

  console.log(data?.content);
  return (
    <SidebarWithHeader>
      <Flex gap={3} flexWrap={"wrap"}>
        <Box bg={"white"} p={3} w={300} h={"full"}>
          <Flex>
            <div>
              <Heading my={4}>Hero Section</Heading>
              <Heading fontSize={20}>{data?.content[0].heading}</Heading>
              <Text>{data?.content[0].description}</Text>
              <Image src={data?.content[0].banner} w={100} />
            </div>
            <Button color={"white"} bg={Colors.secondary}>
              Edit
            </Button>
          </Flex>
        </Box>
        <Box bg={"white"} p={3} w={300}>
          <Flex>
            <div>
              <Heading my={4}>About</Heading>
              <Text fontSize={14}>{data?.content[1].description}</Text>
              <Image src={data?.content[1].image} w={100} />
            </div>
            <Button color={"white"} bg={Colors.secondary}>
              Edit
            </Button>
          </Flex>
        </Box>
        <Box bg={"white"} p={3} w={300}>
          <Flex>
            <div>
              <Heading my={4}>Carousel</Heading>
              <Image src={data?.content[2].model} w={100} />
              {data?.content[2].images.map((img: string) => (
                <Image mt={3} src={img} w={200} />
              ))}
            </div>
            <Button color={"white"} bg={Colors.secondary}>
              Edit
            </Button>
          </Flex>
        </Box>
      </Flex>
    </SidebarWithHeader>
  );
};

export default ContentPage;
