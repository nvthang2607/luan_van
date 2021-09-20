import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
const data: any = localStorage.getItem('cart');
const initialState = data ? JSON.parse(data) : [];
const findIndex = (data: any, id: any) => {
	let result = -1;
	data?.map((item: any, index: number) => {
		if (item.id === id) {
			result = index;
			return result;
		}
	});

	return result;
};
const CartSlice = createSlice({
	name: 'CartSlice',
	initialState,
	reducers: {
		updataCartData(state, action: any) {
			const index = findIndex(state, action.payload.id);
			if (index === -1) {
				state.push(action.payload);
				window.localStorage.setItem('cart', JSON.stringify(state));
			} else {
				state[index].quantity++;
				window.localStorage.setItem('cart', JSON.stringify(state));
			}
		},
		updateQuantity(state, action: any) {
			const index = findIndex(state, action.payload.id);

			if (index === -1) {
				//state.push(action.payload);
				//window.localStorage.setItem('cart', JSON.stringify(state));
			} else {
				if (action.payload.status === 'increase') state[index].quantity += action.payload.quantity;
				else if (action.payload.status === 'decrease')
					state[index].quantity -= action.payload.quantity;
				else if (action.payload.status === 'replace')
					state[index].quantity = action.payload.quantity;
				window.localStorage.setItem('cart', JSON.stringify(state));
			}
		},
		updateVoucher(state, action: any) {
			const index = findIndex(state, action.payload.id);

			if (index === -1) {
				//state.push(action.payload);
				//window.localStorage.setItem('cart', JSON.stringify(state));
			} else {
				state[index].voucher = action.payload.voucher;
				window.localStorage.setItem('cart', JSON.stringify(state));
			}
		},
		deleteProduct(state, action: any) {
			const index = findIndex(state, action.payload.id);

			if (index === -1) {
				//state.push(action.payload);
				//window.localStorage.setItem('cart', JSON.stringify(state));
			} else {
				state.splice(index, 1);
				window.localStorage.setItem('cart', JSON.stringify(state));
			}
		},
		deleteCart(state) {
			state = [];

			window.localStorage.removeItem('cart');
			return state;
		},
	},
});
export const { updataCartData, updateQuantity, deleteProduct, updateVoucher, deleteCart } =
	CartSlice.actions;
export const getCartData = (state: RootState) => state.CartData;
export default CartSlice.reducer;
