import { LoginDTO } from '../DTO/Login/LoginDTO';
import { jwt } from '../DTO/Response/Login/LoginResponse';
import { ResponseDTO } from '../DTO/Response/ResponseDTO';
import { callApi } from './api';

export const AddressGet = () => {
	const response = callApi('GET', '/api/address/city/select_list').catch((res) => {
		return res;
	});
	return response;
};
