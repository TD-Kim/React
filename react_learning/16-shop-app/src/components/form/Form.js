import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.scss';

const Form = ({ title, getDataForm, firebaseError }) => {
  // const test = useForm();
  // console.log(test);
  // useForm은 react-hook-form에서 제공하는 훅으로, 폼 상태와 유효성 검사를 관리하는데 사용한다.
  // register: 폼의 입력 필드를 등록하여 react-hook-form이 상태를 관리하고 유효성 검사를
  // 수행할 수 있도록 한다.
  // 사용법: register 함수를 입력 필드의 ref 속성에 전달하여 해당 필드를 폼의 일부분으로
  // 등록한다.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  const userEmail = {
    required: '필수 필드입니다.',
  };

  const userPassword = {
    required: '필수 필드입니다.',
    minLength: {
      value: 6,
      message: '최소 6자입니다.',
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <input
          type='email'
          placeholder='E-mail'
          {...register('email', userEmail)}
        />
        {errors?.email && (
          <div>
            <span className={styles.form_error}>{errors.email.message}</span>
          </div>
        )}
      </div>

      <div>
        <input
          type='password'
          placeholder='Password'
          {...register('password', userPassword)}
        />
        {errors?.password && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <button type='submit'>{title}</button>
      {firebaseError && (
        <span className={styles.form_error}>{firebaseError}</span>
      )}
    </form>
  );
};

export default Form;
