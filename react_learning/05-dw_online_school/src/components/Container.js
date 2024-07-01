import classNames from 'classnames';
import styles from './Container.module.css';

function Container({ className, children }) {
  // 방법1. className ={`${classes.class1} ${classes.class2}`}
  // 방법2. className={[classes.class1, classes.class2].join(" ")}
  // ex) className={[classes.button, classes[classColor]].join(" ")}
  return (
    <div className={classNames(styles.container, className)}>{children}</div>
  );
}

export default Container;
