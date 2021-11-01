import { callApi } from './api';

export const ContactPost = (data: any) => {
	const response = callApi('POST', '/api/contact/create', data).catch((res) => {
		return res;
	});
	return response;
};
