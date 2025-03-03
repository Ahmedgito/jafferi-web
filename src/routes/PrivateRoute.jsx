import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedIndustries, children }) => {
    const { isAuthenticated, industry, role } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    if(role === 'admin'){
        return children
    }
    if(role === "helper"){
        return children
    }

    if (role === "seeker" && allowedIndustries && !allowedIndustries.includes(industry)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
