import { callApi } from './api';

export const UserPost = (data: any) => {
	const response = callApi('POST', '/api/admin/list_users', data).catch((res) => {
		return res;
	});
	return response;
};
export const SearchUserGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/search_users?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateUserPost = (data: any) => {
	const response = callApi('POST', '/api/admin/update_users', data).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteUserGet = (id_user: any) => {
	const response = callApi('GET', `/api/admin/delete_users/:${id_user}`).catch((res) => {
		return res;
	});
	return response;
};
export const UserGet = () => {
	const response = callApi('GET', '/api/users/profile', null, true).catch((res) => {
		return res;
	});
	return response;
};
export const ActiveUserGet = () => {
	const response = callApi('GET', '/api/admin/active_users/:id_user', null, true).catch((res) => {
		return res;
	});
	return response;
};
