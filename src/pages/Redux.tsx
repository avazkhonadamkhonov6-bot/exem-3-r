import { deleteImg, deleteTodo, getTodo } from '@/api/todo.api'
import AddImg from '@/components/AddImg'
import { AddUser } from '@/components/AddUser'
import { EditUser } from '@/components/EditUser'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'

interface ITodo{
    id:number,
    name:string,
    description:string,
    isComplete:boolean,
    images:{id:number,imageName:string}[]
}

export default function Redux() {
    const {data}=useSelector((state:RootState)=>state.Todo)
    const [open,setOpen]=useState(false)
    const [openE,setOpenE]=useState(false)
    const [openI,setOpenI]=useState(false)
    const [name,setName]=useState("")
    const [desc,setDesc]=useState("")
    const [idx,setIdx]=useState<number | string>(0)
    const [idE,setIdE]=useState<number | string>(0)
    const dispatch=useDispatch<AppDispatch>()
    console.log(data);
    
    useEffect(()=>{
        dispatch(getTodo())
    },[dispatch])

    const handelEdit=(e:ITodo)=>{
        setName(e.name)
        setDesc(e.description)
        setIdE(e.id)
        setOpenE(true)
    }

  return (
    <>
    <EditUser open={openE} setOpen={setOpenE} name={name} setName={setName} desc={desc} setDesc={setDesc} id={idE} />
    <AddUser open={open} setOpen={setOpen} />
    <AddImg open={openI} setOpen={setOpenI} id={idx} />
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
                                    <Button onClick={()=>dispatch(deleteImg({id:img.id}))}>Delete Img</Button>
                                    </div>
                                ))}
                            </div>
                            {e.name}
                            </div>  
                             </td>
                        <td className='border text-center border-gray-500 p-2'>{e.description}</td>
                        <td className='border text-center  border-gray-500 p-2'>{e.isComplete?"Active":"Inactive"}</td>
                        <td className='border text-center border-gray-500 p-2'>
                            <Button onClick={()=>dispatch(deleteTodo({id:e.id}))}>Delete</Button>
                            <Button onClick={()=>handelEdit(e)} >Edit</Button>
                            <Button onClick={()=>{setOpenI(true),setIdx(e.id)}}>Add Img</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </>
  )
}
