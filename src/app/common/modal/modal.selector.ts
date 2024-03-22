import { createFeatureSelector, createSelector } from "@ngrx/store";


const selectorState = createFeatureSelector<{modal:boolean}>('modal')

export const selectModal = createSelector(
    selectorState,
    (state)=>state.modal
)