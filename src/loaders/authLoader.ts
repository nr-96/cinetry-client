import { redirect } from 'react-router-dom';
import { store } from '../redux/store';

const isAuthorized = (): boolean => {
  const authToken = store.getState().global.user?.authToken;

  if (!authToken) {
    // fallback
    const sessionUser = sessionStorage.getItem('session-user');
    return !!sessionUser;
  }

  return !!authToken;
};

export const authLoader = () => {
  if (!isAuthorized()) {
    return redirect('/');
  }
};

export const unauthLoader = () => {
  if (isAuthorized()) {
    return redirect('/home');
  }
};
