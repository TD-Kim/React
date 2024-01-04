import { Navigate } from "react-router-dom";

function LogoutPage() {
  localStorage.removeItem("member");
  return <Navigate to="/" />;
}

export default LogoutPage;
