import React from 'react'
import {X} from 'lucide-react'
import {Link,useParams} from 'react-router-dom'

function AddFile() {
    let {id}=useParams();
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-90 flex justify-center items-center z-2'>
        <form action="" className='w-1/3 h-max bg-gray-800 p-5 rounded-lg flex flex-col gap-5 text-white'>
            <span className='text-2xl flex justify-between items-center'>Create New File  <Link to={`/code/workplace/stroage/files/${id}`}><X size={20} className='text-gray-500 cursor-pointer' /></Link></span>
            <label htmlFor="" className='flex flex-col gap-2'>File Name
                <input type="text"  placeholder='Enter file name' className='w-full p-3 bg-gray-700 rounded-lg outline-0 focus:outline-1 focus:outline-blue-600'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>Language
                <select name="" id="" className='w-full p-3 bg-gray-700 rounded-lg outline-0 focus:outline-1 focus:outline-blue-600'>
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                </select>
            </label>
            <span className='flex justify-end w-full gap-4'>
                <Link to={`/code/workplace/stroage/files/${id}`}><button className='cursor-pointer rounded-lg px-3 py-2 bg-gray-700 hover:bg-gray-600'>Cancel</button></Link>
                <button type="submit" className='cursor-pointer rounded-lg px-3 py-2 bg-blue-600 hover:bg-blue-700'>Create File</button>
            </span>
        </form>

    </div>
  )
}

export default AddFile