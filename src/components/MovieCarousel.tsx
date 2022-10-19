import { Card } from 'antd';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard, { IMovieCardProps } from './MovieCard';
import { colors } from './common';

interface IMovieCarouselProps {
  movies: Array<{ id: number } & IMovieCardProps>;
}

function MovieCarousel({ movies }: IMovieCarouselProps) {
  return (
    <StyledCard bordered={false}>
      <StyledCarousel
        slidesToSlide={2}
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={{
          xl: {
            breakpoint: { max: 4000, min: 1200 },
            items: 8,
          },
          lg: {
            breakpoint: { max: 1199, min: 992 },
            items: 6,
          },
          md: {
            breakpoint: { max: 991, min: 768 },
            items: 4,
          },
          sm: {
            breakpoint: { max: 767, min: 576 },
            items: 3,
          },
          xs: {
            breakpoint: { max: 575, min: 100 },
            items: 2,
          },
        }}
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={false}
        customTransition="transform 300ms ease-in"
        transitionDuration={300}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {movies.map(({ id, title, poster, genre, watchLater, favourite }) => (
          <MovieCard 
            key={id} 
            title={title} 
            poster={poster} 
            genre={genre} 
            watchLater={watchLater}
            favourite={favourite}
          />
        ))}
      </StyledCarousel>
    </StyledCard>
  );
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
