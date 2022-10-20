import { useState, useEffect, useMemo } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import {
  Divider,
  MovieGrid,
  MovieCard,
  Input,
  Select,
  Pagination,
  Spin,
} from '../../components';
import {
  useGetGenreListQuery,
  useDiscoverMoviesQuery,
  IDiscoverMovies,
} from '../../services/movies';
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

  const { data: genreData } = useGetGenreListQuery();
  const { data, isFetching: loadingMovies } =
    useDiscoverMoviesQuery(queryParams);

  const toggleFavourite = useToggleFavourite();
  const toggleWatchLater = useToggleWatchLater();

  const debouncedFetch = useMemo(
    () => debounce((query) => setQueryParams({ page: 1, query }), 500),
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
    if (value.length > 3) {
      // TODO: Show warning as it should not exceed 3 genres
      return;
    }

    setController((prevState) => ({
      year: prevState.year,
      page: 1,
      query: '',
      genre: value,
    }));
  };

  const handleChagePagination = (value: number) => {
    setController((prevState) => ({ ...prevState, page: value }));
  };

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  useEffect(() => {
    setQueryParams({ page, year, genre: sGenre });
  }, [page, year, sGenre]);

  const movies = data?.results || [];
  const meta = data?.meta;

  return (
    <StyledWrapper>
      <StyledTitle data-testid="title">Discover Movies</StyledTitle>
      <div data-testid="loading">{loadingMovies.toString()}</div>
      <Row justify="space-between">
        <Col md={6}>
          <Input
            testId="search-input"
            placeholder="Search movie"
            value={query}
            onChange={handleSearch}
          />
        </Col>
        <StyledFilterWrapper md={10}>
          <StyledLabel>Filter by:</StyledLabel>
          <Select.Single
            testId="select-year"
            placeholder="2022"
            value={year}
            onChange={handleSelectYear}
            options={[
              { id: '', name: 'All' },
              { id: '2010', name: '2010' },
              { id: '2011', name: '2011' },
              { id: '2012', name: '2012' },
              { id: '2013', name: '2013' },
              { id: '2014', name: '2014' },
              { id: '2015', name: '2015' },
              { id: '2016', name: '2016' },
              { id: '2017', name: '2017' },
              { id: '2018', name: '2018' },
              { id: '2019', name: '2019' },
              { id: '2020', name: '2020' },
              { id: '2021', name: '2021' },
              { id: '2022', name: '2022' },
            ]}
          />
          <Select.Multiple
            placeholder="Action, Thriller"
            value={genre}
            onChange={handleSelectGenre}
            options={genreData?.results || []}
          />
        </StyledFilterWrapper>
      </Row>

      <Divider />

      <Spin testId="loading-movies-spinner" loading={loadingMovies}>
        <MovieGrid testId="movie-grid">
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
      </Spin>

      <Divider />

      <Pagination
        current={page}
        pages={meta?.totalPages}
        onChange={handleChagePagination}
      />
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
