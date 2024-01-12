import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store+slice/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginBtn = async () => {
        if (email.trim() === "" || password.trim() === "")
            return alert("Please enter all the fields.");
        else {
            try {
                const user = await authService.login({ email, password })
                if (user) {
                    const userData = await authService.getCurrentUser()
                    if (userData) {
                        dispatch(login(userData))
                        navigate("/docs")
                    }
                }
            } catch (error) {

            }
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-950">
            <div className="sm:w-1/2 bg-slate-100 px-10 rounded-xl w-full">
                <div className="mx-auto ">
                    <h1 className="text-xl font-bold text-center shadow-lg">
                        Sign in to your account
                    </h1>
                    <p className="text-center">
                        Don't have any account? <Link to="/">Sign up</Link>
                    </p>
                </div>
                <div className="mx-auto my-5">
                    <input
                        type="email"
                        lable="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email :"
                        className="h-12 w-full px-5 rounded-md my-1"
                    />

                    <input
                        type="password"
                        lable="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password :"
                        className="h-12 w-full px-5 rounded-md my-1"
                    />

                    <button
                        className="bg-blue-600 w-full my-3 py-2 rounded-lg text-white text-center"
                        onClick={loginBtn}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;