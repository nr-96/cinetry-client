import { useState } from 'react';
import { MovieGrid, Select } from '../../components';
import { useDiscoverMoviesQuery } from '../../services/movies';

function DiscoverMovies() {
  const { data } = useDiscoverMoviesQuery();

  return (
    <>
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
      <MovieGrid movies={data?.results || []} />
    </>
  );
}

export default DiscoverMovies;
