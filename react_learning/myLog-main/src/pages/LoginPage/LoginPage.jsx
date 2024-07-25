import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../firebase_setup/firebase';
import { signInWithPopup } from 'firebase/auth';
import BasicTemplate from '../../template/BasicTemplate';

const LoginPage = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  const signWithGoogle = () => {
    // 팝업창으로 로그인 하기
    signInWithPopup(auth, provider).then((res) => {
      localStorage.setItem('isAuth', true);
      // console.log(auth);
      // 인증 완료로 바꾸기
      setIsAuth(true);
      // 메인페이지로 이동
      navigate('/');
    });
  };

  return (
    <BasicTemplate isAuth={isAuth}>
      <div className="px-3 mx-auto mt-20 text-gray-500 md:max-w-2xl">
        <div className="rounded-xl bg-white shadow-xl">
          <div className="p-6">
            <h1 className=" text-center text-2xl font-bold text-cyan-900 underline underline-offset-8">
              Login
            </h1>

            <div className=" px-6 text-gray-500 ">
              <div className="mt-14 grid md:">
                <button
                  className="bg-white group h-12 rounded-full border-2 border-gray-300 px-6 transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                  onClick={signWithGoogle}
                >
                  <div className="relative flex items-center justify-center space-x-4">
                    <img
                      src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                    />
                    <span className="block text-sm font-semibold tracking-wide text-gray-700 transition duration-300 group-hover:text-blue-600">
                      Continue with Google
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicTemplate>
  );
};

export default LoginPage;
