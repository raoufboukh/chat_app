/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPassword, setShowPass] = useState(false);
  const { signUp, isSigninUp } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-4">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                {" "}
                Get Started with your free account
              </p>
            </div>
          </div>
        </div>
        <form
          action=""
          className="space-y-6 px-6 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:5000/register", { name, email, password })
              .then(() => {
                navigate("/login");
              });
          }}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute translate-y-2/3  left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 text-base-content/40" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered  w-full pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              required
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
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full my-4"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* <div className="w-[500px] shadow-md  shadow-gray-500  rounded-md text-white">
        <h1 className="text-center text-3xl">Register</h1>
        <form
          action=""
          className="px-16 py-5"
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:5000/register", { name, email, password })
              .then(() => {
                navigate("/login");
              });
          }}
        >
          <div>
            <label className="block w-fit" htmlFor="name">
              Name
            </label>
            <input
              className="bg-black border rounded-md outline-none border-gray-500 p-1 text-lg px-2 my-3 w-full"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block w-fit" htmlFor="email">
              Email
            </label>
            <input
              className="bg-black border rounded-md outline-none border-gray-500 p-1 text-lg px-2 my-3 w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block w-fit" htmlFor="pass">
              Password
            </label>
            <input
              className="bg-black border rounded-md outline-none border-gray-500 p-1 text-lg px-2 my-3 w-full"
              type="password"
              id="pass"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-500 px-4 py-2 rounded-md mx-auto block w-fit"
          >
            Register
          </button>
          <p className="text-center block my-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline hover:text-gray-500 transition-all"
            >
              Login
            </Link>
          </p>
        </form>
      </div> */}
    </div>
  );
};

export default Register;
