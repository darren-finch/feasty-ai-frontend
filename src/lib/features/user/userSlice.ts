import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './User'

// Define a TS type for the data we'll be using
export interface UserState {
    user?: User
}

// Create an initial state value for the reducer, with that type
const initialState: UserState = {
    user: undefined,
}

// Create the slice and pass in the initial state
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = undefined;
        },
    }
})

// Export the generated reducer function
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer