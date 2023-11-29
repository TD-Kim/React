import "./Button.css";

// const style = {
//   padding: "14px 27px",
//   border: "solid 1px #7090ff",
//   outline: "none",
//   color: "#7090ff",
//   cursor: "pointer",
//   backgroundColor: "rgba(0, 89, 255, 0.2)",
//   borderRadius: "30px",
//   fontSize: "17px",
// };

const baseButtonStyle = {
  padding: "14px 27px",
  outline: "none",
  cursor: "pointer",
  borderRadius: "9999px",
  fontSize: "17px",
};

const blueButtonStyle = {
  ...baseButtonStyle,
  border: "solid 1px #7090ff",
  color: "#7090ff",
  backgroundColor: "rgba(0, 89, 255, 0.2)",
};

const redButtonStyle = {
  ...baseButtonStyle,
  border: "solid 1px #ff4664",
  color: "#ff4664",
  backgroundColor: "rgba(255, 78, 78, 0.2)",
};

function Button({ children, onClick, color = "blue", className = "" }) {
  // const style = color === "red" ? redButtonStyle : blueButtonStyle;
  const classNames = `Button ${color} ${className}`;
  return (
    // <button style={{ backgroundColor: "yellow" }} onClick={onClick}>
    // <button style={style} onClick={onClick}>
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
