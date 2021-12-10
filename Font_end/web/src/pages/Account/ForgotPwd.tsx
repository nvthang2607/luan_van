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
	CircularProgress,
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
import { SendEmailPost } from '../../api/ForgotPwd';
interface loginprops {
	receivePropsLogin?: (result: boolean) => void;
	resultApiLogin?: (result: any) => void;
	forgotPwd?: (result: boolean) => void;
	sendCode?: (result: boolean) => void;
	sendMail?: (result: boolean) => void;
	email?: (result: any) => void;
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
const ForgotPwd: React.FC<loginprops> = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const schema = yup.object().shape({
		email: yup.string().email('Email không hợp lệ').required('Email không để trống'),
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
		const response = await SendEmailPost({ email: data.email });
		if (response) {
			if (response.errorCode === null) {
				props.sendMail?.(true);
				props.email?.(data.email);
			} else if (response.errorCode === 1) {
				Swal.fire({
					icon: 'error',
					title: 'Email không tồn tại',
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Có lỗi xảy ra',
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography
						variant="h5"
						gutterBottom
						style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '40px' }}
					>
						Quên mật khẩu
					</Typography>
					<TextField
						{...register('email')}
						id="email"
						label="Email"
						name="email"
						focused
						variant="outlined"
						fullWidth
						error={errors.email ? true : false}
						helperText={errors.email?.message}
					/>
				</Grid>
				<Grid item xs={12} style={{ textAlign: 'end' }}>
					<MuiLink
						style={{ textDecoration: 'underline', color: 'black', cursor: 'pointer' }}
						onClick={() => {
							props.forgotPwd?.(true);
						}}
					>
						Trở lại đăng nhập
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
							position: 'relative',
						}}
						fullWidth
						type="submit"
						disabled={isSubmitting}
					>
						Gửi
						{isSubmitting && (
							<CircularProgress
								size={24}
								color="secondary"
								style={{
									position: 'absolute',
								}}
							/>
						)}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
export default ForgotPwd;
