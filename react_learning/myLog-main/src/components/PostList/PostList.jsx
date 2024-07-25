import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestoreDB } from '../../firebase_setup/firebase';

const PostList = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 페이지가 로드되면 파이어베이스에서 모든 포스트 가져오기
  const handleLoad = async () => {
    setLoading(false);
    const data = await getDocs(collection(firestoreDB, 'posts'));
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(true);
  };

  // 포스트 삭제
  const handleDeletePostClick = async (postId) => {
    //  클릭된 포스트 선택
    const postDoc = doc(firestoreDB, 'posts', postId);
    console.log(postDoc);
    await deleteDoc(postDoc);

    // 삭제 후 다시 포스트 로딩
    handleLoad();
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <h2 className="sr-only">포스트 목록</h2>
      <ul className="flex flex-wrap">
        {!loading ? (
          <li className="p-20 font-bold text-xl mx-auto md:p-32">
            포스트를 가져오고 있습니다.
          </li>
        ) : postList.length === 0 ? (
          <li className="p-20 font-bold text-xl mx-auto md:p-32">
            포스트가 없습니다.
          </li>
        ) : (
          postList.map((post) => (
            <li className="p-3 md:w-1/2 lg:w-1/3 xl:w-1/4" key={post.id}>
              <Link to="/view" state={{ post }}>
                <div className="max-sm:flex max-sm:h-[200px]  h-[400px] overflow-hidden rounded-lg shadow-md bg-white relative ">
                  <img
                    className="max-sm:h-full max-sm:w-1/3 mb-4 object-cover w-full h-48"
                    src={post.image}
                    alt=""
                  />
                  <div className="max-sm:relative max-sm:w-2/3  sm:justify-between p-4 flex flex-col ">
                    <strong className="max-sm:text-base max-sm:mb-3 mb-2 truncate block text-xl font-semibold ">
                      {post.postTitle}
                    </strong>
                    <p className="max-sm:line-clamp-4 break-words line-clamp-3 mb-2 leading-normal text-zinc-500 text-sm">
                      {post.postContent}
                    </p>

                    <span className="text-xs absolute bottom-0 left-0 m-4 pb-3">
                      by {post.author.name}.
                    </span>
                    {isAuth && post.author.id === auth.currentUser.uid && (
                      <button
                        className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow absolute bottom-0 right-0 m-4"
                        onClick={() => handleDeletePostClick(post.id)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default PostList;
