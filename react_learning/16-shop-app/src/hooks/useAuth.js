import { useSelector } from 'react-redux';

export function useAuth() {
  const { uid, email, token } = useSelector((state) => state.userSlice);
  return {
    isAuth: !!email,
    email,
    uid,
    token,
  };
}
