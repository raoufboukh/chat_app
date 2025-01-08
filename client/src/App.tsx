/* eslint-disable @typescript-eslint/no-unused-vars */
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Hero from "./components/Hero";
import Home from "./components/chat/Home";
import { useAuthStore } from "./store/AuthStore.ts";

function App() {
  const { user, checkAuth } = useAuthStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
