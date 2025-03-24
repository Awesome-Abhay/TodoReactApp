import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function Todo({item, handleCompletionCheck, handleDelete, handleEdit, lastTodoRef}) {

    let handleEditClick=(e)=>{
        e.stopPropagation();
        if(e.target.nodeName.toLowerCase()=="path"){
            handleEdit(e.target.parentElement.parentElement);
        }
        else if(e.target.nodeName.toLowerCase()=="svg"){
            handleEdit(e.target.parentElement)
        }
        else if(e.target.nodeName.toLowerCase()=='button'){
            handleEdit(e.target)
        }
    }
    let handleDeleteClick=(e)=>{
        e.stopPropagation();
        if(e.target.nodeName.toLowerCase()=='path')
            handleDelete(e.target.parentElement.parentElement);
        else if(e.target.nodeName.toLowerCase()=='svg')
            handleDelete(e.target.parentElement)
        else if(e.target.nodeName.toLowerCase()=='button')
            handleDelete(e.target)
    }
    return (
        <div
         onClick={handleCompletionCheck}
         ref={lastTodoRef}
         key={item.id} 
         className="todo flex justify-between px-2 select-none outline-offset-4 hover:outline-1 outline-violet-900 hover:bg-violet-100 transition-all duration-200 cursor-pointer">
            <div className="left flex gap-5">
                <input
                    className='cursor-pointer'
                    name={item.id}
                    onChange={handleCompletionCheck}
                    checked={item.isChecked}
                    type="checkbox" />
                <div className={`w-9/10 ${item.isChecked ? "line-through" : ""}`}>{item.todo}</div>
            </div>
            <div className="right flex gap-3 items-center">
                <button
                    name={item.id}
                    onClick={handleEditClick}
                    className='bg-violet-600 text-white cursor-pointer rounded-md p-1'><FaEdit onClick={handleEditClick}/>
                </button>
                <button
                    name={item.id}
                    onClick={handleDeleteClick}
                    className='bg-violet-600 text-white cursor-pointer text-sm rounded-md p-1'><MdDelete onClick={handleDeleteClick}/>
                </button>
            </div>
        </div>
    )
}

export default Todo