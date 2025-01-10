/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Hero from "./pages/Hero.tsx";
import Home from "./pages/Home.tsx";
import { useAuthStore } from "./store/AuthStore.ts";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import SettingsPage from "./pages/Settings.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  const { user, checkAuth, isChecking } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ user });
  if (isChecking && !user)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Hero /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={"/"} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
