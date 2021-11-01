import { callApi } from './api';

export const ListCommentPost = (data: any) => {
	const response = callApi('POST', '/api/product/comment', data).catch((res) => {
		return res;
	});
	return response;
};
export const CreateCommentPost = (data: any) => {
	const response = callApi('POST', '/api/comment/create', data).catch((res) => {
		return res;
	});
	return response;
};
