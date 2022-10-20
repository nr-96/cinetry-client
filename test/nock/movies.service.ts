import nock from 'nock';

export const fetchTrendingMovies = () => {
  const results = [
    {
      id: 616820,
      title: 'Halloween Ends',
      poster: '/3uDwqxbr0j34rJVJMOW6o8Upw5W.jpg',
      year: '2022',
      genre: [
        {
          id: 27,
          name: 'Horror',
        },
        {
          id: 53,
          name: 'Thriller',
        },
      ],
      watch_later: false,
      favourite: true,
    },
    {
      id: 760161,
      title: 'Orphan: First Kill',
      poster: '/pHkKbIRoCe7zIFvqan9LFSaQAde.jpg',
      year: '2022',
      genre: [
        {
          id: 27,
          name: 'Horror',
        },
        {
          id: 53,
          name: 'Thriller',
        },
      ],
      watch_later: false,
      favourite: false,
    },
  ];

  const meta = {
    page: 1,
    total_pages: 1,
  };

  nock('http://localhost').get('/movies/trending').reply(200, {
    data: results,
    meta,
  });

  return { results, meta };
};

export const fetchGenreList = () => {
  nock('http://localhost')
    .get('/movies/genre/list')
    .reply(200, {
      data: [
        { id: 1, name: 'Genre 1' },
        { id: 2, name: 'Genre 2' },
        { id: 3, name: 'Genre 3' },
      ],
    });
};

export const fetchMoviesList = (
  queryParams: any,
  statusCode: number,
  result: any
) => {
  const nockScope = nock('http://localhost').get('/movies/list');
  if (queryParams) {
    nockScope.query(queryParams);
  }
  nockScope.reply(statusCode, result);
};

export const addToFavourite = (
  body: any = {},
  statusCode: number,
  result: any
) => {
  const nockScope = nock('http://localhost').post(
    '/movies/user/favourite',
    body
  );
  nockScope.reply(statusCode, result);
};
