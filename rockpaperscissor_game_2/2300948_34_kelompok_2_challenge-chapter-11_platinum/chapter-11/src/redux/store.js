'use client';

import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
// for gameSlice
import gameSlice from './gameSlice';
import profileSlice from './profileSlice';

// untuk gameList
import numberSlice from './numberSlice';
import cardSlice from './cardSlice';

export const store = configureStore({
    reducer: { 
        auth: authSlice, 
        gameCount: gameSlice, 
        profile: profileSlice,
        //untuk gameList
        number:numberSlice, 
        game:cardSlice 
    },
    
})

export default store