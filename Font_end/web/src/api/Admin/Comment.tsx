import { callApi } from './api';

export const ListCommentGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_comment?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const ListFeedbackGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_feedback?page=${data.page}&pageSize=${data.pageSize}&id_comment=${data.id_comment}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const CreateFeedbackPost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_feedback', data).catch((res) => {
		return res;
	});
	return response;
};
