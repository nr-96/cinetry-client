import { redirect } from 'react-router-dom';

const isAuthorized = (): boolean => {
  const isAuthorized = false;
  return isAuthorized;
};

export const authLoader = () => {
  if (!isAuthorized()) {
    return redirect('/');
  }
};

export const unauthLoader = () => {
  if (isAuthorized()) {
    return redirect('/movies');
  }
};
