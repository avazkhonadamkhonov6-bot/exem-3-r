import { url } from "@/api/todo.api";
import axios from "axios";
import { create } from "zustand";

interface Iid{
    id:number | string
}

interface IUser{
    id:number|string,
    name:string,
    description:string
}

interface IForm{
    id:number|string,
    formData:FormData
}

interface IData{
    id:number,
    name:string,
    description:string,
    isComplete:boolean,
    images:{id:number,imageName:string}[]
}

interface TodoStore{
    data:IData[],
    getTodo:()=>Promise<void>,
    deleteTodo:(id:Iid)=>Promise<void>,
    addTodo:(formData:FormData)=>Promise<void>,
    editTodo:(upUser:IUser)=>Promise<void>,
    deleteITodo:(id:Iid)=>Promise<void>,
    addITodo:(params:IForm)=>Promise<void>
}

export const TodoList=create<TodoStore>((set,get)=>({
    data:[],
    getTodo:async()=>{
        try {
            const {data}= await axios.get(url)
            set(()=>({data:data.data}))
        } catch (error) {
            console.error(error);
        }
    },
    deleteTodo:async({id}:Iid)=>{
        try {
            await axios.delete(`${url}?id=${id}`)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },
    addTodo:async(formData:FormData)=>{
        try {
            await axios.post(url,formData)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },
    editTodo:async(upUser:IUser)=>{
        try {
        await axios.put(url,upUser)
        get().getTodo()            
    } catch (error) {
            console.error(error);
        }
    },
    deleteITodo:async({id}:Iid)=>{
        try {
            await axios.delete(`${url}/images/${id}`)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },
    addITodo:async({id,formData}:IForm)=>{
        try {
            await axios.post(`${url}/${id}/images`,formData)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    }
}))