import { LoginDTO } from '../DTO/Login/LoginDTO';
import { jwt } from '../DTO/Response/Login/LoginResponse';
import { ResponseDTO } from '../DTO/Response/ResponseDTO';
import { callApi } from './api';

export const LoginPost = (data: LoginDTO): Promise<ResponseDTO<jwt> | undefined> => {
	const response = callApi('POST', '/api/users/login', data, false).catch(
		(res: ResponseDTO<jwt>) => {
			return res;
		}
	);
	return response;
};
