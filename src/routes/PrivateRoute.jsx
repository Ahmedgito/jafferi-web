import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedIndustries, children }) => {
    const { isAuthenticated, industry } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    if (allowedIndustries && !allowedIndustries.includes(industry)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
