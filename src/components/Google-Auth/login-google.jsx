import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginGoogle = ({ handleSuccess }) => {
    const handleError = () => {
        console.log("Google Authentication Failed");
    };

    return (
        <>
            <div className="flex justify-center w-full items-center mb-4">
                <button
                    className="flex items-center justify-center py-2 px-10 md:px-20 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="button"
                    onClick={() => console.log('Google Sign-in')}
                >
                    <svg viewBox="0 0 24 24" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                            fill="#F44336"/>
                        <path
                            d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                            fill="#2196F3"/>
                    </svg>
                    <span className="ml-2">Sign in with Google</span>
                </button>
            </div>
            {/*<div style={{textAlign: "center", marginTop: "50px"}}>*/}
            {/*    <h1>Google Authentication with React</h1>*/}
            {/*    {user ? (*/}
            {/*        <div>*/}
            {/*            <h2>Welcome, {user.name}</h2>*/}
            {/*            <img src={user.picture} alt="profile" width="100"/>*/}
            {/*            <p>Email: {user.email}</p>*/}
            {/*            <button onClick={() => setUser(null)}>Logout</button>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
                    <GoogleLogin onSuccess={handleSuccess} onError={handleError}/>
            {/*    )}*/}
            {/*</div>*/}
        </>
    )
        ;
};

export default LoginGoogle;
