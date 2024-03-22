import { createReducer, on } from "@ngrx/store"
import { setModal } from "./modal.action"


const initialState:{modal:boolean} = {
    modal : false
}

export const modalReducer = createReducer(
    initialState,
    on(setModal,(state,{modal})=>({...state,modal}))
)