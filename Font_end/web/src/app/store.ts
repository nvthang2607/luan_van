import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import RefreshPageSlice from '../features/refresh/RefreshPageSlice';
import UserSlice from '../pages/Profile/UserSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		userProfile: UserSlice,
		valueRefreshPage: RefreshPageSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
