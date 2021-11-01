import { callApi } from './api';

export const ListPromotionGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_promotion?search=${data.search}&page=${data.page}&pageSize=${data.pageSize}&type=${data.type}&id_product=${data.id_product}`,
		data
	).catch((res) => {
		return res;
	});
	return response;
};
export const DeletePromotionDelete = (id_promotion: any) => {
	const response = callApi('DELETE', `/api/admin/delete_promotion/${id_promotion}`).catch((res) => {
		return res;
	});
	return response;
};
export const CreatePromotionPost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_promotion', data).catch((res) => {
		return res;
	});
	return response;
};
export const UpdatePromotionPatch = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_promotion', data).catch((res) => {
		return res;
	});
	return response;
};
