import { StaticImageData } from "next/image";

import { useEffect, useState } from "react";

import { Avatar, Box, Text } from "@chakra-ui/react"

import Avatar1 from '../../../images/students/1.jpg'
import Avatar2 from '../../../images/students/2.jpg'
import Avatar3 from '../../../images/students/3.jpg'
import Avatar4 from '../../../images/students/4.jpg'
import Avatar5 from '../../../images/students/5.jpg'
import Avatar6 from '../../../images/students/6.jpg'
import Avatar7 from '../../../images/students/7.jpg'
import Avatar8 from '../../../images/students/8.jpg'
import Avatar9 from '../../../images/students/9.jpg'
import Avatar10 from '../../../images/students/10.jpg'
import Avatar11 from '../../../images/students/11.jpg'
import Avatar12 from '../../../images/students/12.jpg'
import Avatar13 from '../../../images/students/13.jpg'
import Avatar14 from '../../../images/students/14.jpg'
import Avatar15 from '../../../images/students/15.jpg'
import Avatar16 from '../../../images/students/16.jpg'
import Avatar17 from '../../../images/students/17.jpg'
import Avatar18 from '../../../images/students/18.jpg'
import Avatar19 from '../../../images/students/19.jpg'
import Avatar20 from '../../../images/students/20.jpg'
import Avatar21 from '../../../images/students/21.jpg'
import Avatar22 from '../../../images/students/22.jpg'
import Avatar23 from '../../../images/students/23.jpg'
import Avatar24 from '../../../images/students/24.jpg'
import Avatar25 from '../../../images/students/25.jpg'
import Avatar26 from '../../../images/students/26.jpg'
import Avatar27 from '../../../images/students/27.jpg'
import Avatar28 from '../../../images/students/28.jpg'
import Avatar29 from '../../../images/students/29.jpg'
import Avatar30 from '../../../images/students/30.jpg'
import Avatar31 from '../../../images/students/31.jpg'
import Avatar32 from '../../../images/students/32.jpg'
import Avatar33 from '../../../images/students/33.jpg'
import Avatar34 from '../../../images/students/34.jpg'
import Avatar35 from '../../../images/students/35.jpg'
import Avatar36 from '../../../images/students/36.jpg'
import Avatar37 from '../../../images/students/37.jpg'
import Avatar38 from '../../../images/students/38.jpg'
import Avatar39 from '../../../images/students/39.jpg'
import Avatar40 from '../../../images/students/40.jpg'
import Avatar41 from '../../../images/students/41.jpg'


const avatars: StaticImageData[] = [
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
  Avatar15,
  Avatar16,
  Avatar17,
  Avatar18,
  Avatar19,
  Avatar20,
  Avatar21,
  Avatar22,
  Avatar23,
  Avatar24,
  Avatar25,
  Avatar26,
  Avatar27,
  Avatar28,
  Avatar29,
  Avatar30,
  Avatar31,
  Avatar32,
  Avatar33,
  Avatar34,
  Avatar35,
  Avatar36,
  Avatar37,
  Avatar38,
  Avatar39,
  Avatar40,
  Avatar41,
]

export const ClientsCarrousel = () => {
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    const moveCarousel = () => {
      setOffsetX((prevOffset) => {
        const newOffset = prevOffset - 1;
        const totalWidth = avatars.length * 76;

        return newOffset <= -totalWidth ? 0 : newOffset;
      });
    };

    const animation = setInterval(moveCarousel, 16);

    return () => clearInterval(animation);
  }, []);

  return (
    <Box bg='black' pt={4} pb={4} textAlign='center' borderTop='1px solid #2d3740' borderBottom='1px solid #2d3740' width="100%">
      <Text color='white' fontWeight={'bold'}>+150 Estudiantes entre Costa Rica, México</Text>
      <Text color='white' fontWeight={'bold'}>Colombia, Peru, Chile y Argentina</Text>
      <Text color='#c7c7c7' mt={2}>Están aprendiendo a generar +$3,000</Text>
      <Text color='#c7c7c7' mb={8}>de forma remota en tan solo 1 año</Text>
      <Box display={'flex'} justifyContent='center'>
        <Box position='relative' overflow="hidden" width={1000}>
          {/* Left Blur */}
          <Box
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            width="8px"
            bg="linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))"
            zIndex="1"
          />

          {/* Right Blur */}
          <Box
            position="absolute"
            right="0"
            top="0"
            bottom="0"
            width="8px"
            bg="linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))"
            zIndex="1"
          />
          <Box
            display="flex"
            transform={`translateX(${offsetX}px)`}
            transition="none"
            maxWidth={1000}
          >
            {avatars.concat(avatars).map((avatar, i) => (
              <Avatar
                key={`avatar-${i}`}
                src={avatar.src}
                ml={8}
                objectFit="cover"
                boxSize="56px"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}