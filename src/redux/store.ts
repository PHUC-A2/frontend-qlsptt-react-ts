import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import userReducer from './features/userSlice'
import productReducer from './features/productSlice'
import profileReducer from './features/profileSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        user: userReducer,
        product: productReducer,
    }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store