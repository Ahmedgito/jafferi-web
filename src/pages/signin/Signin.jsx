import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../store/slices/authSlices";
import axios from "axios";
import LoginGoogle from "../../components/Google-Auth/login-google";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector(state => state.auth);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    dispatch(loginFailure());
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    let valid = true;
    let errors = { email: '', password: '' };

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    if (validateForm()) {

      try{
          const response = await axios.post(`${apiUrl}/auth/login`,
      {
              email: email,
              password: password
            });
            if(response.status === 200){
              setSuccess(response.data.message);

              dispatch(loginSuccess({
                  user: response.data.user_details,
                  token: response.data.AuthToken
                }));
              localStorage.setItem("AuthToken", response.data.AuthToken);
              localStorage.setItem("AuthUser", JSON.stringify(response.data.user_details));

              setTimeout(() => {
                navigate("/");
              }, 2000);
            }
        }catch (err) {
          setErrors({ email: '', password: err.response?.data?.error_message || "Login failed" });
          dispatch(loginFailure());
        }
    }else{
      setTimeout(() => {
        dispatch(loginFailure());
      }, 1500);
    }
  };

  const handleSuccess = async (response) => {
    const idToken = response.credential; // This is the JWT Token from Google

    try {
      const response = await axios.post(`${apiUrl}/auth/google-auth`,
          { token: idToken }
      );

      if (response.status === 200) {
        setSuccess(response.data.message);

        dispatch(loginSuccess({
          user: response.data.user_details,
          token: response.data.AuthToken
        }));
        localStorage.setItem("AuthToken", response.data.AuthToken);
        localStorage.setItem("AuthUser", JSON.stringify(response.data.user_details));

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setErrors({ email: '', password: error.response?.data?.error_message || "Login failed" });
      dispatch(loginFailure());
    }
  };

  return (
      <>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-40 bg-[#003505] clip-slant -z-10"></div>
        </div>
        <style>
          {`
          .clip-slant {
            clip-path: polygon(0 0, 100% 0, 100% 40%, 0 100%);
          }
        `}
        </style>

        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-center">JAFFERI ALLIANCE</h1>

              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                  <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                  <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                  <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-2 text-sm w-full"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                  <div className="flex items-center mt-1">
                    <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="text-sm text-gray-600 cursor-pointer">Show Password</label>
                  </div>

                  <div className="text-right mb-4">
                    <a className="text-xs font-semibold text-gray-500 hover:text-gray-600 cursor-pointer" href="#">
                      Forgot Password?
                    </a>
                  </div>
                  <LoginGoogle handleSuccess={handleSuccess}/>
                  <button
                      className="py-2 px-4 bg-[#003505] hover:bg-green-800 text-white w-full rounded-lg font-semibold"
                      type="submit"
                      disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Log in'}
                  </button>
                </form>
                {success && <p className="text-green-500 text-m text-center pt-4">{success}</p>}
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"/>
                <a
                    className="text-xs text-gray-500 uppercase font-bold dark:text-gray-800 cursor-pointer hover:underline"
                    onClick={() => navigate("/signup")}
                >
                  Don't Have an account? Signup
                </a>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"/>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default Signin;
