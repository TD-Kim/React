import { useEffect, useRef, useState } from "react";
import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset.png";
import "./FileInput.css";

function FileInput({ className = "", name, value, onChange, initialPreview }) {
  const [preview, setPreview] = useState(initialPreview);

  const inputRef = useRef();

  // const [value, setValue] = useState({});
  const handleChange = (e) => {
    // console.log(e.target.files);
    const nextValue = e.target.files[0];
    // setValue(nextValue);
    onChange(name, nextValue);
  };

  // useEffect(() => {
  //   if(inputRef.current){
  //     console.log(inputRef);
  //   }
  // }, []);

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    // 값이 없을수도 있기 때문에 useEffect 를 종료해준다.
    if (!value) return;

    // ObjectURL 을 만들면 웹 브라우저는 메모리를 할당(이게 사이드 이펙트)하고 파일에 해당하는 주소를 만들어 준다.
    // 렌더링 하는 과정에서 리액트 외부의 상태를 바꾸게 된다.
    // 컴포넌트 함수에서 외부의 상태를 바꾸는것을 사이드 이펙트라고 한다.
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    // ObjectURL 을 만들면 웹브라우저에 메모리를 할당한다고 했는데 할당을 하고 나면 해제도 같이 해줘야
    // 메모리 낭비를 방지할 수 있다.
    // useEffect에서는 사이드 이펙트를 정리하는 방법도 제공하는데 아래와 같이 리턴값으로 함수를 리턴하면 된다.
    // 디펜던시 리스트 값이 바뀌어서 새로 콜백을 실행하게 될텐데 이 전에 리액트는
    // 앞에서 리턴한 이 정리 함수를 실행해서 사이드 이펙트를 정리할 수 있게 해준다.
    // 재렌더링 => useEffect 콜백함수 실행 => 그 안에있는 return 함수 기억 => 사용자 파일 변경
    // => value 값 변경으로 인한 useEffect 함수 실행 및 콜백함수 실행 => 앞에서 기억해뒀던 return 함수 실행
    // (앞에서 만들어진 사이드 이펙트가 더이상 쓸모없어졌기 때문)
    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]);

  //   return <input type="file" value={value} onChange={handleChange} />;
  // return <input type="file" onChange={handleChange} ref={inputRef} />;
  return (
    <div className={`FileInput ${className}`}>
      <img
        className={`FileInput-preview ${preview ? "selected" : ""}`}
        src={preview || placeholderImg}
        alt="이미지 미리보기"
      />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} alt="선택해제" />
        </button>
      )}
    </div>
  );
}

export default FileInput;
