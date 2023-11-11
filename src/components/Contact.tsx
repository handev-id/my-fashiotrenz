import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { Colors } from "./ColorScheme";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const onSubmitMessage = (data: any) => {
    mutate(data);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (messageData: any) => {
      const response = await fetch("/api/post/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Suksess",
        description: "Pesan Terkirim",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
    },
  });

  return (
    <Container
      bg={Colors.fourthirty}
      maxW="full"
      mt={0}
      centerContent
      overflow="hidden"
    >
      <Flex>
        <Box
          my={5}
          bg={"white"}
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading color={Colors.primary}>Contact</Heading>
                  <Text
                    color={Colors.hoverPrimary}
                    mt={{ sm: 3, md: 3, lg: 5 }}
                  >
                    Hubungi Kami Untuk Melakukan Kerjasama
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={Colors.hoverPrimary}
                        opacity={"80%"}
                        _hover={{ border: "2px solid " + Colors.primary }}
                        leftIcon={
                          <MdPhone color={Colors.primary} size="20px" />
                        }
                      >
                        +62 85770274043
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={Colors.hoverPrimary}
                        opacity={"80%"}
                        _hover={{ border: "2px solid " + Colors.primary }}
                        leftIcon={
                          <MdEmail color={Colors.primary} size="20px" />
                        }
                      >
                        mparhanmaulana17@
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={Colors.hoverPrimary}
                        opacity={"80%"}
                        _hover={{ border: "2px solid" + Colors.primary }}
                        leftIcon={
                          <MdLocationOn color={Colors.primary} size="20px" />
                        }
                      >
                        Bogor, Indonesia
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: Colors.tertiary }}
                      icon={<MdFacebook size="28px" />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: Colors.tertiary }}
                      icon={<BsGithub size="28px" />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: Colors.tertiary }}
                      icon={<BsDiscord size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <form onSubmit={handleSubmit(onSubmitMessage)}>
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Nama Anda</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <BsPerson color="gray.800" />
                            </InputLeftElement>
                            <Input
                              {...register("name")}
                              focusBorderColor={Colors.secondary}
                              type="text"
                              size="md"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Email Anda</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement pointerEvents="none">
                              <MdOutlineEmail color="gray.800" />
                            </InputLeftElement>
                            <Input
                              {...register("email")}
                              focusBorderColor={Colors.secondary}
                              type="text"
                              size="md"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Pesan</FormLabel>
                          <Textarea
                            {...register("message")}
                            focusBorderColor={Colors.secondary}
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: "gray.300",
                            }}
                            placeholder="Ketik Pesan Disini"
                          />
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            type="submit"
                            variant="solid"
                            bg={Colors.secondary}
                            color="white"
                            _hover={{}}
                          >
                            {isLoading ? <Spinner /> : "Kirim Pesan"}
                          </Button>
                        </FormControl>
                      </VStack>
                    </form>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
