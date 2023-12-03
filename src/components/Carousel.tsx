import { Box, Flex, Text, Image, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface CrslProps {
  images: Array<string>;
}

const Carousel: React.FC<CrslProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = images?.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";
  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);
  return (
    <Flex w="full" bg="#edf3f8" alignItems="center" justifyContent="center">
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h={{ md: "400px" }} w="full" {...carouselStyle}>
          {images?.map((slide: string, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
              <Image
                h="full"
                src={slide}
                alt="carousel image fashiotrendz"
                backgroundSize="cover"
                objectFit={"cover"}
                w="full"
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Carousel;
