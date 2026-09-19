import { url } from "@/api/todo.api";
import axios from "axios";
import { atomWithRefresh } from "jotai/utils";
import { atom } from "jotai/vanilla";

export const getTodoAtom=atomWithRefresh(async()=>{
    try {
        const {data}= await axios.get(url)
        return data.data
    } catch (error) {
        console.error(error);
    }
})

export const deleteTodoAtom=atom(null,async(get,set,id)=>{
    try {
        await axios.delete(`${url}?id=${id}`)
        set(getTodoAtom)
    } catch (error) {
        console.error(error);
    }
})

export const addTodoAtom=atom(null,async(get,set,formdata)=>{
    try {
        await axios.post(url,formdata)
        set(getTodoAtom)
    } catch (error) {
        console.error(error);
    }
})

export const editUserAtom=atom(null,async(get,set,upUser)=>{
    try {
        await axios.put(url,upUser)
        set(getTodoAtom)
    } catch (error) {
        console.error(error);
    }
})

export const deleteImg=atom(null,async(get,set,id)=>{
    try {
        await axios.delete(`${url}/images/${id}`)
        set(getTodoAtom)
    } catch (error) {
        console.error(error);
    }
})

export const addImgAtom=atom(null,async(get,set,{id,formData})=>{
    try {
        console.log(id);
        await axios.post(`${url}/${id}/images`,formData)
        set(getTodoAtom)
    } catch (error) {
        console.error(error);
    }
})