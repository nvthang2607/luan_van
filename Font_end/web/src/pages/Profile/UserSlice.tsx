import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGet } from '../../api/User';
import { RootState } from '../../app/store';

export const userProfileAPI: any = createAsyncThunk('/user/name', async () => {
	const response = await UserGet();

	return response?.data;
});
const UserSlice = createSlice({
	name: 'UserSlice',
	initialState: {
		phone: '',
		name: '',
		gender: '',
		idCity: '',
		idDistrict: '',
		idCommune: '',
		email: '',
		nameCity: '',
		nameDistrict: '',
		nameCommune: '',
	},
	reducers: {
		updateProfileUser(state, action: any) {
			state = action.payload;
			return state;
		},
	},
	extraReducers: {
		[userProfileAPI.pending]: (state) => {},
		[userProfileAPI.rejected]: (state) => {},
		[userProfileAPI.fulfilled]: (state, action) => {
			state = action.payload;
			return state;
		},
	},
});
export const { updateProfileUser } = UserSlice.actions;
export const getUserProfile = (state: RootState) => state.userProfile;
export default UserSlice.reducer;
