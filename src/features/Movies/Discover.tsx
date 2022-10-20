import { useState } from 'react';
import { Col } from 'antd';
import { MovieGrid, MovieCard, Input, Select } from '../../components';
import { useDiscoverMoviesQuery, IDiscoverMovies } from '../../services/movies';
import { useToggleFavourite, useToggleWatchLater } from './shared';

function DiscoverMovies() {
  const [queryParams, setQueryParams] = useState<IDiscoverMovies>({});
  const [page, setPage] = useState(1);

  const { data } = useDiscoverMoviesQuery({ page, ...queryParams });
  const toggleFavourite = useToggleFavourite();
  const toggleWatchLater = useToggleWatchLater();

  const handleSearch = (query: string) => handleQueryParams({ query });

  const handleGenreSelect = (genres: string[]) => {
    const sGenreList = genres.join(',');
    handleQueryParams({ genre: sGenreList });
  };

  const handleYearSelect = (year: string) => handleQueryParams({ year });

  const handleQueryParams = (payload: IDiscoverMovies) => {
    const { query, genre, year } = payload;

    setPage(1);
    const nextState: IDiscoverMovies = {};

    if (query) {
      nextState.query = query;
    } else {
      nextState.query = '';

      if (genre) {
        nextState.genre = genre;
      }

      if (year) {
        nextState.year = year;
      }
    }
    setQueryParams((prevState) => ({ ...prevState, ...nextState }));
  };

  const movies = data?.results || [];
  return (
    <>
      <Input useDebounce onChange={handleSearch} />
      <button onClick={() => setPage(page + 1)}>up</button>
      <button onClick={() => setPage(page - 1)}>down</button>
      <Select.Single
        onChange={handleYearSelect}
        options={[
          { key: '', value: 'All' },
          { key: '2012', value: '2012' },
          { key: '2013', value: '2013' },
        ]}
      />
      <Select.Multiple
        onChange={handleGenreSelect}
        options={[
          { key: '27', value: 'test' },
          { key: '28', value: 'test 1' },
          { key: '53', value: 'test 2' },
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
