import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { setUser, clearUser } from './features/user/userSlice';
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'
import { useSession } from 'next-auth/react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

// export const useAuthSync = () => {
//     const authUser = useSession().data?.user;

//     const dispatch = useAppDispatch();

//     useEffect(() => {
//         if (!authUser) return;

//         if (authUser) {
//             dispatch(setUser(user)); // Populate Redux store with user data
//         } else {
//             dispatch(clearUser()); // Clear user state if not authenticated
//         }
//     }, [user, isLoading, dispatch]);
// };
