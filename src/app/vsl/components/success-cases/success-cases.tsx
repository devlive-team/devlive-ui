import { FC, useCallback, useState } from 'react'

import Image from 'next/image'

import { Box, Button, Heading, Text, Image as Img } from "@chakra-ui/react"

import Ivan from '../../../images/success-cases/ivan.png'
import Isaac from '../../../images/success-cases/isaac.png'
import Alvaro from '../../../images/success-cases/alvaro.png'
import OnvoBanner from '../../../images/success-cases/onvo-banner.webp'
import OnvoIcon from '../../../images/success-cases/onvo-icon.webp'
import WindRiverBanner from '../../../images/success-cases/windriver-banner.webp'
import WindRiverIcon from '../../../images/success-cases/windriver-icon.webp'
import RocCapitalBanner from '../../../images/success-cases/roccapital-banner.jpg'
import RocCapitalIcon from '../../../images/success-cases/roccapital-icon.webp'

// badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479

const students = [
  {
    name: 'Iván Cortez',
    thumbnail: Ivan.src,
    video: 'https://player.vimeo.com/video/1021923975',
    heading: {
      text1: 'PASÓ DE SALIRSE DE LA UNIVERSIDAD A ESTAR GANANDO ',
      underlined: '+$2,000 USD/MES',
      text2: ''
    },
    description: 'Ahora trabaja como junior developer en ONVO-PAY de forma totalmente remota',
    company: {
      icon: OnvoIcon,
      banner: OnvoBanner,
      website: 'https://onvopay.com/',
      title: 'ONVO | Infraestructura para Cobros Digitales',
      description: '¿Recibir pagos en línea? ONVO Pay es la solución simple, segura y escalable para aceptar pagos en línea. Vos elegís cómo cobrar y cuándo querés recibir tu dinero.'
    }
  },
  {
    name: 'Isaac Touma',
    thumbnail: Isaac.src,
    video: 'https://player.vimeo.com/video/1021923213',
    heading: {
      text1: 'PRIMER TRABAJO COMO JUNIOR DE',
      underlined: '+$3,000 USD/MES',
      text2: ' SIN EXPERIENCIA PREVIA'
    },
    description: 'Al poco tiempo fue ascendido a Senior por su alto impacto en el proyecto WindRiver',
    company: {
      icon: WindRiverIcon,
      banner: WindRiverBanner,
      website: 'https://windriver.com/',
      title: 'Wind River | Revolutionizing the Automotive Industry',
      description: 'Wind River, a global leader of software for the intelligent edge, is accelerating digital transformation of mission-critical intelligent systems.'
    }
  },
  {
    name: 'Alvaro Delgado',
    thumbnail: Alvaro.src,
    video: 'https://player.vimeo.com/video/1021593602',
    heading: {
      text1: 'COLOCACIÓN POR ',
      underlined: '+$5,000 USD/MES ',
      text2: 'EN UN PUESTO REMOTO A ESTADOS UNIDOS'
    },
    description: 'Desde entonces solo ha seguido creciendo y ahora tiene otros clientes en USA',
    company: {
      icon: RocCapitalIcon,
      banner: RocCapitalBanner,
      website: 'https://roccapital.com/',
      title: 'Roc Capital | Grow Your Lending Business',
      description: 'Capital Provider for Private Lenders Built for growing your private lending business: &nbsp White Label Table FundingFull Back Office SupportTechnology SuiteConcierge Service360 Experience I am a Private Lender I am an Originator Real Estate and Investor Loans. Fix and Flip, Ground Up Construction, Single and Portfolio Rentals.'
    }
  }
]

interface SuccessCasesProps {
  onOpen: () => void
}

export const SuccessCases: FC<SuccessCasesProps> = ({ onOpen }) => {
  const [showVideo, setShowVideo] = useState<boolean[]>(Array(students.length).fill(false))

  const onShowVideo = useCallback((i: number) => () => {
    setShowVideo((showVideo) => {
      const newShowVideo = [...showVideo]
      newShowVideo[i] = true
      return newShowVideo
    })
  }, [setShowVideo])

  return (
    <Box w='100%' bg='#111' p={4} textAlign={'center'}>
      <Text textAlign={'center'} display={'inline-block'} mb={4} mt={2} color='white' p='8px 32px' border='1px solid #2d3740' borderRadius={8} bg="linear-gradient(-45deg,#272a2c 0%,#050505 100%)">
        CASOS DE ÉXITO
      </Text>
      <Heading mb={4} as='h2' size='lg' color='white'>
        <Box as='span' boxShadow='inset 0 -.5em #03989e'>
          RESULTADOS
        </Box> DE NUESTROS ESTUDIANTES
      </Heading>
      <Box display={'flex'} alignItems='center' flexDir={'column'}>
        <Box maxWidth='100vw' p={4} boxSizing='border-box'>
          {students.map(({ thumbnail, video, name, heading, description, company }, i) => (
            <Box maxWidth={500} boxSizing='border-box' key={`success-case-${i}`} border='1px solid #2d3740' borderRadius={8} textAlign='center' bgImage={'linear-gradient(32deg, #0c0b0b 43%, #233e47 100%);'} mb={8}>
              <Box borderRadius={8}>
                <Box display={'flex'} justifyContent='center' >
                  {
                    showVideo[i] 
                    ? 
                      <iframe style={{ borderTopRightRadius: 8, borderTopLeftRadius: 8 }} width={500} height={280} src={video + '?title=0&amp;byline=0&amp;portrait=0&amp;'} allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="Álvaro Delgado"></iframe>
                    : <Img alt={`success-case-${i}`} src={thumbnail} borderTopRadius={8} onClick={onShowVideo(i)} />
                  }
                </Box>
                <Box bgImage={`linear-gradient(180deg, #0c0b0b 0%, #F2295B00 0%)`} p={4}>
                  <Heading as='h5' size='lg' color='#c7c7c7'>{name}</Heading>
                  <Heading as='h2' mt={2} size='lg' mb={2} color='white'>
                    {heading.text1}
                    <Box as='span' ml={1} boxShadow='inset 0 -.5em #03989e'>
                      {heading.underlined}
                    </Box>
                    {heading.text2}
                  </Heading>
                  <Text color={'#c7c7c7'} mb={4}>{description}</Text>
                  <Box maxWidth={'100%'} textAlign={'left'} display={'flex'} h={108} border='1px solid #2d3740' borderRadius={8}>
                    <Box width={'60%'} p={4}>
                      <Text color='white' fontSize={14} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' marginBottom={2}>{company.title}</Text>
                      <Text color='rgba(255, 255, 255, 0.443)' fontSize={14} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' marginBottom={2}>{company.description}</Text>
                      <Box display={'flex'} alignItems='center'>
                        <Image alt={`company-icon-${i}`} src={company.icon} style={{ width: 16, height: 16 }} />
                        <Text color={'white'} fontSize={12} ml={2}>{company.website}</Text>
                      </Box>
                    </Box>
                    <Image alt={`company-banner-${i}`} src={company.banner} style={{ minWidth: 80, borderTopRightRadius: 8, borderBottomRightRadius: 8 }} />
                  </Box>
                  </Box>

              </Box>
            </Box>
          ))}
        </Box>
        <Button mb={4} size={'lg'} bgColor={'#479ea5'} border='1px solid #8ff0f6' boxShadow='0px 0px 10px 0px #479ea5;' onClick={onOpen}>¡QUIERO APLICAR AL PROGRAMA!</Button>
      </Box>
    </Box>
  )
}