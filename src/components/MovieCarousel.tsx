import { Card } from 'antd';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';
import { colors } from './common';

function MovieCarousel() {

  return (
    <StyledCard>
      <StyledCarousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={{
          xl: {
            breakpoint: { max: 4000, min: 1200 },
            items: 8
          },
          lg: {
            breakpoint: { max: 1199, min: 992 },
            items: 6
          },
          md: {
            breakpoint: { max: 991, min: 768 },
            items: 4
          },
          sm: {
            breakpoint: { max: 767, min: 576 },
            items: 3
          },
          xs: {
            breakpoint: { max: 575, min: 100 },
            items: 2
          },
          
        }}
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        <MovieCard title="test" cover="/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg" />
      </StyledCarousel>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  background: ${colors['bg:primary']};
`;

const StyledCarousel = styled(Carousel)`
  .carousel-item {
    padding: 10px;
  }
`;

export default MovieCarousel;