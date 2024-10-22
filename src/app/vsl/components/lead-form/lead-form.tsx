import { FC, useCallback, useEffect, useState } from 'react'

import Image from 'next/image'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Heading,
  Input,
  Text,
  Box,
  Select
} from '@chakra-ui/react'

import { useFormik } from 'formik'

import { PhoneInput } from 'react-international-phone'

import * as Yup from 'yup'

import { useLeadInfo, useLeadQuestions } from '@/shared/hooks'

import Logo from '../../../images/logo.jpeg'

type QuestionForm = 'english' | 'job' |  'experience' | 'goal' | 'english' | 'salaryGoal' | 'salaryGap' | 'urgency' | 'budget'

interface QuestionFormState {
  english: string;
  job: string;
  experience: string;
  goal: string;
  salaryGoal: string;
  salaryGap: string;
  urgency: string;
  budget: string;
}

interface Question {
  key: QuestionForm;
  question: string;
  answers: { option: string; description: string; value: string }[]
}

interface LeadInfoState {
  name: string
  email: string
  avatar: string
}

const professions = [
  { name: 'SOPORTE TÉCNICO', value: 'd4eb631e49134de59481d2eb8ff4f0e0' },
  { name: 'CALL CENTER', value: '93f22493ca5c486c86c82a965a38bd8e' },
  { name: 'ESTUDIANTE', value: 'a628ee825dc84b6a9419ec52daac1b10' },
  { name: 'ING. SOFTWARE', value: '8186a3fa86324deda7ba8978d266b0e3' },
  { name: 'ING. INDUSTRIAL', value: 'ed29979de8254b0a9946f0b87abfc775' },
  { name: 'ING. ELECTRICA', value: 'fdc7f37d30d1422089bed5bf2a926713' },
  { name: 'ING. CIVIL', value: '538be83e46ae4a4784cf53bbd4bf9c0b' },
  { name: 'CYBERSEGURIDAD', value: '2783e6bb7ed4410e8e20427b40603596' },
  { name: 'SERVICIOS NUBE', value: '55181b305d754729bceb9af95e973115' },
  { name: 'DEVOPS', value: '4ea26c88a68e4e88a58e93ab4392162c' },
  { name: 'REDES TELECOMUNICACIÓN', value: '54a193e6b21f48fbb8539eec963655ce' },
  { name: 'ANALISTA DATOS', value: 'ceea2cecaa0c41099395bdc41b082b19' },
  { name: 'NEGOCIO FAMILIAR', value: 'f171fd008f6f40ca814e448c3a3bc665' },
  { name: 'DISEÑO', value: '931563c2b97649198f51773ae291f6da' },
  { name: 'FINANZAS', value: '64dd29e1c26b49d1af9ad125a625b1c8' },
  { name: 'QA AUTOMATIZACIÓN', value: '52d892adb1a2450fb18f541b8d0c19c8' },
  { name: 'MANAGER', value: 'a7721fa89cdc4aedb8a37d2a90d8a126' },
  { name: 'CONTADURÍA', value: '142e269befc245a09a237f084bf05ef0' },
  { name: 'CHOFER', value: 'f2eb5dd31c1e4e6ab774c171af3aedf1' },
  { name: 'MARKETING', value: 'd912b57702344517a86f2543c96bd747' },
  { name: 'OTRO', value: '125ae9bdb0d5806f8878f177452a0554' },
  { name: 'DESEMPLEADO', value: 'd143f76e57e547aea59f3f82af8b7c41' },
]

const questions: Question[] = [
  {
    key: 'english',
    question: '¿Cuál es tu nivel de inglés?',
    answers: [
      { option: 'NINGUNO', description: 'no entiendo el idioma', value: 'none' },
      { option: 'BÁSICO', description: 'tengo conocimientos básicos', value: 'basic' },
      { option: 'INTERMEDIO', description: 'puedo leer y escuchar bien', value: 'middle' },
      { option: 'AVANZADO', description: 'dominio total del idioma', value: 'advanced' },
    ]
  },
  {
    key: 'job',
    question: '¿Te encuentras actualmente enfocado únicamente en tu trabajo o también estás cursando algún estudio?',
    answers: [
      { option: 'ESTUDIANTE', description: 'solo estudio y no trabajo', value: 'student' },
      { option: 'TRABAJADOR', description: 'Solo estoy trabajando actualmente', value: 'worker' },
      { option: 'AMBOS', description: 'trabajo y estudio en paralelo', value: 'both' },
      { option: 'NINGUNO', description: 'no trabajo ni estudio', value: 'none' },
    ]
  },
  {
    key: 'experience',
    question: '¿Cuál es tu nivel de experiencia en programación?',
    answers: [
      { option: 'NINGUNO', description: 'empiezo desde 0', value: 'none' },
      { option: 'BÁSICO', description: 'se algo, pero muy poco', value: 'basic' },
      { option: 'INTERMEDIO', description: 'ya tengo bases, pero me falta', value: 'middle' },
      { option: 'AVANZADO', description: 'ya he tenido alguna entrevista', value: 'advanced' },
    ]
  },
  {
    key: 'goal',
    question: '¿Cuál es tu objetivo principal al convertirte en desarrollador?',
    answers: [
      { option: 'INGRESOS', description: 'mejorar mi salario', value: 'income' },
      { option: 'FLEXIBILIDAD', description: 'tener un trabajo flexible', value: 'flexibility' },
      { option: 'AMBOS', description: 'mejorar salario y tener trabajo flexible', value: 'both' },
      { option: 'OTRA', description: 'otros motivos', value: 'other' },
    ]
  },
  {
    key: 'salaryGoal',
    question: '¿Cuál es el siguiente paso salarial que te gustaría conseguir en tu trabajo o como desarrollador?',
    answers: [
      { option: '$2000', description: 'entre $1,000 y $2,000 USD', value: '1000-2000' },
      { option: '$3000', description: 'entre $2,000 y $3,000 USD', value: '2000-3000' },
      { option: '$4000', description: 'entre $3,000 y $4,000 USD', value: '3000-4000' },
      { option: '$5000', description: 'más de $4,000 USD', value: '+5000' },
    ]
  },
  {
    key: 'salaryGap',
    question: '¿Qué tan lejos estás de alcanzar esa meta salarial actualmente?',
    answers: [
      { option: 'CERCA', description: 'menos de $500 USD', value: '-500' },
      { option: 'MODERADO', description: 'entre $500 y $1,000 USD', value: '500-1000' },
      { option: 'MITAD', description: 'estoy a mitad de camino', value: 'half-way' },
      { option: 'LEJOS', description: 'más del doble de mi salario', value: 'far-away' },
    ]
  },
  {
    key: 'urgency',
    question: '¿Cuál es tu nivel de interés para ingresar a nuestra academia de software?',
    answers: [
      { option: 'AHORA', description: 'estoy listo para empezar casi de inmediato', value: 'now' },
      { option: 'PRONTO', description: 'entraría en las próximas 2 semanas', value: 'soon' },
      { option: 'DESPUÉS', description: 'iniciaría en 1 mes ó poco más', value: 'later' },
      { option: 'INDEFINIDO', description: 'no tengo prisa, estoy viendo opciones', value: 'unknown' },
    ]
  },
  {
    key: 'budget',
    question: '¿Cuál es tu nivel de disposición para invertir en nuestro programa de alto valor en desarrollo de software?',
    answers: [
      { option: 'COMPLICADA', description: 'menos de $500 USD.', value: '-500' },
      { option: 'CAUTELOSA', description: 'entre $500 y $1,000 USD.', value: '500-1000' },
      { option: 'SERIA', description: 'entre $1,000 y $3,000 USD.', value: '1000-3000' },
      { option: 'DECIDIDA', description: 'más de $3,000 USD.', value: '+3000' },
    ]
  }
]

const LeadFormValidation = Yup.object({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo Eléctronico Invelido').required('Requerido'),
  avatar: Yup.string().oneOf(professions.map(({ value }) => value), 'Requerido').required('Requerido')
})

const ContactFormValidation = Yup.object({
  phone: Yup.string().min(8, 'Requerido'),
})

interface LeadFormProps {
  isOpen: boolean;
  videoWatchTime: number;
  onClose: () => void;
}

export const LeadForm: FC<LeadFormProps> = ({ isOpen, videoWatchTime, onClose }) => {
  const [step, setStep] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answerIndex, setAnswerIndex] = useState(-1)
  const [notionLeadPage, setNotionLeadPage] = useState('')

  const currentUrl = typeof window !== 'undefined' ? window?.location?.search : ''
  const queryParams = new URLSearchParams(currentUrl);
  const ad = queryParams.get('ad')
  const source = queryParams.get('source')

  const { onSaveLead } = useLeadInfo()
  const { isLoading, onSaveQuestions } = useLeadQuestions()

  const [questionForm, setQuestionForm] = useState<QuestionFormState>({
    english: '',
    job: '',
    experience: '',
    goal: '',
    salaryGoal: '',
    salaryGap: '',
    urgency: '',
    budget: ''
  })

  const { key, question, answers } = questions[questionIndex]
  const answer = questionForm[key]
  const isValidApplication = (
    questionForm.english !== 'none' && questionForm.english !== 'basic' &&
    questionForm.urgency !== 'later' && questionForm.urgency !== 'unknown' &&
    questionForm.budget !== '-500'
  )

  const isLeadFormStep = step === 0
  const isContactFormStep = step === 1
  const isQuestionaryStep = step === 2
  const isQuestionaryFormStep = step === 3
  const isThanksStep = step === 4

  const onNextStep = useCallback(() => {
    setStep(step + 1)
  }, [step, setStep])

  const {
    values: leadFormValues,
    touched: leadFormTouched,
    errors: leadFormErrors,
    submitCount: leadFormSubmitCount,
    handleChange,
    handleSubmit: handleLeadFormSubmit
  } = useFormik<LeadInfoState>({
    onSubmit: onNextStep,
    validationSchema: LeadFormValidation,
    initialValues: {
      email: '',
      name: '',
      avatar: ''
    }
  })

  const {
    setFieldValue,
    values: contactFormValues,
    touched: contactFormTouched,
    errors: contactFormErrors,
    submitCount: contactFormSubmitCount,
    handleSubmit: handleContactFormSubmit
  } = useFormik<{ phone: string }>({
    onSubmit: onNextStep,
    validationSchema: ContactFormValidation,
    initialValues: {
      phone: '',
    }
  })

  const handleSubmit = useCallback((formId: number) => () => {
    if (formId === 1) {
      handleLeadFormSubmit()
    } else if (formId === 2) {
      handleContactFormSubmit();
    }
  }, []);

  const onNextQuestion = useCallback(async () => {   
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
      setAnswerIndex(-1)
    } else {
      const nameParam = leadFormValues.name.split(' ').reduce((total, value) => total + '%20' + value)
      
      await onSaveQuestions({
        ...questionForm,
        pageId: notionLeadPage,
        isValidApplication
      })

      if (isValidApplication) {
        window.location.href = `https://calendly.com/devlive-setting/fit-evaluation-vsl/?email=${leadFormValues.email}&name=${nameParam}`;
      } else {
        onNextStep()
      }
    }
    
  }, [step, questionIndex, answerIndex, leadFormValues, questionForm, contactFormValues, isValidApplication, setStep, setQuestionIndex, setAnswerIndex, handleSubmit])

  const onSelectAnswer = useCallback((i: number) => () => {
    setQuestionForm({
      ...questionForm,
      [questions[questionIndex].key]: questions[questionIndex].answers[i].value
    })
    setAnswerIndex(i)
  }, [questionForm, questionIndex, setAnswerIndex, setQuestionForm])

  useEffect(() => {
    if (step === 2) {
      onSaveLead({
        ad,
        source,
        videoWatchTime,
        ...leadFormValues,
        ...contactFormValues
      }).then((id) => {
        setNotionLeadPage(id)
      })
    }
  }, [ad, source, videoWatchTime, step, setNotionLeadPage])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent border='1px solid #2d3740' borderRadius={8} bgImage={'linear-gradient(15deg,#0c0b0b 45%,#233E476B 100%)'}>
        <ModalHeader textAlign={'center'}>
          <Heading mt={2} color='white' size={'md'}>
            {
              isLeadFormStep
                ? 'COMPLETA TU APLICACIÓN'
                : isContactFormStep
                  ? 'MEDIO DE CONTACTO'
                  : isQuestionaryStep
                    ? 'SITUACIÓN ACTUAL'
                    : isThanksStep 
                      ? 'GRACIAS POR APLICAR'
                      : question
            }
          </Heading>
        </ModalHeader>
        <ModalBody>
          {
            isLeadFormStep ?
              <form onSubmit={handleLeadFormSubmit}>
                <Box mb={4}>
                  <Text color={'#C7C7C7'} mb={2}>Nombre Completo</Text>
                  <Input
                    name='name'
                    placeholder=''
                    bgColor={'white'}
                    color='#1a202c'
                    onChange={handleChange}
                    _focusVisible={{ border: '2px solid #479ea5' }}
                    border={leadFormErrors.name && leadFormTouched.name ? '2px solid red !important' : undefined}
                  />
                  <Text color='red'>{leadFormErrors.name && leadFormTouched.name ? leadFormErrors.name : ''}</Text>
                </Box>

                <Box mb={4}>
                  <Text color={'#C7C7C7'} mb={2}>Correo Electrónico</Text>
                  <Input
                    name='email'
                    placeholder=''
                    bgColor={'white'}
                    color='#1a202c'
                    onChange={handleChange}
                    border={leadFormErrors.email && leadFormTouched.email ? '2px solid red' : undefined}
                    _focusVisible={{ border: '2px solid #479ea5' }}
                  />
                  <Text color='red'>{leadFormErrors.email && leadFormTouched.email ? leadFormErrors.email : ''}</Text>
                </Box>
                <Box mb={2}>
                  <Text color={'#C7C7C7'} mb={2}>Profesión / Ocupación</Text>
                  <Select
                    name='avatar'
                    placeholder=' '
                    bgColor={'white'}
                    color='#1a202c'
                    value={leadFormValues.avatar}
                    onChange={handleChange}
                    border={leadFormErrors.avatar && leadFormTouched.avatar ? '2px solid red' : undefined}
                  >
                    {professions.map(({ name, value }, i) => (
                      <option key={`profession-${i}`} value={value}>{name}</option>
                    ))}
                  </Select>
                  <Text color='red'>{leadFormErrors.avatar && leadFormTouched.avatar ? leadFormErrors.avatar : ''}</Text>
                </Box>
              </form>
              : isContactFormStep
                ? <form onSubmit={handleContactFormSubmit} >
                  <Box textAlign={'center'}>
                    <Text mb={4} color='white' fontStyle={'italic'}>
                      Te enviaremos un mensaje para conversar y evaluar si eres un buen fit.
                      También te compartiremos nuestro plan de estudios y asesoramiento
                      previo a la llamada de estrategia (si su aplicación es aceptada).
                    </Text>
                  </Box>
                  <Box mb={2}>
                    <Text color={'#C7C7C7'}>Número de WhatsApp</Text>
                    <PhoneInput
                      defaultCountry={'cr'}
                      onChange={(value) => setFieldValue('phone', value)}
                      style={{ borderRadius: 8, border: contactFormErrors.phone && contactFormTouched.phone ? '2px solid red' : undefined }}
                    />
                    <Text color='red'>{contactFormErrors.phone && contactFormTouched.phone ? contactFormErrors.phone : ''}</Text>
                  </Box>
                </form>
                : isQuestionaryStep
                  ?
                  <>
                    <Text fontFamily={'Poppins, Sans-serif'} width={'100%'} textAlign={'center'} display={'inline-block'} mb={4} mt={2} color='white' p='8px 32px' border='1px solid #2d3740' borderRadius={8} bg="linear-gradient(-45deg,#24333c 0%,#192024 100%)">
                      ⚠️ Todavía no cierres esta página ⚠️
                    </Text>
                    <Text color='white' fontStyle={'italic'} textAlign='center'>
                      Para <Box as='span' fontWeight={'bold'}>revisar tu solicitud</Box>, necesitamos entender mejor tu situación.
                      Por favor, completa estas <Box as='span' fontWeight={'bold'}>{`${questions.length} preguntas`}</Box> para que podamos ayudarte de la mejor manera.
                    </Text>
                  </>
                  : isQuestionaryFormStep
                    ?
                      <>
                        <Box>
                          {answers.map(({ option, description }, i) => (
                            <Box key={`answer-${i}`} display={'flex'} alignItems='center' justifyContent='center' flexDirection={'column'} height='80px' borderRadius={8} bgColor={answerIndex === i ? '#fd6b3a' : '#f2f2f2'} mb={4} padding={4} onClick={onSelectAnswer(i)}>
                              <Heading mt={2} color={answerIndex === i ? 'white' : '#1a202c'} size={'sm'}>{option}</Heading>
                              <Text fontStyle={'italic'} color={answerIndex === i ? 'white' : '#1a202c'}>{description}</Text>
                            </Box>
                          ))}
                        </Box>
                      </>
                    : 
                      <>
                        <Text mb={4} color='white' fontStyle={'italic'} textAlign='center'>
                          Tu solicitud a DEVLIVE está en proceso de revisión por parte de nuestro equipo de reclutamiento.
                          Nos pondremos en contacto contigo lo antes posible.
                          Mientras tanto, agradecemos tu interés y entusiasmo por unirte a nuestra comunidad.
                          ¡Gracias por querer ser parte de esto!
                        </Text>
                      </>
          }
        </ModalBody>

        <ModalFooter display={'flex'} flexDirection='column' alignItems='center'>
          <Button
            mb={8}
            w='100%'
            size={'lg'}
            type='submit'
            bgColor={'#479ea5'}
            border='1px solid #8ff0f6'
            boxShadow='0px 0px 10px 0px #479ea5;'
            onClick={
              isThanksStep ? onClose :
              isLeadFormStep ? handleSubmit(1) :
                isContactFormStep ? handleSubmit(2) :
                isQuestionaryStep ? onNextStep :
                onNextQuestion
            }
            disabled={
              isLoading ||
              ((isLeadFormStep && leadFormSubmitCount > 0 && !!leadFormErrors.name && !!leadFormErrors.email) ||
              (isContactFormStep && contactFormSubmitCount > 0 && !!contactFormErrors.phone) ||
              (isQuestionaryFormStep && !answer.length))
            }
            _hover={{ backgroundColor: '#479ea5' }}
            _active={{ backgroundColor: '#479ea5' }}
            isLoading={isLoading}
          >
            {isQuestionaryStep
              ? "COMPLETAR PREGUNTAS"
              : isQuestionaryFormStep
                ? questionIndex === questions.length - 1
                  ? 'ENVIAR'
                  : 'CONTINUAR'
                : isThanksStep 
                  ? 'TERMINAR'
                  : 'APLICAR'
            }
          </Button>
          <Image alt='form-logo' src={Logo} height={8} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}