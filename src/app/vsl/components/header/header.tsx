'use client'

import Image from "next/image";

import { Box } from '@chakra-ui/react'

import Logo from '../../../images/logo.jpeg'

export function Header() {
  return (
    <Box as='header' bgColor={'black'} height={65} padding={8} w='100%' p={4} borderBottom='1px solid #2d3740' display='flex' justifyContent='center' alignItems='center'>
      <Image alt='logo' src={Logo} height={16} />
    </Box>
  )
}