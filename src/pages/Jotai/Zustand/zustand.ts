import { error } from './../../../../node_modules/ajv/lib/vocabularies/applicator/dependencies';
import { getTodo, url } from "@/api/todo.api";
import axios from "axios";
import { create } from "zustand";

export const TodoList=create((set,get)=>({
    data:[],
    getTodo:async()=>{
        try {
            const {data}= await axios.get(url)
            set(()=>({data:data.data}))
        } catch (error) {
            console.error(error);
        }
    },
    deleteTodo:async(id)=>{
        try {
            await axios.delete(`${url}?id=${id}`)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },
    addTodo:async(formData)=>{
        try {
            await axios.post(url,formData)
            get(),getTodo()
        } catch (error) {
            console.error(error);
        }
    },
    editTodo:async(upUser)=>{
        try {
        await axios.put(url,upUser)
        get().getTodo()            
    } catch (error) {
            console.error(error);
        }
    },
    deleteITodo:async(id)=>{
        try {
            await axios.delete(`${url}/images/${id}`)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    },
    addITodo:async(id,formData)=>{
        try {
            await axios.post(`${url}/${id}/images`,formData)
            get().getTodo()
        } catch (error) {
            console.error(error);
        }
    }
}))