import { Box, CircularProgress } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserGet } from '../../api/User';
import { AppURL } from '../../utils/const';
import Checkout from './Checkout';
const MainLayoutCheckout: React.FC = () => {
	const [profileInfo, setProfileInfo] = React.useState<any>({});
	const [flag, setFlag] = React.useState(false);
	React.useEffect(() => {
		const getData = async () => {
			const profile = await UserGet();
			if (profile.errorCode === null) {
				setProfileInfo(profile.data);
				setFlag(true);
				//console.log(pro);
			}
		};
		getData();
	}, []);
	const checkToken = () => {
		const token: any = window.localStorage.getItem('token');
		const date = Date.now();
		if (window.localStorage.getItem('token')) {
			const checkToken: any = jwtDecode(token);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('token');
				return <Redirect to={AppURL.ACCOUNT} />;
			}
		} else {
			return <Redirect to={AppURL.ACCOUNT} />;
		}
	};
	return (
		<Box>
			{checkToken()}
			{flag ? (
				<Checkout profileInfo={profileInfo} />
			) : (
				<CircularProgress
					color="secondary"
					style={{ position: 'absolute', left: '50%', top: '92px' }}
				/>
			)}
		</Box>
	);
};
export default MainLayoutCheckout;
