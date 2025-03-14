import { FC } from 'react'

import Image from 'next/image'

import { YouTubeEvent } from 'react-youtube'

import { Box, Button, Heading, Text } from "@chakra-ui/react"

import VideoThumbnail from '../../../images/vsl.jpeg'

interface HeroSectionProps {
  onOpen: () => void
  onPlayerReady: (event: YouTubeEvent) => void
}

export const HeroSection: FC<HeroSectionProps> = ({ onOpen }) => {
  return (
    <Box
      backgroundPosition='top center'
      backgroundRepeat='no-repeat' 
      bgSize='100% 100%'
      bgImage='https://aceleradoragrowing.com/wp-content/uploads/2024/10/background.webp'
      textAlign={'center'}
      padding={4}
      width='100%' 
      display='flex'
      alignItems='center'
      flexDirection='column'
    >
      <Text textAlign={'center'} display={'inline-block'} mb={4} mt={2} color='white' p='8px 32px' border='1px solid #2d3740' borderRadius={8} bg="linear-gradient(-45deg,#24333c 0%,#192024 100%)">
        Para Profesionales de IT, Ingenieros o Estudiantes de Universidad Privada
      </Text>

      <Box textAlign={'center'} mb={4}>
        <Heading as='h2' size='lg' color='white'>DESCUBRE UNA NUEVA PROFESIÓN TECNOLÓGICA</Heading>
        <Heading as='h2' size='lg' color='white'>GANANDO <Box as='span' boxShadow='inset 0 -.5em #03989e'>$2,000 - $5,000 USD/MES</Box> REMOTAMENTE</Heading>
      </Box>

      <Text color='#c7c7c7' textAlign={'center'} mb={8}>
        Sin la necesidad de un título universitario y empezando con poca o nula experiencia previa.
      </Text>
      <Box padding={3} mb={8} bg='whiteAlpha.200' borderRadius={8} border='1px solid #444d55' maxWidth={978}>
        <Box as='section' maxHeight={550} maxWidth={978} overflow="hidden">
          {/* {isVideoVisible 
            ? <YouTube
                videoId={'oMfrL3oQnjk'}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    rel: 0,
                    autoplay: 1
                  },
                }}
                onReady={onPlayerReady}
              /> : */}
            <Image alt='video-thumbnail' src={VideoThumbnail} onClick={onOpen} />
        </Box>
      </Box>
      <Button
        mb={2}
        size={'lg'}
        bgColor={'#03989e'}
        border='1px solid #8ff0f6'
        boxShadow='0px 0px 10px 0px #479ea5;'
        onClick={onOpen}
      >
        ¡QUIERO APLICAR AL PROGRAMA!
      </Button>
    </Box>
  )
}