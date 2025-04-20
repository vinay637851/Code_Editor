import  { useEffect ,useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import { LogOut,ChevronLeft,Trash2,PencilLine,FilePlus,FileText,FileEdit, Code2 } from 'lucide-react'
import AddFile from "./AddFile"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function FileList() {
    const { id } = useParams();
    let [fileData,SetfileData]=useState({});
    useEffect(function(){
        GetFileData()
        async function GetFileData(){
            let res=await fetch(`http://localhost:3000/code/workplace/stroage/get/${id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data=await res.json();
            SetfileData(data.files)
            return;
        }
    },[id])
  return (
    <div className='w-screen min-h-screen h-max bg-gray-950 flex flex-col'>
        <div className="h-[10vh] bg-gray-900 flex justify-between px-10 z-1 items-center sticky top-0">
            <Link to="/"><LogOut className="text-gray-400 rotate-180"/></Link>
        </div>
        <div className='w-full h-max py-10 flex justify-center items-center text-white'>
            <div className='w-2/3 min-h-[90vh] max-h-max flex flex-col gap-5'>
                <Link to="/code/workplace/stroage"><span className='flex gap-1'><ChevronLeft/> Back to Workspace</span></Link>
                <div className='w-full min-h-[130vh] max-h-max bg-gray-900 rounded-lg'>
                    <div className='h-[20vh] bg-gray-800 flex justify-between border-b-1 border-gray-700 items-center gap-10 px-5 rounded-t-lg'>
                        <span className='flex gap-2 flex-col'>
                            <h1 className='text-3xl font-semibold'>{fileData.folder_name} </h1>
                            <p className='text-gray-500  line-clamp-2'>{fileData.folder_description}</p>
                            <p className='text-gray-600 text-xs'>{fileData.folder_date}</p>
                        </span>
                        <span className='flex gap-5 text-gray-400'>
                            <PencilLine className='cursor-pointer'/>
                            <Trash2 className='cursor-pointer'/>
                        </span>
                    </div>
                    <div className='flex w-full min-h-[110vh] '>
                        <div className='w-1/4  border-r-1 border-gray-700 p-5'>
                            <span className='flex justify-between items-center border-b-1  border-gray-700 pb-5'>
                                <h1 className='text-xl'>Files</h1>
                                <Link to={`/code/workplace/stroage/files/${id}/add`}><button className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer duration-200"><FilePlus size={20}/>Add file</button></Link>
                            </span>
                            <span>
                                <FileContainer name="vinaysharm.css"/>
                                <FileContainer name="vinay.css"/>
                                <FileContainer name="vinay.css"/>
                                <FileContainer name="vinay.css"/>
                            </span>
                        </div>
                        <div className='h-max  w-3/4 p-5'>
                            <span className='flex justify-between gap-2 items-center border-b-1  border-gray-700 h-[20vh]'>
                                <span className='flex gap-2 flex-col'>
                                    <h1 className='text-xl line-clamp-1'>vinay dashjdahdja dagdsadga sajdsjh .css</h1>
                                    <p className='text-gray-500 text-xs'>Last updated :- 21/04/2025 06:53 PM</p>
                                </span>
                                <span className='flex gap-5 text-gray-400'>
                                    <button className="flex items-center cursor-pointer gap-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-200 shadow-sm"><Code2 size={20} />Editor</button>
                                    <button className="flex items-center cursor-pointer text-nowrap gap-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-200 shadow-sm"><FileEdit size={20} />Edit File</button>
                                </span>                            
                            </span>
                            <div className='w-full h-max p-5'>
                                <textarea name="" id="" className='bg-gray-800 w-full min-h-[80vh]'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )

  function FileContainer({name}){
    return(
        <div className='flex justify-between items-center my-3 text-gray-400 cursor-pointer hover:bg-gray-800 p-2 rounded-lg duration-200'>
            <span className='flex gap-2 items-center'>
                <FileText size={20}/>
                <p className=' line-clamp-1'>{name}</p>
            </span>
            <Trash2 size={20}/>
        </div>
    )
  }
}

export default FileList