import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const LoginGoogle = ({ handleSuccess }) => {
    const handleError = () => {
        console.log("Google Authentication Failed");
    };

    return (
        <div className="flex justify-center mb-3 w-full items-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_blue"
                shape="pill"
                text="continue_with"
                size="large"
                width="100%"
                className="flex items-center justify-center  py-2 px-10 md:px-20 bg-white hover:bg-gray-200 
                           text-gray-700 w-full transition ease-in duration-200 text-base font-semibold 
                           shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            />
        </div>
    );
};

export default LoginGoogle;
