import { callApi } from './api';

export const TypeBranch = () => {
	const response = callApi('GET', '/api/type_and_branch/select_list').catch((res) => {
		return res;
	});
	return response;
};
export const PhoneBranch = () => {
	const response = callApi('POST', '/api/branch_product/select_list', { idType: 1 }).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
export const SearchPhoneGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/search?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}&type=${data.type}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const ProductIdGet = (idProduct: any) => {
	const response = callApi('GET', `/api/product/${idProduct}`).catch((res) => {
		return res;
	});
	return response;
};
