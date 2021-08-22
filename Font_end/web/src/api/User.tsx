import { callApi } from './api';

export const UserGet = () => {
	const response = callApi('GET', '/api/users/profile').catch((res) => {
		return res;
	});
	return response;
};
