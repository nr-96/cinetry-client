import { Card, Image } from 'antd';
import styled from 'styled-components';
import Icons from './Icons';
import { colors } from './common';

export interface IToggleFavourite {
  id: number;
  isFavourite: boolean;
}

export interface IToggleWatchLater {
  id: number;
  isWatchLater: boolean;
}
export interface IMovieCardProps {
  id: number;
  title: string;
  poster: string;
  genre: Array<{ id: number; name: string }>;
  watchLater: boolean;
  favourite: boolean;
  toggleFavourite: (payload: IToggleFavourite) => void;
  toggleWatchLater: (payload: IToggleWatchLater) => void;
}

function MovieCard({
  id,
  title,
  poster,
  genre,
  watchLater,
  favourite,
  toggleFavourite,
  toggleWatchLater,
}: IMovieCardProps) {
  const baseUrl = 'https://image.tmdb.org/t/p/original';

  const handleFavourite = () =>
    toggleFavourite({
      id,
      isFavourite: !favourite,
    });

  const handleWatchLater = () =>
    toggleWatchLater({
      id,
      isWatchLater: !watchLater,
    });

  return (
    <StyledCard>
      <Image
        style={{ width: '100%' }}
        preview={false}
        src={`${baseUrl}${poster}`}
        fallback="https://www.maketuwetlands.org.nz/wp-content/uploads/2018/09/placeholder_portrait-1.jpg"
        placeholder={
          <Image
            preview={false}
            src="https://www.maketuwetlands.org.nz/wp-content/uploads/2018/09/placeholder_portrait-1.jpg"
            style={{ width: '100%' }}
          />
        }
      />
      <StyledActions>
        {/* ToDo: Implement detailed view */}
        {/* <div className="action-item">
          <Icons.ExpandMovieIcon />
        </div> */}
        <div
          data-testid={`favoutite-action-${id}`}
          className="action-item"
          onClick={handleFavourite}
        >
          <Icons.FavouriteMovieIcon favourite={favourite} />
        </div>
        <div className="action-item" onClick={handleWatchLater}>
          <Icons.WatchLaterMovieIcon inList={watchLater} />
        </div>
      </StyledActions>
      <StyledInfo>
        {genre.map(({ id, name }) => (
          <span key={id}>{name}</span>
        ))}
      </StyledInfo>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  position: relative;
  background: ${colors['bg:primary']};
  border: 1px solid ${colors['bg:primary']};
  border-radius: 4px;
  overflow: hidden;

  &:hover img {
    z-index: 1;
    transform: scale(1.05);
  }

  .ant-card-body {
    padding: 0;
  }
`;

const StyledActions = styled.div`
  position: absolute;
  top: 0;
  right: 2px;
  z-index: 2;

  .action-item {
    margin: 3px 2px 0 0;

    border-radius: 100%;
    color: #ffffff;
    padding: 5px 8px;
    cursor: pointer;

    background: ${colors['bg:primary']};
    text-align: center;

    .anticon {
      color: #d2cbcb;
    }
  }
`;

const StyledInfo = styled.div`
  position: absolute;
  padding: 4px 8px;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  background: rgba(38, 38, 38, 0.5);
  text-align: center;
  line-height: 1;
  height: 26px;
  overflow: hidden;
  overflow-y: scroll;

  span {
    position: relative;
    margin: 0 5px;
    color: #ffffff;
    text-transform: lowercase;
    font-size: 10px;

    &:before {
      position: absolute;
      content: '.';
      left: -7px;
      top: -1px;
      display: inline-block;
    }
  }
`;

export default MovieCard;
