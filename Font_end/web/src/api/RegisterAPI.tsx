import { RegisterDTO } from '../DTO/Register/RegisterDTO';
import { ResponseDTO } from '../DTO/Response/ResponseDTO';
import { callApi } from './api';

export const RegisterPost = (data: RegisterDTO): Promise<ResponseDTO<boolean> | undefined> => {
	const response = callApi('POST', '/api/users/register', data, false).catch(
		(res: ResponseDTO<boolean>) => {
			return res;
		}
	);
	return response;
};
