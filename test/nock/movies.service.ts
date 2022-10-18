import nock from 'nock';

export const fetchTrendingMovies = () => {
  nock('http://localhost')
    .get('/movies/trending')
    .reply(200, {
      data: [
        { id: 1 }
      ]
    });
};