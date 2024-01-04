import { addWishlist, getCourseBySlug } from '../api';
import Button from '../components/Button';
import Container from '../components/Container';
import Card from '../components/Card';
import CourseIcon from '../components/CourseIcon';
import getCourseColor from '../utils/getCourseColor';
import styles from './CoursePage.module.css';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { getData, updateDatas } from '../api/firebase';
import { useEffect } from 'react';

function CoursePage() {
  const props = useLocation();
  console.log(props);
  const course = props.state?.course;
  const { pathname } = props;
  const { courseSlug } = useParams(); // useParams가 리턴하는 객체에는 현재 경로의 파라미터들이 저장되어 있다.
  // const course = getCourseBySlug("react-frontend-development");
  const navigate = useNavigate();

  const courseColor = getCourseColor(course?.code);

  if (!course) {
    return <Navigate to='/courses' />;
  }

  const headerStyle = {
    borderTopColor: courseColor,
  };

  const handleAddWishlistClick = async () => {
    if(localStorage.getItem("token")) {
      const docId = localStorage.getItem("token");
      const courseList = localStorage.getItem("courseList");
      const updateData = {
        courseList: [
          ...courseList, course
        ]
      }
      const result = await updateDatas("member", docId, updateData);
      if(result) navigate("/wishlist");
    }else {
      alert("로그인을 해주세요.");
      navigate("/login", {state: pathname});
      // navigate("/login", {state: {test: pathname, test2: pathname}});
    }
    // addWishlist(course?.slug);
    // navigate('/wishlist');
  };

  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course.photoUrl} />
          <h1 className={styles.title}>{course.title}</h1>
          <Button variant='round' onClick={handleAddWishlistClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course.topics.map(({ topic }) => (
          <Card className={styles.topic} key={topic.slug}>
            <h3 className={styles.title}>{topic.title}</h3>
            <p className={styles.summary}>{topic.summary}</p>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default CoursePage;
