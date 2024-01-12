import React, { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from "framer-motion"
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckboxOutline } from "react-icons/io";
import {
    HamburgerMenuIcon,
} from '@radix-ui/react-icons';
import dataBaseService from '../appwrite/database';
import storageService from '../appwrite/storage';

const Doc = ({ reference, title, description, id, checked = false, image }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [color, setColor] = useState("slate");

    const toggleCheckbox = async() => {
        setIsChecked(!isChecked);
        console.log(isChecked);
        if (isChecked == true) {
            console.log(id);
            const doc = await dataBaseService.getBinDoc(id);
            console.log(doc);
            await dataBaseService.createDoc(doc.Title, doc.Description, doc.userId, doc.image);
            dataBaseService.deleteBinDoc(id);
        } else {
            console.log(id);
            const doc = await dataBaseService.getDoc(id);
            console.log(doc);
            await dataBaseService.CreateBinDoc(doc.Title, doc.Description, doc.userId, doc.image);
            dataBaseService.deleteDoc(id);
        }
    };

    return (
        <motion.div
            dragConstraints={reference}
            drag
            whileDrag={{ scale: 1.1, opacity:0.8}}
            whileHover={{
                scale: 1.1,
                transition: { duration: 1.5 },
            }}
            className={` min-w-1/6 w-1/5 max-sm:w-full h-fit max-lg:w-[40%] ${color == "slate" ? "bg-slate-700" : color == "pink" ? "bg-pink-700" : color == "yellow" ? "bg-yellow-700" : "bg-violet-700"} rounded-xl p-3 relative `}
        >
            <button
                type="button"
                className={` text-white text-2xl h-5 w-5 absolute rounded-md focus:outline-none`}
                onClick={toggleCheckbox}
            >
                {
                isChecked == !checked ?  <IoIosCheckboxOutline /> :  <MdCheckBoxOutlineBlank /> 
                }
            </button>
            <h1 className={`text-white text-center ${isChecked ? "line-through" : ""} text-lg shadow-md mb-10 ml-10`}>{title}</h1>
            <p className='text-slate-200 text-center mb-10'>{description}</p>
            
            {image && <img src={storageService.getFilePreview(image)} alt="" className='w-full' />
            }

            <DropdownMenu.Root >
                <DropdownMenu.Trigger asChild className=' absolute bottom-2 right-2'>
                    <button
                        className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                        aria-label="Customise options"
                    >
                        <HamburgerMenuIcon />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={5}
                    >
                        <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1" onClick={() => setColor("slate")}>
                            slate
                        </DropdownMenu.Item>

                        <DropdownMenu.Item className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1" onClick={() => setColor("pink")}>
                            Pink
                        </DropdownMenu.Item>

                        <DropdownMenu.Item className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1" onClick={() => setColor("violet")}>
                            violet
                        </DropdownMenu.Item>

                        <DropdownMenu.Item className="text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1" onClick={() => setColor("yellow")}>
                            yellow
                        </DropdownMenu.Item>

                        <DropdownMenu.Arrow className="fill-white" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </motion.div>
    )
}

export default Doc