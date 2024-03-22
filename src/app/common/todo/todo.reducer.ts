import { createReducer, on } from "@ngrx/store";
import { Event } from "../../model/common.interface";
import { setUpdateTodo, updateTodo } from "./todo.action";

export interface TodoState {
    updateTodo: Event,
    isUpdate:boolean
}

const initialState: TodoState = {
    updateTodo: {
        end: '',
        id: '',
        start: '',
        title: ''
    },
    isUpdate:false
}

export const todoReducer = createReducer(
    initialState,
    on(updateTodo,(state,payload)=>({...state,updateTodo:payload})),
    on(setUpdateTodo,(state,{isUpdate})=>({...state,isUpdate}))
)