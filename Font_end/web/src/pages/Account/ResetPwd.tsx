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
import { ResetPwdPost, SendEmailPost } from '../../api/ForgotPwd';
interface loginprops {
	receivePropsLogin?: (result: boolean) => void;
	resultApiLogin?: (result: any) => void;
	forgotPwd?: (result: boolean) => void;
	sendCode?: (result: boolean) => void;
	email?: (result: any) => void;
	valueEmail?: any;
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
const ResetPwd: React.FC<loginprops> = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const schema = yup.object().shape({
		newPassword: yup
			.string()
			.required('Mật khẩu không để trống')
			.min(8, 'Mật khẩu ít nhất 8 ký tự'),
		retypeNewPassword: yup
			.string()
			.required('Mật khẩu không để trống')
			.oneOf([yup.ref('newPassword')], '2 trường mật khẩu ko giống nhau'),
	});
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data: any) => {
		const response = await ResetPwdPost({ password: data.newPassword, email: props.valueEmail });
		if (response) {
			if (response.errorCode === null) {
				props.forgotPwd?.(true);
				Swal.fire({
					icon: 'success',
					title: 'Thay đổi mật khẩu thành công',
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
						Thay đổi mật khẩu
					</Typography>

					<Typography variant="body1" gutterBottom>
						Nhập mật khẩu mới
					</Typography>
					<TextField
						{...register('newPassword')}
						id="newPassword"
						name="newPassword"
						variant="outlined"
						type="password"
						focused
						fullWidth
						error={errors.newPassword ? true : false}
						helperText={errors.newPassword?.message}
					/>

					<Typography variant="body1" gutterBottom style={{ marginTop: '20px' }}>
						Nhập lại mật khẩu mới
					</Typography>
					<TextField
						{...register('retypeNewPassword')}
						id="retypeNewPassword"
						name="retypeNewPassword"
						variant="outlined"
						type="password"
						fullWidth
						error={errors.retypeNewPassword ? true : false}
						helperText={errors.retypeNewPassword?.message}
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
						Đổi mật khẩu
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
export default ResetPwd;
