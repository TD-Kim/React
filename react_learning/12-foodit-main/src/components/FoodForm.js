import { useCallback, useState } from 'react';
import useTranslate from '../hooks/useTranslate';
import FileInput from './FileInput';
import './FoodForm.css';

function sanitize(type, value) {
  switch (type) {
    case 'number':
      return Number(value) || 0;

    default:
      return value;
  }
}

const INITIAL_VALUES = {
  title: '',
  content: '',
  calorie: 0,
  imgUrl: null,
};

function FoodForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) {
  console.log('FoodForm 로딩!!!');
  const t = useTranslate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit 시작!!!');
    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit('food', values);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    setValues(INITIAL_VALUES);
    onSubmitSuccess(result, handleChange);
    console.log('handleSubmit 끝!!!');
    // const { food } = result;
  };

  const handleChange = useCallback((name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  return (
    <form className='FoodForm' onSubmit={handleSubmit}>
      <FileInput
        className='FoodForm-preview'
        onChange={handleChange}
        name='imgUrl'
        value={values.imgUrl}
        initialPreview={initialPreview}
      />
      <div className='FoodForm-rows'>
        <div className='FoodForm-title-calorie'>
          <input
            className='FoodForm-title'
            name='title'
            value={values.title}
            placeholder={t('title placeholder')}
            onChange={handleInputChange}
          />
          <input
            className='FoodForm-calorie'
            type='number'
            name='calorie'
            value={values.calorie}
            placeholder={t('calorie placeholder')}
            onChange={handleInputChange}
          />
          {onCancel && (
            <button
              className='FoodForm-cancel-button'
              type='button'
              onClick={onCancel}
            >
              취소
            </button>
          )}
          <button
            className='FoodForm-submit-button'
            type='submit'
            disabled={isSubmitting}
          >
            확인
          </button>
        </div>
        <textarea
          className='FoodForm-content'
          name='content'
          value={values.content}
          placeholder='내용을 작성해 주세요.'
          onChange={handleInputChange}
        />
        {submittingError && <p>{submittingError.message}</p>}
      </div>
    </form>
  );
}

export default FoodForm;
