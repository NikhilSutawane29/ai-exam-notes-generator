import React, { useEffect } from "react";
import { motion } from "motion/react";
import { FaTimesCircle } from "react-icons/fa";
import { getCurrentUser } from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser(dispatch); // we update our current user after payment done

    const t = setTimeout(() => {
      navigate("/"); // after payment done we navigate our user onto "home page" at 5 sec
    }, 5000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="text-red-500 text-6xl"
      >
        <FaTimesCircle />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-red-600"
      >
        Payment Failed
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.36 }}
        className="text-sm text-gray-500"
      >
        Redirecting to home...
      </motion.p>
    </div>
  );
};

export default PaymentFailed;
