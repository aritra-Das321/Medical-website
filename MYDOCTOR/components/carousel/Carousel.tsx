import React, { useState, useCallback } from 'react';
import Slider from 'react-slick';
import { Box, Stack, Typography, useTheme, Button, IconButton } from '@mui/material';
import styles from '@/styles/fade.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  {
    imgSrc: '/images/ai-generated-8704008_1920.jpg',
    heading: 'Advanced Health Solutions',
    paragraph: 'Our specialists deliver the highest level of medical expertise for your care.',
  },
  {
    imgSrc: '/images/about-img.webp',
    heading: 'Personalized Patient Care',
    paragraph: 'We ensure every patient gets personalized attention and quality service.',
  },
  {
    imgSrc: '/images/third.jpg',
    heading: 'Cutting-Edge Medical Technology',
    paragraph: 'Our facilities are equipped with the latest technology to enhance your treatment.',
  },
];

const Carousel: React.FC = () => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: () => {
      setAnimate(true);
    },
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const handleAnimationEnd = useCallback(() => {
    setAnimate(false);
  }, []);

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'relative',
            backgroundImage: `url(${slide.imgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: { xs: '400px', lg: '600px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(0, 0, 255, 0.6), rgba(0, 0, 0, 0.7))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.common.white,
              textAlign: 'center',
              px: 4,
            }}
          >
           <Typography
  variant="h3"
  component="h2"
  gutterBottom
  sx={{
    animation: animate ? `${styles['fadeInUp']} 1s ease-out` : 'none',
    transition: 'animation 1s',
    fontSize: { xs: '1.8rem', lg: '3rem' },
    fontWeight: 'bold',
    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)', // Softer shadow
    color: 'rgba(255, 255, 255, 0.95)', // Lighter white for a professional look
  }}
>
  {slide.heading}
</Typography>

<Typography
  variant="body1"
  gutterBottom
  sx={{
    animation: animate ? `${styles['fadeInUp']} 1s ease-out` : 'none',
    transition: 'animation 1s',
    fontSize: { xs: '1rem', lg: '1.3rem' },
    color: 'rgba(220, 220, 220, 0.9)', // Light gray for a softer feel
    textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)', // Subtle shadow for readability
  }}
>
  {slide.paragraph}
</Typography>

<Stack
  direction="row"
  spacing={2}
  sx={{
    animation: animate ? `${styles['fadeInUp']} 1s ease-out` : 'none',
    transition: 'animation 1s',
  }}
  onAnimationEnd={handleAnimationEnd}
>
  <Button
    variant="outlined"
    sx={{
      color: 'white',
      borderColor: 'rgba(255, 255, 255, 0.8)', // Softer white for the border
      fontWeight: 'bold',
      '&:hover': {
        borderColor: 'lightgray',
        background: 'white',
        color: 'black',
      },
    }}
  >
    Read More
  </Button>
</Stack>

          </Box>
        </Box>
      ))}
    </Slider>
  );
};

// Custom Arrow Component
const CustomNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(255, 255, 255, 0.5)',
        right: 10,
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const CustomPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <IconButton
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(255, 255, 255, 0.5)',
        left: 10,
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export default Carousel;
