import { useAtom } from 'jotai/react'
import { useState } from 'react'
import { deleteImg, deleteTodoAtom, getTodoAtom } from './Jotai/Jotai';
import { Button } from '@/components/ui/button';
import { AddUserAtom } from '@/components/AddUserAtom';
import { EditUserAtom } from '@/components/EditUserAtom';
import AddImgAtom from '@/components/AddImgAtom';

interface ITodo{
    id:number,
    name:string,
    description:string,
    isComplete:boolean,
    images:{id:number,imageName:string}[]
}

export default function Jotai() {
  const [data]=useAtom(getTodoAtom)
  const [,deleteUser]=useAtom(deleteTodoAtom)
  const [,deleteI]=useAtom(deleteImg)
  const [open,setOpen]=useState(false)
  const [openE,setOpenE]=useState(false)
  const [openI,setOpenI]=useState(false)
  const [name,setName]=useState("")
  const [desc,setDesc]=useState("")
  const [idE,setIdE]=useState<number | string>(0)
  const [idI,setIdI]=useState<number | string>(0)

  const handelEdit=(e:ITodo)=>{
    setName(e.name)
        setDesc(e.description)
        setIdE(e.id)
        setOpenE(true)
  }
  
  return (
    <>
    <AddUserAtom open={open} setOpen={setOpen} />
    <AddImgAtom open={openI} setOpen={setOpenI} id={idI} />
    <EditUserAtom open={openE} setOpen={setOpenE} name={name} setName={setName} desc={desc} setDesc={setDesc} id={idE} />
    <div className='flex w-[90%] m-auto mt-6 mb-6 items-center justify-between'>
      <h1 className='font-bold text-3xl '>Todo List</h1>
      <Button onClick={()=>setOpen(true)} >Add User</Button>
    </div>
      <div>
        <table className='border border-gray-500 p-2 mt-8 w-[90%] m-auto'>
            <thead>
                <th className='border border-gray-500 p-2'>Name</th>
                <th className='border border-gray-500 p-2'>Description</th>
                <th className='border border-gray-500 p-2'>Status</th>
                <th className='border border-gray-500 p-2'>All</th>
            </thead>
            <tbody>
                 {data?.map((e:ITodo)=>(
                    <tr key={e.id}>
                      <td className='border border-gray-500 p-2 w-[20%]'>
                        <div className='flex  gap-2 w-[70%]'>
                        <div className='w-[99%] flex overflow-x-auto gap-2'>
                                                 {e.images.map((img:{id:number,imageName:string})=>(
                                                    <div>
                                                    <img className='' src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} alt="" />
                                                    <Button onClick={()=>deleteI({id:img.id})} >Delete Img</Button>
                                                    </div>
                                                ))}
                                            </div>
                                            {e.name}
                                            </div>  
                                             </td>
                                        <td className='border text-center border-gray-500 p-2'>{e.description}</td>
                                        <td className='border text-center  border-gray-500 p-2'>{e.isComplete?"Active":"Inactive"}</td>
                                        <td className='border text-center border-gray-500 p-2'>
                                            <Button onClick={()=>deleteUser({id:e.id})}>Delete</Button>
                                            <Button onClick={()=>handelEdit(e)}  >Edit</Button>
                                            <Button onClick={()=>{setOpenI(true),setIdI(e.id)}} >Add Img</Button>
                                        </td>
                                    </tr>
                                ))}
            </tbody>
        </table>
      </div>
    </>
  )
}
