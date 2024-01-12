import CourseItem from './CourseItem';

function TestComponent({ resource, setItem }) {
  const data = resource;
  data.then((response) => setItem(response));
}

export default TestComponent;
