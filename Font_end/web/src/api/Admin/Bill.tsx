import { callApi } from './api';

export const ListBillGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_bill?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}&status=${data.status}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const ApproveBillPost = (id_bill: any) => {
	const response = callApi('POST', '/api/admin/approve_bill', id_bill).catch((res) => {
		return res;
	});
	return response;
};
export const CancelBillPost = (id_bill: any) => {
	const response = callApi('POST', '/api/admin/cancel_bill', id_bill).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteProductBillPost = (data: any) => {
	const response = callApi('POST', '/api/admin/delete_billdetail', data).catch((res) => {
		return res;
	});
	return response;
};
