import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import 'react-toastify/dist/ReactToastify.css';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import fbIcon from '../../public/images/facebook.svg';
import ggIcon from '../../public/images/google.webp';
import FacebookLogin from 'react-facebook-login';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Avatar,
	Card,
	CardHeader,
	Container,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Link as MuiLink,
	Button,
	FormHelperText,
} from '@material-ui/core';
import { Message, Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { LoginGGPost, LoginPost } from '../../api/LoginAPI';
import { toast, ToastContainer } from 'react-toastify';
import { LoginDTO } from '../../DTO/Login/LoginDTO';
import GoogleLogin from 'react-google-login';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import { AppURL } from '../../utils/const';
interface loginprops {
	receivePropsLogin?: (result: boolean) => void;
	resultApiLogin?: (result: any) => void;
	forgotPwd?: (result: boolean) => void;
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bgHeader: {
			backgroundColor: theme.palette.primary.main,
			paddingRight: theme.spacing(3),
			paddingLeft: theme.spacing(3),
		},
		grow: {
			flexGrow: 1,
		},
		loginGG: {
			display: 'contents !important',
		},
		loginFB: {
			padding: 0,
			display: 'contents',
		},
		titleInput: {
			'&::after': {
				content: '"*"',
				display: 'inline-block',
				marginLeft: '5px',
				position: 'relative',
				bottom: '5px',
				color: theme.palette.secondary.main,
			},
		},
		login: {
			backgroundColor: theme.palette.primary.light,
			color: '#fff',
			fontSize: '22px',
			height: '57px',
			justifyContent: 'left',
			paddingLeft: '42px',
		},
		loginMobile: {
			backgroundColor: theme.palette.primary.light,
			color: '#fff',
			fontSize: '17px',
			height: '57px',
			justifyContent: 'left',
			paddingLeft: '42px',
		},
		otherLogin: {
			'&::after': {
				content: '""',
				position: 'absolute',
				top: '66.2%',
				left: '50%',
				transform: `translate(${-50 + '%'},${-50 + '%'})`,
				width: '91%',
				height: '4px',
				borderTop: '1px solid #ced4da',
				display: 'block',
				borderBottom: '1px solid #ced4da',
				zIndex: -1,
			},
		},
		root: {
			backgroundColor: theme.palette.background.paper,
			width: 800,
		},
		button: {},
		paper: {
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			marginTop: theme.spacing(6),
			backgroundColor: '#fff',
		},
		content: {
			padding: theme.spacing(3, 15, 5, 15),
		},
	})
);
const Login: React.FC<loginprops> = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const schema = yup.object().shape({
		email: yup.string().email('Email kh??ng h???p l???').required('Email kh??ng ????? tr???ng'),
		password: yup.string().required('M???t kh???u kh??ng ????? tr???ng').min(8, 'M???t kh???u ??t nh???t 8 k?? t???'),
	});
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: LoginDTO) => {
		const res = await LoginPost({ email: data.email, password: data.password });
		if (res?.errorCode === null) {
			const token: any = res.data.accessToken;
			const checkToken: any = jwtDecode(token);
			console.log(checkToken);

			if (checkToken.isAdmin === false) {
				window.localStorage.setItem('token', res.data.accessToken || '');
				props?.resultApiLogin?.(res.errorCode);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'T??n t??i kho???n ho???c m???t kh???u kh??ng ????ng',
					//text: 'Ten tai khoan hoac mat khau khong dung',
				});
				//props?.resultApiLogin?.(res.errorCode);
			}
		} else {
			props?.resultApiLogin?.(res?.errorCode);
		}
	};
	const [state, setState] = React.useState({
		showPwdLogin: false,
		showPwdRegister: false,
	});
	const handleClickShowPassword = () => {
		setState({ ...state, showPwdLogin: !state.showPwdLogin });
	};
	isSubmitting !== undefined && props?.receivePropsLogin?.(isSubmitting);
	const responseGoogle = async (response: any) => {
		console.log(response);

		if (response) {
			const reqData = { email: response?.mt?.Xt, name: response?.mt?.Re };
			const resLoginGG = await LoginGGPost(reqData);
			if (resLoginGG) {
				if (resLoginGG?.errorCode === null) {
					window.localStorage.setItem('token', resLoginGG.data.accessToken || '');
				}
				if (resLoginGG?.errorCode || resLoginGG?.errorCode === null) {
					props?.resultApiLogin?.(resLoginGG.errorCode);
				}
			}
		}
	};
	const responseFacebook = (response: any) => {
		console.log(response);
	};
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="body1" gutterBottom className={classes.titleInput}>
						Email
					</Typography>
					<TextField
						{...register('email')}
						id="email"
						name="email"
						variant="outlined"
						fullWidth
						error={errors.email ? true : false}
						helperText={errors.email?.message}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1" gutterBottom className={classes.titleInput}>
						Nh???p m???t kh???u
					</Typography>
					{/* <TextField
													id="outlined-basic"
													variant="outlined"
													fullWidth
													type="password"
												/> */}
					<FormControl variant="outlined" fullWidth>
						<OutlinedInput
							{...register('password')}
							id="psssword"
							name="password"
							type={state.showPwdLogin ? 'text' : 'password'}
							error={errors.password ? true : false}
							//helperText={errors.password?.message}
							//value={values.password}
							//onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										//onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{state.showPwdLogin ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText error id="accountId-error">
							{errors.password ? errors.password.message : ''}
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} style={{ textAlign: 'end' }}>
					<MuiLink
						style={{ textDecoration: 'underline', color: 'black', cursor: 'pointer' }}
						onClick={() => {
							props.forgotPwd?.(true);
						}}
					>
						Qu??n m???t kh???u?
					</MuiLink>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="primary"
						style={{
							color: '#fff',
							fontSize: '22px',
							height: '57px',
						}}
						fullWidth
						type="submit"
						disabled={isSubmitting}
					>
						????ng nh???p
					</Button>
				</Grid>
				<Grid item xs={12} style={{ textAlign: 'center' }}>
					<Typography variant="body1" className={classes.otherLogin}></Typography>
					<Typography
						component="span"
						style={{
							backgroundColor: '#fff',
							paddingLeft: '30px',
							paddingRight: '30px',
						}}
					>
						Ho???c
					</Typography>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: '2px', paddingRight: '23px' }}>
					<GoogleLogin
						clientId="4320636860-qpnt1b2pv78gom1eo0lbl95ht27ti28s.apps.googleusercontent.com"
						buttonText=""
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
						cookiePolicy={'single_host_origin'}
						style={{ backgroundColor: 'red' }}
						icon={false}
						className={classes.loginGG}
					>
						<Button
							variant="contained"
							className={clsx(
								classes.button,
								isResponseivePhone ? classes.login : classes.loginMobile
							)}
							fullWidth
							startIcon={<img src={ggIcon} alt="google" width="35px" />}
							disabled={isSubmitting}
						>
							????ng nh???p b???ng google
						</Button>
					</GoogleLogin>
				</Grid>
				<Grid item xs={12}>
					<FacebookLogin
						appId="435690581158407"
						autoLoad={false}
						//fields="name,email,picture"
						//onClick={componentClicked}
						callback={responseFacebook}
						textButton=""
						cssClass={classes.loginFB}
						icon={
							<Button
								variant="contained"
								className={clsx(
									classes.button,
									isResponseivePhone ? classes.login : classes.loginMobile
								)}
								fullWidth
								startIcon={<img src={fbIcon} alt="facebook" width="80%" />}
								disabled={isSubmitting}
							>
								????ng nh???p b???ng facebook
							</Button>
						}
					></FacebookLogin>
				</Grid>
			</Grid>
		</form>
	);
};
export default Login;
