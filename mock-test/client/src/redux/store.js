import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './taskSlice'
import authSlice  from './authSlice'

const store = configureStore({
    reducer: {
        auth: authSlice, 
        task: taskSlice
    }
})

export default store