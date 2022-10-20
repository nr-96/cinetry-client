import { useState, useEffect, useMemo } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { Divider, MovieGrid, MovieCard, Input, Select } from '../../components';
import { useDiscoverMoviesQuery, IDiscoverMovies } from '../../services/movies';
import { useToggleFavourite, useToggleWatchLater } from './shared';

interface IValues {
  page: number;
  query?: string;
  year?: string;
  genre?: string[];
}

function DiscoverMovies() {
  const [controller, setController] = useState<IValues>({
    page: 1,
    query: '',
    year: '',
  });
  const [queryParams, setQueryParams] = useState<IDiscoverMovies>({});

  const { page, query = '', year = '', genre = [] } = controller;
  const sGenre = genre.join(',');

  const { data } = useDiscoverMoviesQuery(queryParams);
  const toggleFavourite = useToggleFavourite();
  const toggleWatchLater = useToggleWatchLater();

  const debouncedFetch = useMemo(
    () => debounce((query) => setQueryParams({ page, query }), 1000),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setController({ page: 1, query: e.target.value, year: '', genre: [] });
  };

  const handleSelectYear = (value: string) => {
    setController((prevState) => ({
      genre: prevState.genre,
      page: 1,
      query: '',
      year: value,
    }));
  };

  const handleSelectGenre = (value: string[]) => {
    setController((prevState) => ({
      year: prevState.year,
      page: 1,
      query: '',
      genre: value,
    }));
  };

  const handleClickPage = (value: number) => {
    setController((prevState) => ({ ...prevState, page: value }));
  };

  useEffect(() => {
    if (query) {
      debouncedFetch(query);
    }
  }, [query, page]);

  useEffect(() => {
    setQueryParams({ page, year, genre: sGenre });
  }, [page, year, sGenre]);

  const movies = data?.results || [];

  return (
    <StyledWrapper>
      <StyledTitle>Discover Movies</StyledTitle>

      <Row justify="space-between">
        <Col md={6}>
          <Input
            placeholder="Search movie"
            value={query}
            onChange={handleSearch}
          />
        </Col>
        <StyledFilterWrapper md={8}>
          <StyledLabel>Filter by:</StyledLabel>
          <Select.Single
            placeholder="2022"
            value={year}
            onChange={handleSelectYear}
            options={[
              { key: '', value: 'All' },
              { key: '2012', value: '2012' },
              { key: '2013', value: '2013' },
            ]}
          />
          <Select.Multiple
            placeholder="Action, Thriller"
            value={genre}
            onChange={handleSelectGenre}
            options={[
              { key: '27', value: 'test' },
              { key: '28', value: 'test 1' },
              { key: '53', value: 'test 2' },
            ]}
          />
        </StyledFilterWrapper>
      </Row>

      <Divider />

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

      <button onClick={() => handleClickPage(page + 1)}>up</button>
      <button onClick={() => handleClickPage(page - 1)}>down</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  padding: 10px;
`;

const StyledTitle = styled.div`
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;

const StyledFilterWrapper = styled(Col)`
  display: flex;
  justify-content: end;
`;

const StyledLabel = styled.span`
  font-size: 16px;
  margin: 3px 10px 0;
  color: #fff;
`;

export default DiscoverMovies;
