import { callApi } from './api';

export const ProductTypeGet = () => {
	const response = callApi('GET', '/api/admin/list_type_product').catch((res) => {
		return res;
	});
	return response;
};
export const EditProductTypePost = (data: any) => {
	const response = callApi('POST', '/api/admin/change_type_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const CreateProductTypePost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_type_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteProductTypeGet = (id_type_product: any) => {
	const response = callApi('GET', `/api/admin/delete_type_product/:${id_type_product}`).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
