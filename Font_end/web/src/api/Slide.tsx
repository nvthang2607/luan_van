import { callApi } from './api';

export const ListSlideGet = () => {
	const response = callApi('GET', `/api/slide/list`).catch((res) => {
		return res;
	});
	return response;
};
