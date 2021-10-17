import { callApi } from './api';

export const ProductTypeGet = () => {
	const response = callApi('GET', '/api/admin/list_type_product').catch((res) => {
		return res;
	});
	return response;
};
export const EditProductTypePost = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_type_product', data).catch((res) => {
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
	const response = callApi('DELETE', `/api/admin/delete_type_product/${id_type_product}`).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
export const SearchTypeProductGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/search_type_product?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const SearchBranchProductGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/search_branch_product?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const ListTypeProductGet = () => {
	const response = callApi('GET', '/api/type_product/select_list').catch((res) => {
		return res;
	});
	return response;
};
export const CreateBranchProductPost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_branch_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const EditBranchProductPatch = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_branch_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteBranchProductDelete = (id_branch_product: any) => {
	const response = callApi('DELETE', `/api/admin/delete_branch_product/${id_branch_product}`).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
