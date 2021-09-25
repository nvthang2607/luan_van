import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
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
interface loginprops {
	receivePropsLogin?: (result: boolean) => void;
	resultApiLogin?: (result: any) => void;
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
		otherLogin: {
			'&::after': {
				content: '""',
				position: 'absolute',
				top: '65%',
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
	const theme = useTheme();
	const schema = yup.object().shape({
		email: yup.string().email('Email không hợp lệ').required('Email không để trống'),
		password: yup.string().required('Mật khẩu không để trống').min(8, 'Mật khẩu ít nhất 8 ký tự'),
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
			window.localStorage.setItem('token', res.data.accessToken || '');
		}
		if (res?.errorCode || res?.errorCode === null) {
			props?.resultApiLogin?.(res.errorCode);
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
		// console.log(response.ht.Re);
		// console.log(response.ht.St);
		const reqData = { email: response.ht.St, name: response.ht.Re };
		const resLoginGG = await LoginGGPost(reqData);
		if (resLoginGG) {
			if (resLoginGG?.errorCode === null) {
				window.localStorage.setItem('token', resLoginGG.data.accessToken || '');
			}
			if (resLoginGG?.errorCode || resLoginGG?.errorCode === null) {
				props?.resultApiLogin?.(resLoginGG.errorCode);
			}
		}
	};
	const responseFacebook = (response: any) => {
		console.log(response);
	};
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
						Nhập mật khẩu
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
					<MuiLink style={{ textDecoration: 'underline', color: 'black' }} href="#">
						Quên mật khẩu?
					</MuiLink>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="primary"
						style={{
							color: '#fff',
							fontSize: '1.5vw',
							height: '4vw',
						}}
						fullWidth
						type="submit"
						disabled={isSubmitting}
					>
						đăng nhập
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
						Hoặc
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
							style={{
								backgroundColor: theme.palette.primary.light,
								color: '#fff',
								fontSize: '1.5vw',
								height: '4vw',
								justifyContent: 'left',
								paddingLeft: '42px',
							}}
							fullWidth
							startIcon={<img src={ggIcon} alt="google" width="35px" />}
							disabled={isSubmitting}
						>
							Dang nhap bang google
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
								style={{
									backgroundColor: theme.palette.primary.dark,
									color: '#fff',
									fontSize: '1.5vw',
									height: '4vw',
									justifyContent: 'left',
									paddingLeft: '42px',
								}}
								fullWidth
								startIcon={<img src={fbIcon} alt="facebook" width="80%" />}
								disabled={isSubmitting}
							>
								Dang nhap bang facebook
							</Button>
						}
					></FacebookLogin>
				</Grid>
			</Grid>
		</form>
	);
};
export default Login;
