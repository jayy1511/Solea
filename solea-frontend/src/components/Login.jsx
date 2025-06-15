import React, { useState } from "react";
import { Link } from "react-router-dom";
import airplaneBg from '../assets/images/airplane_bg.jpg';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black">
      {/* Left side - Image or video */}
      <div className="w-1/2 hidden lg:block">
        <img
          src={airplaneBg}
          alt="Travel visual"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 text-white bg-[#000000]">
        <div className="w-full max-w-md">
          {/* Toggle Login / Signup */}
          <div className="flex justify-center items-center gap-6 mb-8 text-3xl font-semibold oswald">
            <span
              className={`cursor-pointer ${isLogin ? "text-white" : "text-gray-500"}`}
              onClick={() => setIsLogin(true)}
            >
              • Log in
            </span>
            <span
              className={`cursor-pointer ${!isLogin ? "text-white" : "text-gray-500"}`}
              onClick={() => setIsLogin(false)}
            >
              • Sign Up
            </span>
          </div>

          <form className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-1 oswald">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-white bg-black text-white placeholder-white rounded-md focus:outline-none focus:border-brightRed"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-1 oswald">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-white bg-black text-white placeholder-white rounded-md focus:outline-none focus:border-brightRed"
              />
            </div>

            {/* Confirm password (signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirm" className="block text-sm mb-1 oswald">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm"
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 border border-white bg-black text-white placeholder-white rounded-md focus:outline-none focus:border-brightRed"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-brightRed hover:text-white transition-all"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          {/* Extra Links */}
          {isLogin && (
            <div className="text-sm mt-6 text-center text-gray-400">
              <p>
                Forgot your password?{" "}
                <Link to="/reset" className="text-white hover:underline">
                  Reset here
                </Link>
              </p>
              <p>
                Trouble logging in?{" "}
                <Link to="/contact" className="text-white hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
