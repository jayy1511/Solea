import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import airplaneBg from "../assets/images/airplane_bg.jpg";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";


    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, form);

      if (isLogin) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        alert("Sign up successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black">
      {/* Left Side */}
      <div className="w-1/2 hidden lg:block">
        <img src={airplaneBg} alt="Travel" className="h-full w-full object-cover" />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 text-white bg-[#000000]">
        <div className="w-full max-w-md">
          {/* Toggle */}
          <div className="flex justify-center items-center gap-6 mb-8 text-3xl font-semibold oswald">
            <span
              className={`cursor-pointer oswald ${isLogin ? "text-white" : "text-gray-500"}`}
              onClick={() => setIsLogin(true)}
            >
              • Log in
            </span>
            <span
              className={`cursor-pointer oswald ${!isLogin ? "text-white" : "text-gray-500"}`}
              onClick={() => setIsLogin(false)}
            >
              • Sign Up
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm mb-1 oswald">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm mb-1 oswald">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-1 oswald">Password</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full mt-4 oswald px-6 py-3 text-white border-2 border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 rounded-md"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
