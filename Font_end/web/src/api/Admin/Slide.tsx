import { callApi } from './api';

export const ListSlideGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_slide?page=${data.page}&pageSize=${data.pageSize}&id_product=${data.id_product}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteSlideDelete = (id_slide: any) => {
	const response = callApi('DELETE', `/api/admin/delete_slide/${id_slide}`).catch((res) => {
		return res;
	});
	return response;
};
export const CreateSlidePost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_slide', data).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateSlidePost = (data: any) => {
	const response = callApi('POST', '/api/admin/update_slide', data).catch((res) => {
		return res;
	});
	return response;
};
