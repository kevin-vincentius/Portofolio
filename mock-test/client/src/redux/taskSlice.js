import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        id: null, 
        deleteStatus: false, 
        isAdding: false, 
        isEditing: false
    },
    reducers: {
        passTaskId: (state, action) => {
            state.id = action.payload;
        }, 
        toggleDelete: (state) => {
            state.deleteStatus = !state.deleteStatus;
        },
        toggleEdit: (state) => {
            state.isEditing = !state.isEditing;
        }, 
        toggleAdd: (state) => {
            state.isAdding = !state.isAdding;
        }
    }
})

export const { passTaskId, toggleDelete, toggleAdd, toggleEdit } = taskSlice.actions;
export default taskSlice.reducer; 