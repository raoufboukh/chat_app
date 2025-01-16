import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Eye, EyeOff, Loader2, Mail, Lock, MessageSquare } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPass] = useState(false);
  const { login, isLoggingIn } = useAuthStore();
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60"> Sign in to your account</p>
            </div>
          </div>
        </div>
        <form
          action=""
          className="space-y-6 px-6 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            login({ email, password });
          }}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute translate-y-2/3  left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered  w-full pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute translate-y-2/3  left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <div
                className="absolute right-3 translate-y-2/3 cursor-pointer"
                onClick={() => setShowPass(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="size-5 text-base-content/40" />
                ) : (
                  <EyeOff className="size-5 text-base-content/40" />
                )}
              </div>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="........"
              className="input input-bordered  w-full pl-10 placeholder:text-4xl placeholder:-translate-y-1"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary w-full my-4"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in "
              )}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with friends, share moments,and stay in touch with your loved ones."
      />{" "}
    </div>
  );
};

export default Login;
