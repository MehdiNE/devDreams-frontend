import React from "react";
import LoginForm from "./LoginForm";

function Auth() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="flex h-[520px] w-7/12 rounded-lg bg-white p-2 shadow-sm">
        <div className="w-1/2">
          <LoginForm />
        </div>

        <div className="w-1/2 rounded-md bg-gradient-to-r from-blue-800 to-indigo-900"></div>
      </div>
    </div>
  );
}

export default Auth;
