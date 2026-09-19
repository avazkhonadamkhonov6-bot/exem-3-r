import { useEffect, useState } from 'react'
import { TodoList } from './Jotai/Zustand/zustand'
import { Button } from '@/components/ui/button';
import { AddUserz } from '@/components/AddUserZ';
import { EditUserz } from '@/components/EditUserz';
import AddImgz from '@/components/AddImgz';

interface ITodo{
    id:number,
    name:string,
    description:string,
    isComplete:boolean,
    images:{id:number,imageName:string}[]
}

export default function Zustand() {
  const {data,getTodo,deleteTodo}=TodoList((state)=>state)
  const [open,setOpen]=useState(false)
  const [openE,setOpenE]=useState(false)
  const [openI,setOpenI]=useState(false)
  const [name,setName]=useState("")
  const [desc,setDesc]=useState("")
  const [idx,setIdx]=useState<number | string>(0)
  const [idE,setIdE]=useState<number | string>(0)

  useEffect(()=>{
    getTodo()
  },[])


  const handelEdit=(e:ITodo)=>{
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
    <div className='flex w-[90%] m-auto mt-6 mb-6 items-center justify-between'>
      <h1 className='font-bold text-3xl '>Todo List</h1>
      <Button onClick={()=>setOpen(true)} >Add User</Button>
    </div>
      <div className='flex items-center gap-3 flex-wrap'>
        {data.map((e:ITodo)=>(
          <div className='border border-gray-400 w-[23%]  p-4' key={e.id}>
            <div className='w-full flex items-center overflow-x-auto gap-3'>
              {e.images.map((img:{id:number,imageName:string})=>(
                <div>
                  <img className='w-full h-52' src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} alt="" />
                  <Button>Delete Img</Button>
                </div>
              ))}
            </div>
            <h1>{e.name}</h1>
            <h3>{e.description}</h3>
            <p>{e.isComplete?'Active':"Inactive"}</p>
            <Button onClick={()=>deleteTodo({id:e.id})} >Delete</Button>
            <Button onClick={()=>handelEdit(e)} >Edit</Button>
            <Button onClick={()=>{setOpenI(true),setIdx(e.id)}}>Add Img</Button>
          </div>
        ))}
      </div>
    </>
  )
}
