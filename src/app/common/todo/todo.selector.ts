import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Event } from "../../model/common.interface";
import { TodoState } from "./todo.reducer";


const selectorState = createFeatureSelector<TodoState>('todo')

export const selectTodo = createSelector(
    selectorState,
    (state)=>state.updateTodo
)

export const selectIsupdate = createSelector(
    selectorState,
    (state)=>state.isUpdate
)