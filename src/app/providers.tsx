'use client';

import { ChakraProvider, DarkMode } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        {children}
      </DarkMode>
    </ChakraProvider>
  );
}