import React, { useEffect, useRef, useState } from "react";
import Doc from "./Doc";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { logout } from "../store+slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddDoc from "./AddDoc";
import authService from "../appwrite/auth.js";
import dataBaseService from "../appwrite/database.js";
import { Link } from "react-router-dom";

const Front = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [docs, setDocs] = useState([])
    const [userId, setUserId] = useState("");

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login')
    }
    useEffect(() => {
        getDocs();
        getUserId();
    })

    const getDocs = async () => {
        const data = await dataBaseService.getDocs(0);
        setDocs(data.documents)
    }

    const getUserId = async () => {
        const x = await authService.getCurrentUser();
        setUserId(x.$id);
    }

    const reference = useRef(null);

    return (

        <div ref={reference} className="w-screen h-screen text-white absolute top-0 left-0 bg-transparent overflow-scroll" >
            <div className="flex h-28 w-full items-center justify-end relative">
                <h1 className="text-xl font-semibold absolute bottom-0 left-1/2 -translate-x-[100%] hover:text-orange-500">
                    <Link to="/docs" >
                        Documents
                    </Link>
                </h1>
                <h1 className="text-xl font-semibold absolute bottom-0 left-1/2 -translate-x-[100%] ml-3">
                    |
                </h1>
                <h1 className="text-xl font-semibold absolute bottom-0 left-1/2 mx-5 hover:text-orange-500">
                    <Link to="/bin">
                        Bin
                    </Link>
                </h1>
                <div className="flex">
                    <AlertDialog.Root>
                        <AlertDialog.Trigger asChild>
                            <button className="px-4 py-2 rounded-xl bg-slate-400 hover:bg-slate-600">
                                Logout
                            </button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                    Are you absolutely sure? You want to log out
                                </AlertDialog.Title>
                                <div className="flex justify-end gap-[25px]">
                                    <AlertDialog.Cancel asChild>
                                        <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                            Cancel
                                        </button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action asChild>
                                        <button className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                                            onClick={logoutHandler}
                                        >
                                            Yes, Log out
                                        </button>
                                    </AlertDialog.Action>
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>
                    </AlertDialog.Root>

                    <HoverCard.Root >
                        <HoverCard.Trigger asChild>
                            <button className="" >
                                <AddDoc />
                            </button>
                        </HoverCard.Trigger>

                        <HoverCard.Portal >
                            <HoverCard.Content>
                                <div className="text-white rounded-md px-3 max-sm:hidden">
                                    Click to Add new Documents to your collection
                                </div>
                                <HoverCard.Arrow className="fill-white" />
                            </HoverCard.Content>
                        </HoverCard.Portal>
                    </HoverCard.Root>
                </div>
            </div>

            <div className="flex flex-wrap flex-row gap-5 overflow-scroll">
                {
                    docs?.map((doc) => {
                        // console.log(doc);
                        if (userId == doc.userId) {
                            return (
                                <Doc reference={reference} title={doc.Title} description={doc.Description} id={doc.$id} image={doc.image} checked={false} key={doc.$id} />
                            )
                        }
                    })
                }

            </div>
        </div>
    );
};

export default Front;
