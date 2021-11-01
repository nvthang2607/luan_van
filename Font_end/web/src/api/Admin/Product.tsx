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
export const SearchBrandProductGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/search_brand_product?page=${data.page}&pageSize=${data.pageSize}&search=${data.search}`
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
export const CreateBrandProductPost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_brand_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const EditBrandProductPatch = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_brand_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteBrandProductDelete = (id_brand_product: any) => {
	const response = callApi('DELETE', `/api/admin/delete_brand_product/${id_brand_product}`).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
export const ListProductGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_product?page=${data.page}&pageSize=${data.pageSize}&type=${data.type}&id=${data.id}&search=${data.search}&active=${data.active}`
	).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteProductDelete = (id_product: any) => {
	const response = callApi('GET', `/api/admin/active_product/${id_product}`).catch((res) => {
		return res;
	});
	return response;
};
export const CreateProductPost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const CreateImagePost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_image', data).catch((res) => {
		return res;
	});
	return response;
};
export const CreateInformationPost = (data: any) => {
	const response = callApi('POST', '/api/admin/create_information', data).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateInformationPatch = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateQuantityProductPatch = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_quantity_product', data).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateDescriptionPatch = (data: any) => {
	const response = callApi('PATCH', '/api/admin/update_information', data).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteInformationDelete = (id_information: any) => {
	const response = callApi('DELETE', `/api/admin/delete_information/${id_information}`).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
export const GetImageGet = (id_product: any) => {
	const response = callApi('GET', `/api/admin/list_image?id_product=${id_product}`).catch((res) => {
		return res;
	});
	return response;
};
export const DeleteImageDelete = (id_image: any) => {
	const response = callApi('DELETE', `/api/admin/delete_image/${id_image}`).catch((res) => {
		return res;
	});
	return response;
};
export const UpdateImagePost = (data: any) => {
	const response = callApi('POST', '/api/admin/update_image', data).catch((res) => {
		return res;
	});
	return response;
};
export const ListRatingGet = (data: any) => {
	const response = callApi(
		'GET',
		`/api/admin/list_rated?page=${data.page}&pageSize=${data.pageSize}&id_product=${data.id_product}`
	).catch((res) => {
		return res;
	});
	return response;
};
