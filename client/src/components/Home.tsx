import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-black text-white relative w-full h-screen">
      <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl mb-6">Welcome👋</h1>
        <p className="text-2xl">
          <Link className="hover:underline" to={"/login"}>
            Login
          </Link>
          /
          <Link className="hover:underline" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
