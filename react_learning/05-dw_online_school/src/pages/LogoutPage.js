import { Navigate } from "react-router-dom"

function LogoutPage(){
    localStorage.removeItem("token");
    return <Navigate to="/" />
}

export default LogoutPage;