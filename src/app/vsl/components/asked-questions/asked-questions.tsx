import { FC, useCallback, useState } from 'react'

import { Box, Button, Collapse, Heading } from '@chakra-ui/react'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const askedQuestions = [
  {
    title: '¿Qué tecnologías enseñamos?',
    description: 'En Devlive, enseñamos tecnologías modernas y altamente demandadas en la industria del desarrollo de software, como JavaScript, TypeScript, React, Node.js, NestJS y PostgreSQL. Nos enfocamos en JavaScript porque es el único lenguaje que permite desarrollar tanto en el frontend como en el backend, lo que facilita a los desarrolladores crear aplicaciones completas (full-stack) sin cambiar de contexto entre diferentes lenguajes. Esto acelera el proceso de aprendizaje y promueve un flujo de trabajo más eficiente.'
  },
  {
    title: '¿Cuánto es el costo del programa?',
    description: 'El costo del programa en Devlive varía entre $1000 y $3000 USD, dependiendo del nivel de personalización que cada estudiante desee. Este precio también incluye un año completo de soporte, lo que asegura que los estudiantes puedan continuar recibiendo orientación y asistencia a lo largo de su proceso de aprendizaje. Además, el costo puede ajustarse con el tiempo, por lo que recomendamos consultar el precio exacto con nuestro equipo. Normalmente, esta información se confirma durante la llamada de estrategia, donde evaluamos las necesidades y objetivos del estudiante para ofrecer el mejor valor posible.'
  },
  {
    title: '¿Cuánto tiempo necesito dedicarle?',
    description: 'Idealmente, recomendamos dedicarle al programa unas 2 horas diarias. Este enfoque promueve la constancia por encima de la intensidad, lo que te permitirá avanzar de manera sostenida y completar el proceso dentro del año de soporte. Sin embargo, hemos tenido casos de estudiantes más dedicados o con mayor facilidad para aprender, quienes han logrado completar el programa en menos tiempo, incluso en tan solo 8 meses. Además, si por algún motivo necesitas pausar el programa, hemos ayudado a estudiantes en situaciones similares, reponiéndoles el tiempo adecuado según lo acordado. Para aplicar estos ajustes, es necesario que hables con nuestro equipo para establecer los detalles y asegurarte de que el proceso continúe sin inconvenientes.'
  },
  {
    title: '¿Cómo me aseguran un trabajo?',
    description: 'En Devlive, contamos con una amplia red de contactos que nos permite conectar a nuestros estudiantes con oportunidades laborales. Además, trabajamos en pulir tu currículum y perfil profesional para que puedas aplicar estratégicamente a puestos en LinkedIn y otras plataformas. En el peor de los casos, si no logras una colocación inmediata, te conectaremos con un proyecto que te permita recuperar al menos una parte de la inversión, haciendo que tu aprendizaje sea prácticamente gratuito. Esto refuerza nuestro compromiso de obtener grandes resultados, algo que priorizamos para destacar como academia y apoyar a nuestros estudiantes en su éxito profesional.'
  },
  {
    title: '¿Necesito saber inglés para aplicar?',
    description: 'Sí, es recomendable contar con un nivel intermedio de inglés, especialmente en comprensión lectora y auditiva, ya que son fundamentales para el desarrollo del programa. Aunque la habilidad de hablar en inglés no es imprescindible, nuestro programa también te ayudará a mejorar en ese ámbito de manera progresiva.'
  }
]


interface AskedQuestionsProps {
  onOpen: () => void
}

export const AskedQuestions: FC<AskedQuestionsProps> = ({ onOpen }) => {
  const [opens, setOpens] = useState<boolean[]>(Array(askedQuestions.length).fill(false))

  const onToggle = useCallback((i: number) => () => {
    setOpens((opens) => {
      const newOpens = [...opens]
      newOpens[i] = !newOpens[i]
      return newOpens
    })
  }, [setOpens])

  return (
    <Box width={'100%'} p={4} bgImage={'radial-gradient(at center center, #111 0%, #0a0a0a 69%);'}>
      <Heading textAlign={'center'} as='h2' size='lg' mt={4} mb={4} color='white'>
        PREGUNTAS FRECUENTES
      </Heading>
      <Box display={'flex'} alignItems='center' flexDir={'column'}>
        <Box margin='0 auto' maxWidth={1000} width='100%'>
          {askedQuestions.map(({ title, description }, i) => {
            const isOpen = opens[i]
            const Icon = !isOpen ? AddIcon : MinusIcon

            return (
              <Box key={`fqa-${i}`} mb={4} borderRadius={8} bgImage={'linear-gradient(283deg, #FFFFFF1A 0%, #FFFFFF12 100%);'} border={'1px solid #2d3740'}>
                <Box display={'flex'} alignItems='center' p={4} onClick={onToggle(i)}>
                  {<Icon mr={4} w={4} h={4} color={isOpen ? '#03989e' : 'white'} />}
                  <Heading textAlign={'center'} as='h4' size='sm' color={isOpen ? '#03989e' : 'white'}>
                    {title}
                  </Heading>
                </Box>
                <Collapse in={opens[i]} animateOpacity>
                  <Box p={4} color={'#c7c7c7'} border={'1px solid #2d3740;'} borderBottomRadius={8} bgImage={'radial-gradient(at center center, #111 0%, #0a0a0a 69%);'}>
                    {description}
                  </Box>
                </Collapse>
              </Box>
            )
          })}
        </Box>
        <Button mt={8} mb={8} size={'lg'} bgColor={'#479ea5'} border='1px solid #8ff0f6' boxShadow='0px 0px 10px 0px #479ea5;' onClick={onOpen}>¡APLICAR AL PROGRAMA AHORA!</Button>
      </Box>
    </Box>
  )
}