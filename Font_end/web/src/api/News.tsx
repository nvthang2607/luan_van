import { callApi } from './api';

export const NewsGet = (data: any) => {
	const response = callApi('POST', `/api/news`, data).catch((res) => {
		return res;
	});
	return response;
};
export const NewsIdGet = (id: any) => {
	const response = callApi('GET', `/api/news/${id}`).catch((res) => {
		return res;
	});
	return response;
};
