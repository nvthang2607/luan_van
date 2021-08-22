import { LoginDTO } from '../DTO/Login/LoginDTO';
import { jwt } from '../DTO/Response/Login/LoginResponse';
import { ResponseDTO } from '../DTO/Response/ResponseDTO';
import { callApi } from './api';

export const CityGet = () => {
	const response = callApi('GET', '/api/address/city/select_list').catch((res) => {
		return res;
	});
	return response;
};
export const DistrictPost = (idCity: any) => {
	const response = callApi('POST', '/api/address/district/select_list', idCity, false).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
export const CommunePost = (idDistrict: any) => {
	const response = callApi('POST', '/api/address/commune/select_list', idDistrict, false).catch(
		(res) => {
			return res;
		}
	);
	return response;
};
