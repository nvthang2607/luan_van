import { callApi } from './api';

export const CreateFeedbackPost = (data: any) => {
	const response = callApi('POST', '/api/feedback/create', data).catch((res) => {
		return res;
	});
	return response;
};
