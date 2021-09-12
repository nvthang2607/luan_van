import { callApi } from './api';

export const UserGet = () => {
	const response = callApi('GET', '/api/users/profile', null, true).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateProfilePost = (data: any) => {
	const response = callApi('POST', '/api/users/update_profile', data).catch((res) => {
		return res;
	});
	return response;
};
export const UpdatePasswordPost = (data: any) => {
	const response = callApi('POST', '/api/users/change_password', data).catch((res) => {
		return res;
	});
	return response;
};
