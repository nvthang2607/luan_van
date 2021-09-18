import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CartSlice from '../Components/Product/CartSlice';
import counterReducer from '../features/counter/counterSlice';
import RefreshPageSlice from '../features/refresh/RefreshPageSlice';
import UserSlice from '../pages/Profile/UserSlice';
import FilterSlice from '../pages/Views/FilterSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		userProfile: UserSlice,
		valueRefreshPage: RefreshPageSlice,
		CartData: CartSlice,
		dataFilter: FilterSlice,
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
