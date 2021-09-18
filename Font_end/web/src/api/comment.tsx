import { callApi } from './api';

export const CommentPost = (data: any) => {
	const response = callApi('POST', '/api/product/comment', data).catch((res) => {
		return res;
	});
	return response;
};
