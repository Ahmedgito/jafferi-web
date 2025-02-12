import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../store/slices/authSlices";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    if (validateForm()) {
      dispatch(loginSuccess({
        user: 'yamaan',
        token: "no-token"
      }));
      navigate("/");
    }else{
      setTimeout(() => {
        dispatch(loginFailure());
      }, 1500);
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

        <div className="relative py-3 sm:max-w-xl sm:mx-auto ">
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

                  <div className="flex justify-center w-full items-center mb-4">
                    <button
                        className="flex items-center justify-center py-2 px-10 md:px-20 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        type="button"
                        onClick={() => console.log('Google Sign-in')}
                    >
                      <svg viewBox="0 0 24 24" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                        <path d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z" fill="#F44336" />
                        <path d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z" fill="#2196F3" />
                      </svg>
                      <span className="ml-2">Sign in with Google</span>
                    </button>
                  </div>

                  <button
                      className="py-2 px-4 bg-[#003505] hover:bg-green-800 text-white w-full rounded-lg font-semibold"
                      type="submit"
                      disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Log in'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default Signin;
