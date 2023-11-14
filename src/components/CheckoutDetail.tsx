import { Flex, Image, Text } from "@chakra-ui/react";

type ProductType = {
  title: string;
  size: string;
  subtotal: number;
  image: string;
};

interface CheckoutDetailProps {
  productdata?: ProductType;
  isLoading?: boolean;
}

const CheckoutDetail: React.FC<CheckoutDetailProps> = ({ productdata }) => {
  console.log(productdata);

  return (
    <div>
      <Flex gap={2}>
        <Image src={productdata?.image} w={100} h={100} />
        <Text>{productdata?.title}</Text>
      </Flex>
    </div>
  );
};

export default CheckoutDetail;
