import { callApi } from './api';

export const ListNewsGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_news?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteNewsGet = (id_news: any) => {
	const response = callApi('GET', `/api/admin/active_news/${id_news}`).catch((res) => {
		return res;
	});
	return response;
};
export const CreateNewsPost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_news', data).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateNewsPost = (data: any) => {
	const response = callApi('POST', '/api/admin/update_news', data).catch((res) => {
		return res;
	});
	return response;
};
