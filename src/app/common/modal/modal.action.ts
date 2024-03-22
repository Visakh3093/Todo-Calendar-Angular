import { createAction, props } from "@ngrx/store";


export const setModal = createAction('[modal] modalset',props<{modal:boolean}>())