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
		`/api/admin/list_users?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}&type=${data.type}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateUserPost = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_users', data).catch((res) => {
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
export const ActiveUserGet = (id_user: any) => {
	const response = callApi('GET', `/api/admin/active_users/${id_user}`, null, true).catch((res) => {
		return res;
	});
	return response;
};
