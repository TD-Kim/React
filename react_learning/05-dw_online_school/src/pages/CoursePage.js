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
import { getData } from '../api/firebase';
import { useEffect } from 'react';

function CoursePage() {
  const { course } = useLocation().state;
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

  const handleAddWishlistClick = () => {
    addWishlist(course?.slug);
    navigate('/wishlist');
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
