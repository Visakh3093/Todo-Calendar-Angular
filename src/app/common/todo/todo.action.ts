import { createAction, props } from "@ngrx/store";
import { Event } from "../../model/common.interface";


export const updateTodo = createAction('[todo] updateTodo',props<Event>())
export const setUpdateTodo = createAction('[todo] booleanUpdate',props<{isUpdate:boolean}>())