import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../api/auth.api";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../context/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await loginUser(form);

      const { user, accessToken } = res.data.data;

      dispatch(
        loginSuccess({
          user,
          token: accessToken,
        })
      );

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", user.role);

      navigate(user.role === "vendor" ? "/" : "/");
    } catch (error) {
      dispatch(
        loginFailure(
          error?.response?.data?.message || "Login failed"
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-soft.png')] bg-cover px-4 mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-[#9E3A4A] text-center">
          Login to Your Account
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Welcome back! Please sign in
        </p>

        <div className="mt-6 space-y-4">
          <Input
            label="Email or Phone"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email or Phone"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <div className="flex justify-end mt-2">
          <Link
            to="/forgot-password"
            className="text-xs text-pink-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* 🔥 BUTTON STATE */}
        <Button
          type="submit"
          fullWidth
          disabled={loading}
          className="mt-6"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-600 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
