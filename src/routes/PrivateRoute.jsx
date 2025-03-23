import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({allowedRoles, allowedIndustries, children }) => {
    const { isAuthenticated, industry, role } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" />;
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
