import { callApi } from './api';

export const OrderPostAll = (data: any) => {
	const response = callApi('POST', `/api/bill/user_list_bill`, data).catch((res) => {
		return res;
	});
	return response;
};
export const OrderGetId = (id: any) => {
	const response = callApi('GET', `/api/bill/user_list_billdetail/${id}`).catch((res) => {
		return res;
	});
	return response;
};
