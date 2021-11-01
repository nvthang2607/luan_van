import { callApi } from './api';

export const CreateEmployeePost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_admin', data).catch((res) => {
		return res;
	});
	return response;
};
export const SearchEmployeeGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_admin?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}&type=${data.type}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateEmployeePatch = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_admin', data).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteEmployeeGet = (id_admin: any) => {
	const response = callApi('GET', `/api/admin/active_admin/${id_admin}`).catch((res) => {
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
export const UpdateEmployeePost = (data: any) => {
	const response = callApi('POST', '/api/users/update_profile', data).catch((res) => {
		return res;
	});
	return response;
};
