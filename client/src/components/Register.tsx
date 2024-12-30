import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center bg-black h-screen">
      <div className="w-[500px] shadow-md  shadow-gray-500  rounded-md text-white">
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
      </div>
    </div>
  );
};

export default Register;
