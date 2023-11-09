import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  VStack,
  Image,
  Progress,
  Spinner,
  Stack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Colors } from "../ColorScheme";
import { useMutation } from "@tanstack/react-query";
import { ProductType } from "@/types/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUploadImage } from "@/hooks/uploadImage";

const schema = yup.object({
  title: yup.string().required("Isi Judul!"),
  description: yup.string().required("Isi Deskripsi!"),
  price: yup.number().required("Isi Harga!"),
  stock: yup.number().required("Isi Stock!"),
  category: yup.string().required("Isi Kategori!"),
  images: yup.array(),
});

const UploadProduct = () => {
  const { imageUrl, progressImg, handleFile, setImageUrl, setProgressImg } =
    useUploadImage("products");
  const [imageArray, setImageArray] = useState<Array<string>>([]);
  const [disableUpload, setDisableUPload] = useState<boolean>(false);
  const toast = useToast();

  const addImageToArray = (newImage: string) => {
    setImageArray([...imageArray, newImage]);
  };

  useEffect(() => {
    if (imageUrl) {
      addImageToArray(imageUrl);
    }
    if (imageArray?.length > 2) {
      setDisableUPload(true);
    }
  }, [imageUrl]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitProduct = (data: any) => {
    Products({
      ...data,
      thumbnail: imageArray[0],
      images: imageArray,
      createdAt: new Date(),
    });
  };

  const { mutate: Products, isLoading } = useMutation({
    mutationFn: async (productData: ProductType) => {
      return await fetch("/api/post/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
    },
    onSuccess: () => {
      reset();
      toast({
        title: "Produk Sudah Terbuat",
        description: "produk sudah ditambahkan ke produk list",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      imageArray.length = 0;
      setDisableUPload(false);
      setImageUrl("");
      setProgressImg(0);
    },
    onError: () => {
      alert("Error");
    },
  });

  return (
    <>
      <Stack w={300}>
        <div
          style={{
            overflow: "hidden",
            width: 250,
            height: 250,
            border: "1px solid gray",
            borderRadius: 10,
            margin: "0 auto",
          }}
        >
          <Image
            src={imageUrl ? imageUrl : "/camera.png"}
            w="full"
            h="full"
            objectFit={"cover"}
          />
        </div>
        <Input
          disabled={disableUpload}
          border={"none"}
          type="file"
          onChange={handleFile}
        />
        <Flex flexWrap={"wrap"} gap={{ base: 2, lg: 5 }}>
          {imageArray?.map((img) => (
            <div>
              <Image
                {...register("images")}
                src={img}
                key={img}
                w={70}
                h={70}
                objectFit={"cover"}
              />
            </div>
          ))}
        </Flex>
      </Stack>

      <div
        style={{
          width: "50%",
          margin: "30px 0",
        }}
      >
        <Progress value={progressImg} />
      </div>
      <form onSubmit={handleSubmit(submitProduct)}>
        <VStack spacing={5}>
          <Input
            focusBorderColor={Colors.secondary}
            {...register("title")}
            placeholder="Product title"
          />
          <Input
            focusBorderColor={Colors.secondary}
            {...register("category")}
            placeholder="Kategori"
          />
          <Input
            focusBorderColor={Colors.secondary}
            type="number"
            {...register("stock")}
            placeholder="Stock"
          />
          <Input
            focusBorderColor={Colors.secondary}
            type="number"
            {...register("price")}
            placeholder="Price"
          />
          <Input
            focusBorderColor={Colors.secondary}
            {...register("description")}
            placeholder="Description"
          />
          <Button
            type="submit"
            bg={Colors.primary}
            color="white"
            _hover={{ bg: Colors.hoverPrimary }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default UploadProduct;
