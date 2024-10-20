import { Box, Text } from '@chakra-ui/react'

import Image from "next/image";

import Logo from '../../../images/logo.jpeg'

export const Footer = () => {
  return (
    <Box as='footer' p={8} bgColor='black' borderTop='1px solid #2d3740;' display={'flex'} flexDirection='column' alignItems='center' textAlign={'center'}>
      <Image alt='mini-logo' src={Logo} height={8} />
      <Text color='#686868' mt={2} fontSize='12'>© All rights reserved.</Text>
    </Box>
  )
}