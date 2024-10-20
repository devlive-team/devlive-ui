import { Box, Heading, Image, Text } from "@chakra-ui/react"

import VideoCall from '../../../images/program/video-call.png'
import Trophy from '../../../images/program/trophy.png'
import Community from '../../../images/program/community.png'
import CodeReview from '../../../images/program/code-review.png'
import Interview from '../../../images/program/interview.png'
import RoadMap from '../../../images/program/roadmap.png'
import Star from '../../../images/program/star.png'
import Chat from '../../../images/program/chat.png'

const features = [
  {
    icon: VideoCall.src,
    title: '5 llamadas semanales con Anthony Soto',
    description: 'Atención de dudas y retroalimentación entre un grupo de 5-10 estudiantes.'
  },
  {
    icon: RoadMap.src,
    title: 'Programa paso a paso hacia full-stack developer',
    description: 'Acceso a +150 episodios sobre programación con ejercicios explicados.'
  },
  {
    icon: Chat.src,
    title: 'Chat privado de WhatsApp con Anthony Soto',
    description: 'Comunicación personal y prioritaria por Whatsapp y Discord.'
  },
  {
    icon: CodeReview.src,
    title: 'Revisiones de código a tareas del programa',
    description: 'Revisión exclusiva y personalizada de tareas a través de GitHub.'
  },
  {
    icon: Interview.src,
    title: 'Entrevistas para evaluar progresos y habilidades',
    description: 'Hay entre 3-5 entrevistas a lo largo del año de entrenamiento.'
  },
  {
    icon: Trophy.src,
    title: 'Realización de proyecto portafolio',
    description: 'Acompañamiento y asesoría personalizada para crear un proyecto desde 0.'
  },
  {
    icon: Star.src,
    title: 'Posicionamiento en proyecto o puesto laboral',
    description: 'Garantía para conseguir como mínimo un proyecto que recupere parte de la inversión.'
  },
  {
    icon: Community.src,
    title: 'Acceso a comunidad privada de profesionales',
    description: 'Formar parte de un grupo de profesional donde se dan acompañamiento mutuo.'
  },
]

export const ProgramInfo = () => {

  return (
    <Box bg='black' width='100%' p={4} textAlign='center' borderTop='1px solid #2d3740' borderBottom='1px solid #2d3740'>
      <Text textAlign={'center'} display={'inline-block'} mb={4} mt={2} color='white' p='8px 32px' border='1px solid #2d3740' borderRadius={8} bg="linear-gradient(-45deg,#272a2c 0%,#050505 100%)">
        TODO LO QUE VAS A OBTENER
      </Text>
      <Heading textAlign={'center'} as='h2' size='lg' mb={2} color='white'>
        ENTREGABLES DE
      </Heading>
      <Heading mb={4} textAlign={'center'} as='h2' size='lg' color='white'>
        LA ACADEMIA
      </Heading>
      <Box display={'flex'} alignItems='center' flexDir={'column'}>
        <Box maxWidth={1000}>
          {features.map(({ icon, title, description }, i) => (
            <Box width={'100%'} mb={8} p={4} display={'flex'} flexDirection='column' alignItems={'center'} key={`program-feature-${i}`} border='1px solid #2d3740' borderRadius={8} textAlign='center' bgImage={'linear-gradient(15deg,#0c0b0b 45%,#233E476B 100%)'}>
              <Image alt={`program-icon-${i}`} src={icon} width={20} height={20} />
              <Heading textAlign={'center'} as='h2' size='lg' mb={2} color='white'>
                {title}
              </Heading>
              <Text textAlign={'center'} display={'inline-block'} color='#c7c7c7'>
                {description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}