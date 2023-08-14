import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: { value: [] },
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload.id)
    },
    updateTask: (state, action) => {
     state.value.map((task) => {
      if(task.id === action.payload.id) {
        task.title = action.payload.title
      }
     })
    },
    completedTask: (state,action) => {
      state.value.map((task) => {
        if(task.id === action.payload.id) {
          task.isCompleted = true
        }
       })
    }
  }
});
export const  {addTask, deleteTask, updateTask, completedTask}  =  todosSlice.actions;
export default todosSlice.reducer;
