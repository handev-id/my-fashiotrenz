import { Colors } from "@/components/ColorScheme"
import SidebarWithHeader from "@/components/Dashboard/SidebarWithHeader"
import { OrdersType } from "@/types/types"
import { db } from "@/utils/firebase"
import { Box, Flex, Text, Heading, Image, Button } from "@chakra-ui/react"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

const OrdersPage = () => {
  const [ordersData, setOrdersData] = useState<OrdersType[]>([])

  const getOrdersData = async () => {
    const getData = await getDocs(collection(db, 'orders'))
    const orders: any = getData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setOrdersData(orders)
    return orders;
  }
  useEffect(() => {
    getOrdersData();
  }, [])

  return (
    <SidebarWithHeader>
      <Flex direction={'column'} gap={4}>
        {ordersData.map((order) => (
          <Box py={5} px={{ base: 2, lg: 7 }} bg={"white"} rounded={"lg"}>
            <Flex gap={5}>
              <Image src={order.image} w={{ base: 100, lg: 100 }} objectFit={'contain'} />
              <div>
                <Heading size={'md'}>{order.title}</Heading>
                <Text fontWeight={'bold'}>Rp. {order.price}</Text>
                <Text>Jumlah: <span style={{ fontWeight: 'bold' }}>{order.quantity}</span></Text>
                <Text>Ukuran: <span style={{ fontWeight: 'bold' }}>{order.size}</span></Text>
                <Text>Nama Akun: <span style={{ fontWeight: 'bold' }}>{order.accountName}</span></Text>
                <Text>Waktu Pemesanan: <span style={{ fontWeight: 'bold' }}>{order.timestamp}</span></Text>
              </div>
            </Flex>
            <Flex direction={{ base: 'column', lg: 'row' }} w={'full'} mt={5} justify={'space-between'}>
              <Heading fontSize={22}>STATUS: {!order.status ? "MENUNGGU PEMBAYARAN" : "PACKING"}</Heading>
              <Button bg={Colors.secondary} color={'white'} _hover={{ opacity: '70%' }}>Konfirmasi Pembayaran</Button>
            </Flex>
          </Box>
        ))}
      </Flex>
    </SidebarWithHeader>
  )
}

export default OrdersPage