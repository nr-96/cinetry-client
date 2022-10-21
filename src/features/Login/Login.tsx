import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoAuthorizeMutation } from '../../services/auth';
import { Button, Messages } from '../../components';

function Login() {
  const navigate = useNavigate();
  const [doAuthorize, effects] = useDoAuthorizeMutation();
  const { isLoading, isSuccess, isError } = effects;

  const handleClick = () => doAuthorize();

  useEffect(() => {
    if (isError) {
      Messages.showError('Unsuccessful attempt, please try again!');
    }
    if (isSuccess) {
      navigate('/home');
    }
  }, [isSuccess, isError, navigate]);

  return (
    <Button
      type="primary"
      width="100%"
      name="Login"
      loading={isLoading}
      onClick={handleClick}
    />
  );
}

export default Login;
