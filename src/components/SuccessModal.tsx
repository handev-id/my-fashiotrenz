import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Colors } from "./ColorScheme";
import { CheckIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface SuccessModalProps {
  onOpen?: any;
  redirect?: string;
}

export function SuccessModal({ onOpen, redirect }: SuccessModalProps) {
  const { onClose } = useDisclosure();
  const { push } = useRouter();

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={onOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={30}>
          <ModalBody>
            <Center flexDirection={"column"} my={10}>
              <CheckIcon
                bg={Colors.secondary}
                color={"white"}
                fontSize={70}
                rounded={"full"}
                p={2}
              />
              <Heading size={"lg"} mt={3}>
                Berhasil!
              </Heading>
              <p>Pesanan Berhasil Dibuat</p>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => push(`${redirect}`)}
              mx={"auto"}
              size={"lg"}
              bg={Colors.secondary}
              color={"white"}
              _hover={{ bg: Colors.primary }}
            >
              Oke
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
