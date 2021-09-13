import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState } from '../../app/store';
const data: any = localStorage.getItem('cart');
const initialState = data ? data : [];
// const findIndex = (data: any, id: any) => {
// 	const result = data?.map((item: any, index: number) => {
// 		if (item.id === id) {
// 			return index;
// 		} else return -1;
// 	});
// 	return result;
// };
const CartSlice = createSlice({
	name: 'CartSlice',
	initialState,
	reducers: {
		updataCartData(state, action: any) {
			//state = action.payload;
			//console.log(action.payload);
			//const index = findIndex(state, action.payload.id);
			//console.log(index);

			state.push(action.payload);
			window.localStorage.setItem('cart', JSON.stringify(state));
		},
	},
});
export const { updataCartData } = CartSlice.actions;
export const getCartData = (state: RootState) => state.CartData;
export default CartSlice.reducer;
