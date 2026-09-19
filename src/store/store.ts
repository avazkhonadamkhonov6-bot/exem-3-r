import { configureStore } from '@reduxjs/toolkit'
import TodoSlice  from './TodoSlice'

const store = configureStore({
  reducer: {
    Todo:TodoSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store