import { callApi } from './api';

export const ListContactGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_contact?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}&check=${data.check}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const CheckContactPost = (data: any) => {
	const response = callApi('POST', '/api/admin/checked_contact', data).catch((res) => {
		return res;
	});
	return response;
};
