import { Box, Flex, Heading, VStack } from "@chakra-ui/react"
import { Colors } from "./ColorScheme"

const Header = () => {
  return (
    <Flex bg={Colors.hoverPrimary} color="white" p={5}>
        <VStack>
            <Box>
                <Heading fontSize={20}>HanStore</Heading>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, molestias?</p>
            </Box>
        </VStack>
    </Flex>
  )
}

export default Header