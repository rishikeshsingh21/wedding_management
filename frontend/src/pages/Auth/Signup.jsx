import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../../components";
import { FcGoogle } from "react-icons/fc";
import { loginUser, registerUser } from "../../api/auth.api";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../context/slices/authSlice";

const Signup = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const role = params.get("role") || "couple";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // 1️⃣ Register
      await registerUser(form);

      // 2️⃣ Auto login
      const loginRes = await loginUser({
        email: form.email,
        password: form.password,
      });

      const { user, accessToken } = loginRes.data.data;

      dispatch(
        loginSuccess({
          user,
          token: accessToken,
        })
      );
      console.log("user:",user)
      console.log("accessToken:",accessToken)

      localStorage.setItem("role", role);
      localStorage.setItem("token", accessToken);

      navigate(role === "vendor" ? "/" : "/");
    } catch (error) {
      dispatch(
        loginFailure(
          error?.response?.data?.message || "Signup failed"
        )
      );
    }
  };

  const handleGoogleSignup = () => {
    localStorage.setItem("role", role);
    console.log("Google Signup", role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg-soft.png')] bg-cover px-4 mt-4 py-14">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-[#9E3A4A] text-center">
          Create Your Account
        </h2>

        <p className="text-sm text-gray-600 text-center mt-2">
          Signing up as{" "}
          <span className="font-medium capitalize">{role}</span>
        </p>

        <div className="mt-6 space-y-4">
          <Input label="Full Name" name="name" onChange={handleChange} />
          <Input label="Email" name="email" onChange={handleChange} />
          <Input label="Phone Number" name="phone" onChange={handleChange} />
          <Input
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        {/* 🔥 BUTTON STATE CHANGE */}
        <Button
          type="submit"
          fullWidth
          disabled={loading}
          className="mt-6"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white rounded-lg py-3 text-sm font-medium hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          Sign up with Google
        </button>

        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
