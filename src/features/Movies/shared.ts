import { MovieGrid, MovieCard, MovieCardProps, Select } from '../../components';
import {
  useAddToFavouriteMutation,
  useRemoveFromFavouriteMutation,
  useAddToWatchLaterMutation,
  useRemoveFromWatchLaterMutation,
} from '../../services/movies';

export function useToggleFavourite() {
  const [addToFavourite] = useAddToFavouriteMutation();
  const [removeFromFavourite] = useRemoveFromFavouriteMutation();

  const toggleFavourite = (payload: MovieCardProps.IToggleFavourite) => {
    const { id, isFavourite } = payload;

    if (isFavourite) {
      addToFavourite(id);
    } else {
      removeFromFavourite(id);
    }
  };

  return toggleFavourite;
}

export function useToggleWatchLater() {
  const [addToWatchLater] = useAddToWatchLaterMutation();
  const [removeFromWatchLater] = useRemoveFromWatchLaterMutation();

  const toggleFavourite = (payload: MovieCardProps.IToggleWatchLater) => {
    const { id, isWatchLater } = payload;

    if (isWatchLater) {
      addToWatchLater(id);
    } else {
      removeFromWatchLater(id);
    }
  };

  return toggleFavourite;
}
