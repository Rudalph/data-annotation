"use client";

import React, { useState } from "react";
import SigninPage from "../components/Signin";
import SignupPage from "../components/Signup";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center pt-10 px-4">
            
            {/* Top Toggle */}
            <div className="mb-10">
                <div className="bg-base-200 rounded-2xl p-2 shadow-md flex gap-2">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isLogin
                                ? "bg-neutral text-white shadow-md scale-105"
                                : "bg-transparent text-base-content hover:bg-base-300"
                        }`}
                    >
                        Sign In
                    </button>

                    <button
                        onClick={() => setIsLogin(false)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            !isLogin
                                ? "bg-neutral text-white shadow-md scale-105"
                                : "bg-transparent text-base-content hover:bg-base-300"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Auth Card */}
            <div className="w-full max-w-xl flex justify-center">
                {isLogin ? <SigninPage /> : <SignupPage />}
            </div>
        </div>
    );
}