import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import databaseService from '../appwrite/database.js'
import authService from '../appwrite/auth.js'
import '../../src/images/addAvatar.png'
import storageService from '../appwrite/storage.js';


const AddDoc = () => {

    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [userId, setUserId] = useState("");
    const [image, setImage] = useState(null);
    const [fileIds, setFileIds] = useState([]);

    useEffect(() => {
        getUserId();
    },[])

    const getUserId = async() => {
        const userInfo =  await authService.getCurrentUser();
        if(userInfo) setUserId(userInfo.$id);
    }

    const AddDocTodatabase = async() => {
        if(title.trim() == "" || discription.trim() == ""){
            alert('title and description are required fields');
        } else {
            if(image != null){
                const file = await storageService.uploadFile(image)
                if(file) {
                    const fileId = file.$id
                    setFileIds(fileId);
                    await databaseService.createDoc(title,discription,userId,fileId)
                }
            } else {
                await databaseService.createDoc(title,discription,userId,null)
            }
                setDiscription("");
                setTitle("");
                setImage("")
        }
    }


    
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className="text-white shadow-blackA4 hover:bg-mauve3 flex flex-col items-center justify-center rounded-lg bg-slate-400 px-4 py-2 font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mx-5 ">
                    <p>Add Doc</p>
                    <p>+</p>
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[30%] left-[50%] w-3/5 translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none  max-sm:w-full">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Add new Docunment to complete
                    </Dialog.Title>
                    <fieldset className="mb-[15px] flex items-center gap-5">

                        <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="Title"
                            placeholder='Title'
                            value={title}
                            onChange={(e) => {
                                e.preventDefault()
                                setTitle(e.target.value)
                            }}
                        />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <label className="max-sm:hidden  w-[90px] text-right text-[15px] text-white" htmlFor="description">
                            description
                        </label>
                        <textarea
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex  w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] h-28"
                            id="description"
                            placeholder='Description'
                            value={discription}
                            onChange={(e) => {
                                e.preventDefault();
                                setDiscription(e.target.value)
                            }}
                        />
                    </fieldset>

                    <fieldset className="mb-[15px] flex items-center gap-5 relative">
                        <label 
                        className=" text-[15px] text-violet11 flex justify-center  items-center absolute left-1/2 mt-10 cursor-pointer" htmlFor="uploadImage" 
                        >
                            <img src="addAvatar.png" alt="" className='h-10 ' />
                            <h1>Add Image</h1>
                        </label>
                        <input
                            className="hidden"
                            id="uploadImage"
                            placeholder='uploadImage'
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </fieldset>
                    
                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none" onClick={AddDocTodatabase}>
                                Add
                            </button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default AddDoc