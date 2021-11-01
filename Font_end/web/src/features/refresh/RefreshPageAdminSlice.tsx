import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState } from '../../app/store';

const RefreshPageAdminSlice = createSlice({
	name: 'RefreshPageAdminSlice',
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
export const { updateValueRefreshPage } = RefreshPageAdminSlice.actions;
export const getValueRefreshPage = (state: RootState) => state.valueRefreshAdminPage;
export default RefreshPageAdminSlice.reducer;
