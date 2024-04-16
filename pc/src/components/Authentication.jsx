import React, { useState } from "react";
import Login from "..components/Login";
import Register from "..components/Register";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div>
      {isLogin ? (
        <Login toggleAuthMode={toggleAuthMode} />
      ) : (
        <Register toggleAuthMode={toggleAuthMode} />
      )}
    </div>
  );
};

export default Authentication;