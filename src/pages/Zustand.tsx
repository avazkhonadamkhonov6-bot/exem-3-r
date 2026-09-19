import React, { useEffect, useState } from 'react'
import { TodoList } from './Jotai/Zustand/zustand'
import { Button } from '@/components/ui/button';
import { AddUserz } from '@/components/AddUserZ';
import { EditUserz } from '@/components/EditUserz';
import AddImgz from '@/components/AddImgz';

export default function Zustand() {
  const {data,getTodo,deleteTodo}=TodoList((state)=>state)
  const [open,setOpen]=useState(false)
  const [openE,setOpenE]=useState(false)
  const [openI,setOpenI]=useState(false)
  const [name,setName]=useState(false)
  const [desc,setDesc]=useState(false)
  const [idx,setIdx]=useState(null)
  const [idE,setIdE]=useState(null)

  useEffect(()=>{
    getTodo()
  },[])


  const handelEdit=(e)=>{
        setName(e.name)
        setDesc(e.description)
        setIdE(e.id)
        setOpenE(true)
    }

  
  return (
    <>
    <EditUserz open={openE} setOpen={setOpenE} name={name} setName={setName} desc={desc} setDesc={setDesc} id={idE} />
    <AddUserz open={open} setOpen={setOpen} />
    <AddImgz open={openI} setOpen={setOpenI} id={idx} />
    <div>
      <Button onClick={()=>setOpen(true)} >Add User</Button>
    </div>
      <div>
        {data.map((e)=>(
          <div className='border border-gray-400 w-[23%]  p-4' key={e.id}>
            <div className='w-full'>
              {e.images.map((img)=>(
                <div>
                  <img className='w-full h-52' src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} alt="" />
                  <Button>Delete Img</Button>
                </div>
              ))}
            </div>
            <h1>{e.name}</h1>
            <h3>{e.description}</h3>
            <p>{e.isComplete?'Active':"Inactive"}</p>
            <Button onClick={()=>deleteTodo(e.id)} >Delete</Button>
            <Button onClick={()=>handelEdit(e)} >Edit</Button>
            <Button onClick={()=>{setOpenI(true),setIdx(e.id)}}>Add Img</Button>
          </div>
        ))}
      </div>
    </>
  )
}
