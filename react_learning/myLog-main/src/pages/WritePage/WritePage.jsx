import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_setup/firebase';
import { HiPhotograph } from 'react-icons/hi';
import BasicTemplate from '../../template/BasicTemplate';
import handleSubmit from '../../handles/handleSubmit';

const WritePage = ({ isAuth, handleSignOutClick }) => {
  const navigate = useNavigate();
  const [fileAttachedState, setFileAttachedState] = useState('사진 첨부하기');
  const [file, setFile] = useState({});
  const [postInputState, setPostInputState] = useState({
    postTitle: '',
    postContent: '',
  });

  const { postTitle, postContent } = postInputState;

  const onChange = (e) => {
    const { value, name } = e.target;

    setPostInputState({
      ...postInputState,
      [name]: value,
    });
  };

  // 파일 업로드 전 보관
  const handleChangeFile = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    setFileAttachedState(e.target.files[0].name);
  };

  const uploadToFirebase = () => {
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          // url을 얻어야 이동
          handleSubmit(postInputState, downloadURL, navigate);
        });
      }
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadToFirebase();
  };

  useEffect(() => {
    if (!isAuth) navigate('/login');
  }, []);

  return (
    <BasicTemplate isAuth={isAuth} handleSignOutClick={handleSignOutClick}>
      <section className="mx-3">
        <form className="flex flex-col items-center" onSubmit={submitHandler}>
          <label className="sr-only" htmlFor="postTitle">
            글 제목
          </label>
          <input
            className="p-3 mb-4 w-full rounded-lg border border-gray-200 bg-white"
            id="postTitle"
            name="postTitle"
            value={postTitle}
            onChange={onChange}
            type="text"
            placeholder="제목을 입력하세요"
          />
          <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 ">
            <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
              <label
                className="flex items-center text-3xl text-slate-600 hover:bg-sky-100 hover:bg-sky-200 hover:ring-1 hover:rounded-lg cursor-pointer"
                htmlFor="postImage"
              >
                <HiPhotograph />
                <span className="text-sm ml-2">{fileAttachedState}</span>
              </label>
              <input
                id="postImage"
                name="postImage"
                className="hidden"
                type="file"
                accept="/image/*"
                onChange={handleChangeFile}
              />
            </div>

            <div className="rounded-b-lg bg-white px-4 py-2 ">
              <label className="sr-only" htmlFor="postContent">
                게시글 작성하기
              </label>
              <textarea
                className="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 "
                rows="20"
                name="postContent"
                id="postContent"
                placeholder="당신의 이야기를 적어보세요..."
                value={postContent}
                onChange={onChange}
              ></textarea>
            </div>
          </div>

          <button
            className="mt-5 px-5 py-2.5 text-sm font-medium  text-white bg-sky-700 rounded-lg focus:ring-4 focus:ring-blue-200 "
            type="submit"
          >
            저장하기
          </button>
        </form>
      </section>
    </BasicTemplate>
  );
};

export default WritePage;
