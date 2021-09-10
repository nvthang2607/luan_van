import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState } from '../../app/store';

const RefreshPageSlice = createSlice({
	name: 'RefreshPageSlice',
	initialState: {
		value: 1,
	},
	reducers: {
		updateValueRefreshPage(state, action: any) {
			//state = action.payload;
			if (action.payload) {
				state.value = state.value + 1;
				//return state;
			}
		},
	},
});
export const { updateValueRefreshPage } = RefreshPageSlice.actions;
export const getValueRefreshPage = (state: RootState) => state.valueRefreshPage;
export default RefreshPageSlice.reducer;
