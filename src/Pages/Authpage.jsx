import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const { register, handleSubmit } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (isLogin) {
      const { error } = await signIn(data.email, data.password);
      if (error) alert(error.message);
      else navigate("/");
    } else {
      const { error } = await signUp(data.email, data.password);
      if (error) alert(error.message);
      else alert("Check your email to confirm your account");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-600">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded-md"
        />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        {isLogin ? "No account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-600 underline"
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
}
