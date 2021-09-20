import { callApi } from './api';

export const OrderPostAll = (data: any) => {
	const response = callApi('POST', `/api/bill/user_list_bill`, data).catch((res) => {
		return res;
	});
	return response;
};
