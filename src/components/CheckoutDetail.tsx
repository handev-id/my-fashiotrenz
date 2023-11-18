import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Colors } from "./ColorScheme";

type ProductType = {
  title: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
  thumbnail: string;
};

interface CheckoutDetailProps {
  productdata?: ProductType;
  isLoading?: boolean;
}

const CheckoutDetail: React.FC<CheckoutDetailProps> = ({ productdata }) => {
  const { query }: any = useRouter();

  const quantity = parseInt(query?.qty);
  const subTotal = (productdata?.price || 0) * (quantity || 0);

  return (
    <div>
      <Flex gap={2}>
        <Image
          objectFit={"contain"}
          src={productdata?.thumbnail}
          w={100}
          h={100}
        />
        <div>
          <Text fontWeight={"semibold"}>{productdata?.title}</Text>
          <Flex gap={2}>
            <Text>{quantity}x</Text>
            <Text fontWeight={"bold"}>Ukuran: {query?.sz}</Text>
          </Flex>
          <Text>Rp.{productdata?.price.toLocaleString("id-ID")}</Text>
        </div>
      </Flex>
      <Heading size="md" mt={8}>
        Subtotal: Rp.{subTotal.toLocaleString("id-ID")}
      </Heading>
    </div>
  );
};

export default CheckoutDetail;
