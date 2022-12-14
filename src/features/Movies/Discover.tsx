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
  Skeleton,
  common,
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
      <Row justify="space-between" gutter={[8, 8]}>
        <Col xs={24} sm={24} md={10} lg={7} xxl={6}>
          <Input
            testId="search-input"
            placeholder="Search movie"
            value={query}
            onChange={handleSearch}
          />
        </Col>
        <StyledFilters xs={24} sm={24} md={14} lg={12} xl={10} xxl={8}>
          <div className="wrapper">
            <StyledLabel>Filter by:</StyledLabel>
            <StyledFilterContainer>
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
            </StyledFilterContainer>
          </div>
        </StyledFilters>
      </Row>

      <Divider />

      {!movies.length && loadingMovies ? (
        <MovieGrid testId="movie-grid-skeleton">
          {Array.from(Array(20).keys()).map((i) => (
            <Col key={i} xs={12} sm={8} md={6} lg={4} xl={3}>
              <Skeleton.MovieCard loading />
            </Col>
          ))}
        </MovieGrid>
      ) : (
        <Spin testId="loading-movies-spinner" loading={loadingMovies}>
          <MovieGrid testId="movie-grid">
            {movies.length ? (
              movies.map(
                ({ id, title, poster, genre, watchLater, favourite }) => (
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
                )
              )
            ) : (
              <Col span={24}>
                <Skeleton.Empty message="No movies to display" />
              </Col>
            )}
          </MovieGrid>
        </Spin>
      )}

      <Divider />

      {!query && (
        <StyledPaginationContainer>
          <Pagination
          current={page}
          pages={meta?.totalPages}
          onChange={handleChagePagination}
        />
        </StyledPaginationContainer>
      )}
    </StyledWrapper>
  );
}

const { breakpoints } = common;

const StyledWrapper = styled.div`
  padding: 10px;
`;

const StyledTitle = styled.div`
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;

const StyledFilters = styled(Col)`
  .wrapper {
    @media ${breakpoints.xs} {
      display: inline-block;
      width: 100%;
    }

    @media ${breakpoints.sm} {
      display: inline-flex;
      justify-content: end;
      width: 100%;
    }

    .ant-select {
      margin-left: 2px;
    }
  }
`;

const StyledFilterContainer = styled.div`
  @media ${breakpoints.xs} {
    width: 100%;

    .ant-select-multiple {
      width: calc(100% - 104px);
    }
  }

  @media ${breakpoints.sm} {
    width: calc(100% - 90px);

    .ant-select-multiple {
      width: calc(100% - 104px);
    }
  }
`;

const StyledLabel = styled.div`
  font-size: 16px;
  color: #fff;

  @media ${breakpoints.xs} {
    margin: 3px 0;
  }

  @media ${breakpoints.sm} {
    margin: 3px 27px 0 0;
    display: inline-flex;
  }

  @media ${breakpoints.md} {
    margin-right: 15px;
  }
`;

const StyledPaginationContainer = styled.div`
  text-align: center;
`;

export default DiscoverMovies;
