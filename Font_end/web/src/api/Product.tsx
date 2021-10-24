import { callApi } from './api';

export const TypeBrand = () => {
	const response = callApi('GET', '/api/type_and_brand/select_list').catch((res) => {
		return res;
	});
	return response;
};
export const PhoneBrand = () => {
	const response = callApi('POST', '/api/brand_product/select_list', { idType: 1 }).catch((res) => {
		return res;
	});
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
export const FilterPost = (data: any) => {
	const response = callApi('POST', `/api/product/filter`, data).catch((res) => {
		return res;
	});
	return response;
};
export const OrderPost = (data: any) => {
	const response = callApi('POST', `/api/bill/create`, data).catch((res) => {
		return res;
	});
	return response;
};
export const RecommendPost = (data: any) => {
	const response = callApi('POST', `/api/users/recommend`, data).catch((res) => {
		return res;
	});
	return response;
};
export const ProductNewPost = (data: any) => {
	const response = callApi('POST', `/api/product`, data).catch((res) => {
		return res;
	});
	return response;
};
export const ProductSellPost = (data: any) => {
	const response = callApi('POST', `/api/product`, data).catch((res) => {
		return res;
	});
	return response;
};
export const RatingPost = (data: any) => {
	const response = callApi('POST', `/api/product/rating`, data).catch((res) => {
		return res;
	});
	return response;
};
export const ProductFSalePost = (data: any) => {
	const response = callApi('POST', `/api/product/`, data).catch((res) => {
		return res;
	});
	return response;
};
