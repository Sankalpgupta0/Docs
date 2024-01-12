import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store+slice/authSlice.js";
import dataBaseService from "../appwrite/database.js";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signupbtn = async (e) => {
        let user;
        if (name.trim() === "" || email.trim() == "" || password.trim() == "") {
            return alert("Enter All Credential");
        } else {
            user = await authService.createAccount({ email, password, name });
            if (user) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                }
                navigate("/docs");
            }
        }
    };


    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-950">
            <div className="sm:w-1/2 bg-slate-100 px-10 rounded-xl w-full">
                <div className="mx-auto ">
                    <h1 className="text-xl font-bold text-center shadow-lg">
                        Sign up to create account
                    </h1>
                    <p className="text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
                <div className="mx-auto my-5">
                    <input
                        type="text"
                        lable="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full Name :"
                        className="h-12 w-full px-5 rounded-md my-1"
                    />

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
                        className="bg-blue-600 w-full my-3 py-2 rounded-lg text-white text-center hover:bg-blue-800"
                        onClick={signupbtn}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;