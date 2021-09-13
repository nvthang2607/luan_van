import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState } from '../../app/store';
const initialState: Array<any> = [];
const CartSlice = createSlice({
	name: 'CartSlice',
	initialState,
	reducers: {
		updataCartData(state, action: any) {
			//state = action.payload;
			//console.log(action.payload);
			const data = state.push(action.payload);
			//window.localStorage.setItem('cart', data);
		},
	},
});
export const { updataCartData } = CartSlice.actions;
export const getCartData = (state: RootState) => state.CartData;
export default CartSlice.reducer;
