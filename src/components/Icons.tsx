import { ArrowsAltOutlined, StarOutlined, StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';

function ExpandMovieIcon() {
  return <ArrowsAltOutlined />
}

function FavouriteMovieIcon({ favourite }: { favourite: boolean }) {
  return (
    favourite 
      ? <StarFilled />
      : <StarOutlined />
  )
}

function WatchLaterMovieIcon({ inList }: { inList: boolean }) {
  return (
    inList 
      ? <MinusOutlined />
      : <PlusOutlined />
  )
}

export default {
  ExpandMovieIcon,
  FavouriteMovieIcon,
  WatchLaterMovieIcon
};
