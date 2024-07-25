import { collection, addDoc } from 'firebase/firestore';
import { auth, firestoreDB } from '../firebase_setup/firebase';

// collection과 document 만들기
const handleSubmit = async (post, imageUrl, navigate) => {
  console.log('imageUrl', imageUrl);

  if ((post.postTitle === '') | (post.postContent === '')) {
    alert('내용을 입력하세요!');
    return false;
  }

  try {
    const docRef = await addDoc(collection(firestoreDB, 'posts'), {
      postTitle: post.postTitle,
      image: imageUrl,
      postContent: post.postContent,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    console.log('Document written with ID: ', docRef.id);

    // 글 오리고 메인으로
    navigate('/');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export default handleSubmit;
