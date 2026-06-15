import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { getCurrentUser } from "./services/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice.js";
import Notes from "./pages/Notes";
import History from "./pages/History";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed.jsx";


export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "http://localhost:7000";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);


  return (
    <>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" replace/> } />
        <Route path="/auth" element={userData ? <Navigate to="/" replace/> : <Auth /> } />

        <Route path="/notes" element={userData ? <Notes /> : <Navigate to="/auth" replace/> } />
        <Route path="/history" element={userData ? <History /> : <Navigate to="/auth" replace/> } />
        <Route path="/pricing" element={userData ? <Pricing /> : <Navigate to="/auth" replace/> } />

        <Route path="/payment-success" element={<PaymentSuccess/>} />
        <Route path="/payment-failed" element={<PaymentFailed/>} />
      </Routes>
    </>
  );
};

export default App;
