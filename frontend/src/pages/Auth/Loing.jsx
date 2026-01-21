import { Link } from "react-router-dom";
import { Button, Input } from "../../components";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔗 API CALL HERE
    console.log(form);
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

        <Button
          type="submit"
          fullWidth
          className="mt-6"
        >
          Login
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
