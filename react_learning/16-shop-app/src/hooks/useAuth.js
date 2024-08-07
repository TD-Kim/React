import { useSelector } from 'react-redux';

export function useAuth() {
  const { id, email, token } = useSelector((state) => state.userSlice);
  return {
    isAuth: !!email,
    email,
    id,
    token,
  };
}
