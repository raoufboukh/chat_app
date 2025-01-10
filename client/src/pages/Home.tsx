import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/home").then((res) => {
      if (res.data !== "Success") {
        navigate("/login");
      }
    });
  });
  return (
    <>
      <div className="text-4xl">Hello Mister</div>
      <button
        className="text-4xl"
        onClick={() => {
          axios.get("http://localhost:5000/logout").then(() => {
            navigate("/login");
          });
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Home;
