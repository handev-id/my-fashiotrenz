import SidebarWithHeader from "@/components/Dashboard/SidebarWithHeader";
import { Colors } from "@/components/ColorScheme";
import { Box } from "@chakra-ui/react";
import UploadProduct from "@/components/Dashboard/CreateProduct";

const UploadPage = () => {
  return (
    <SidebarWithHeader>
      <Box bg={Colors.fivethirty} p={5} shadow={"lg"}>
        <UploadProduct />
      </Box>
    </SidebarWithHeader>
  );
};

export default UploadPage;
