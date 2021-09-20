import { callApi } from './api';

export const RatingPost = (data: any) => {
	const response = callApi('POST', `/api/rating`, data).catch((res) => {
		return res;
	});
	return response;
};
