import { useState } from 'react';
import { Col } from 'antd';
import { MovieGrid, MovieCard, MovieCardProps, Select } from '../../components';
import { useDiscoverMoviesQuery } from '../../services/movies';
import { useToggleFavourite, useToggleWatchLater } from './shared';

function DiscoverMovies() {
  const [page, setPage] = useState(1);
  const { data } = useDiscoverMoviesQuery({ page });
  const toggleFavourite = useToggleFavourite();
  const toggleWatchLater = useToggleWatchLater();

  const movies = data?.results || [];

  return (
    <>
      <button onClick={() => setPage(page + 1)}>up</button>
      <button onClick={() => setPage(page - 1)}>down</button>
      <Select.Single
        options={[
          { key: '2012', value: '2012' },
          { key: '2013', value: '2013' },
        ]}
      />
      <Select.Multiple
        options={[
          { key: '1', value: 'test' },
          { key: '2', value: 'test 2' },
        ]}
      />
      <MovieGrid>
        {movies.map(({ id, title, poster, genre, watchLater, favourite }) => (
          <Col key={id} xs={12} sm={8} md={6} lg={4} xl={3}>
            <MovieCard
              id={id}
              title={title}
              poster={poster}
              genre={genre}
              watchLater={watchLater}
              favourite={favourite}
              toggleFavourite={toggleFavourite}
              toggleWatchLater={toggleWatchLater}
            />
          </Col>
        ))}
      </MovieGrid>
    </>
  );
}

export default DiscoverMovies;
