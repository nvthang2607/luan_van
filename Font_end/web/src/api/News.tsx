import { callApi } from './api';

export const NewsGet = (data: any) => {
	const response = callApi('POST', `/api/news`, data).catch((res) => {
		return res;
	});
	return response;
};
