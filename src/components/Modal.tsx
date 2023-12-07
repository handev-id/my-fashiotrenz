import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Colors } from "./ColorScheme";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ProductType } from "@/types/types";

export function ModalSearch() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useProducts();
  const { push } = useRouter();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { register, handleSubmit, reset, watch } = useForm();
  const keyword = watch("search");

  let filteredProducts = data?.products?.filter(
    (product: ProductType) =>
      product.title.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
  );

  if (keyword == "") {
    filteredProducts = [];
  }

  const onSearch = (data: any) => {
    if (keyword == "" || keyword?.trim().length === 0) {
      return null;
    } else {
      onClose();
      push(`/products/search?q=${data.search}`);
      reset();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <BsSearch size={24} />
      </Button>

      <Modal
        size={"xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cari Produk</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSearch)}>
              <Flex gap={3}>
                <Input
                  {...register("search")}
                  focusBorderColor={Colors.secondary}
                  placeholder="Jacket pria"
                  required
                />
                <Button type="submit">
                  <BsSearch size={24} />
                </Button>
              </Flex>
            </form>

            <Stack w={"full"} mt={6}>
              {filteredProducts?.map((product: ProductType) => (
                <Link
                  key={product.id}
                  onClick={onClose}
                  href={`/products/search?q=${product.category}`}
                  style={{ fontWeight: 700 }}
                >
                  <Box
                    key={product.id}
                    rounded={"lg"}
                    bg={Colors.fourthirty}
                    p={3}
                    cursor={"pointer"}
                    _hover={{ color: "white", bg: Colors.secondary }}
                  >
                    <Text opacity={"90%"}>{product.category}</Text>
                    {product.title.substring(0, 20)}
                  </Box>
                </Link>
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
