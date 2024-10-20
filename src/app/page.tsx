'use client'

import { useCallback, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { YouTubeEvent, YouTubePlayer } from 'react-youtube'

import {
  Header,
  HeroSection,
  ClientsCarrousel,
  SuccessCases,
  ProgramInfo,
  AskedQuestions,
  Footer,
  LeadForm
} from './vsl/components'

export default function VSL() {
  const [isOpen, setIsOpen] = useState(false)
  const playerRef = useRef<YouTubePlayer>(null)
  const currentTime = playerRef?.current?.getCurrentTime()

  const onPlayerReady = useCallback((event: YouTubeEvent<any>) => {
    playerRef.current = event.target
  }, [])

  const onOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [setIsOpen])

  return (
    <>
      <Header />
      <Box
        as='main'
        display='flex'
        alignItems='center'
        flexDirection='column'
      >
        <HeroSection onOpen={onOpen} onPlayerReady={onPlayerReady} />
        <ClientsCarrousel />
        <SuccessCases onOpen={onOpen} />
        <ProgramInfo />
        <AskedQuestions onOpen={onOpen} />
      </Box>
      <LeadForm isOpen={isOpen} onClose={() => setIsOpen(false)} videoWatchTime={currentTime} />
      <Footer />
    </>
  )
}