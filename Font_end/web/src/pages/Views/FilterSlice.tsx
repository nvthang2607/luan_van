import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
const initialState: any = {};
const FilterSlice = createSlice({
	name: 'CartSlice',
	initialState,
	reducers: {
		updateDataFilter(state, action: any) {
			state = action.payload;
			return state;
		},
	},
});
export const { updateDataFilter } = FilterSlice.actions;
export const getDataFilter = (state: RootState) => state.dataFilter;
export default FilterSlice.reducer;
