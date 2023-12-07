import { Colors } from "@/components/ColorScheme";
import SidebarWithHeader from "@/components/Dashboard/SidebarWithHeader";
import Loading from "@/components/LoadingPage";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await fetch("/api/get/dashboard");
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const Today = new Date().toDateString();

  return (
    <SidebarWithHeader>
      <Flex direction={{ base: "column", lg: "row" }} gap={5}>
        <InformationBoxs
          data={data?.orders + " Order"}
          title="Total Orderan"
          date={Today}
          percentage={`Kenaikan +${data?.orders * 1.4}%`}
        />
        <InformationBoxs
          data={data?.products + " Produk"}
          title="Total Produk"
          date={Today}
          percentage={`Sold out +${data?.products - data?.orders}`}
        />
        <InformationBoxs
          data={data?.users + " User"}
          title="Total User"
          date={Today}
          percentage={`Kenaikan User +${data?.users * 1.2}%`}
        />
      </Flex>
      <Box w={"full"} bg={"white"} mt={6} p={5}>
        <Flex gap={18} align={"end"}>
          <Chart data={data?.traffic?.thisMonth * 2} date={"Bulan Ini"} />
          <Chart data={data?.traffic?.thisWeek * 2} date={"Minggu Ini"} />
          <Chart data={data?.traffic?.today * 2} date={"Hari Ini"} />
        </Flex>
      </Box>
    </SidebarWithHeader>
  );
};

export default DashboardPage;

interface BoxProps {
  title?: string;
  date?: string;
  data?: string;
  percentage?: string;
}

const InformationBoxs: React.FC<BoxProps> = ({
  title,
  date,
  data,
  percentage,
}) => {
  return (
    <Box py={5} px={{ base: 2, lg: 7 }} bg={"white"} rounded={"lg"}>
      <div>
        <Flex justify={"space-between"} gap={12}>
          <Text fontWeight={"bold"} opacity={"70%"}>
            {title}
          </Text>
          <Text fontSize={"sm"} fontWeight={"bold"} opacity={"70%"}>
            {date}
          </Text>
        </Flex>
        <div style={{ marginTop: 10 }}>
          <Heading opacity={"80%"}>{data}</Heading>
          <Text fontWeight={"bold"} opacity={"70%"} color={Colors.secondary}>
            {percentage}
          </Text>
        </div>
      </div>
    </Box>
  );
};

const Chart = ({ data, date }: any) => {
  return (
    <div>
      <Box
        w={{ base: "20px", lg: "50px" }}
        bg={Colors.secondary}
        h={data}
      ></Box>
      <p style={{ fontWeight: "bold", opacity: "70%" }}>{date}</p>
    </div>
  );
};
