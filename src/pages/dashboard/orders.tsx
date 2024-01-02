import { Colors } from "@/components/ColorScheme"
import SidebarWithHeader from "@/components/Dashboard/SidebarWithHeader"
import { OrdersType } from "@/types/types"
import { db } from "@/utils/firebase"
import { Box, Flex, Text, Heading, Image, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/react"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import React, { useEffect, useRef, useState } from "react"
import { FaMapMarkerAlt } from "react-icons/fa"


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
  }, [ordersData])

  const updatePayment = async (id: string) => {
    const confirmUpdate = confirm("Yakin AKan Mengupdate Status Ini?")
    if (confirmUpdate) {
      const res = await updateDoc(doc(db, 'orders', id), {
        status: true,
      })
      console.log(res);
    }
  }


  return (
    <SidebarWithHeader>
      <Flex direction={'column'} gap={4}>
        {ordersData.map((order) => (
          <Box py={5} px={{ base: 2, lg: 7 }} bg={"white"} rounded={"lg"}>
            <Flex gap={5}>
              <Image src={order.image} w={{ base: '80px', lg: 100 }} objectFit={'contain'} />
              <div>
                <Heading size={'md'}>{order.title}</Heading>
                <Text fontWeight={'bold'}>Rp. {order.price?.toLocaleString('id')}</Text>
                <Text>Jumlah: <span style={{ fontWeight: 'bold' }}>{order.quantity}</span></Text>
                <Text>Ukuran: <span style={{ fontWeight: 'bold' }}>{order.size}</span></Text>
                <Text>Nama Akun: <span style={{ fontWeight: 'bold' }}>{order.accountName}</span></Text>
                <Text>Waktu Pemesanan: <span style={{ fontWeight: 'bold' }}>{order.timestamp}</span></Text>
                <Flex gap={3}>
                  <Text>Metode Pembayaran: <span style={{ fontWeight: 'bold' }}>{order.payment}</span></Text>
                  <Text>Nama Rekening: <span style={{ fontWeight: 'bold' }}>{order.userRekening}</span></Text>
                </Flex>
                <Box mt={4}>
                  <AddressModal payment={order.payment} userRekening={order.userRekening} accountName={order.accountName} address={order.address} email={order.email} name={order.name} phone={order.phone} />
                </Box>
              </div>
            </Flex>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={3} w={'full'} mt={5} justify={'space-between'}>
              <Heading fontSize={{ base: 16 }}>STATUS: {!order.status ? "MENUNGGU PEMBAYARAN" : "PENGIRIMAN"}</Heading>
              <Button isDisabled={order.status} onClick={() => updatePayment(order.id as string)} bg={!order.status ? Colors.hoverPrimary : Colors.secondary} color={'white'} disabled={order.status} _hover={{ opacity: '70%' }}>{!order.status ? "Konfirmasi Pembayaran" : "Sudah Di Bayar"}</Button>
            </Flex>
          </Box>
        ))}
      </Flex>
    </SidebarWithHeader>
  )
}

export default OrdersPage;

const AddressModal: React.FC<OrdersType> = ({ accountName, address, email, name, phone, payment, userRekening }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Button size={'sm'} display={'flex'} alignItems={'center'} gap={2} onClick={onOpen}>
        <p>Alamat</p>
        <div>
          <FaMapMarkerAlt />
        </div>
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
          <ModalHeader>Alamat {accountName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div>
              <Heading mb={4} size={'md'}>Nama Penerima: <span style={{ fontWeight: 'bold' }}>{name}</span></Heading>
              <Text>No Telpon: <span style={{ fontWeight: 'bold' }}>{phone}</span></Text>
              <Text>Email: <span style={{ fontWeight: 'bold' }}>{email}</span></Text>
              <Text>Alamat Lengkap: <span style={{ fontWeight: 'bold' }}>{address}</span></Text>
              <Flex gap={3} mt={5}>
                <Text>Metode Pembayaran: <span style={{ fontWeight: 'bold' }}>{payment}</span></Text>
                <Text>Nama Rekening: <span style={{ fontWeight: 'bold' }}>{userRekening}</span></Text>
              </Flex>
            </div>
            <Flex justify={'end'} mt={10}>
              <Button>Cetak PDF</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal></>
  )
}