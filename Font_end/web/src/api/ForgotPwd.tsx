import { callApi } from './api';

export const SendEmailPost = (data: any) => {
	const response = callApi('POST', '/api/forgot_password/send_mail', data).catch((res) => {
		return res;
	});
	return response;
};
export const SendCodePost = (data: any) => {
	const response = callApi('POST', '/api/forgot_password/check_code', data).catch((res) => {
		return res;
	});
	return response;
};
export const ResetPwdPost = (data: any) => {
	const response = callApi('POST', '/api/forgot_password/reset_password', data).catch((res) => {
		return res;
	});
	return response;
};
