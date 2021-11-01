import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Container,
	FormControlLabel,
	Grid,
	Link as MuiLink,
	TextField,
	Theme,
	Typography,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AppURL } from '../../utils/const';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { LoginPost } from '../../api/LoginAPI';
import Swal from 'sweetalert2';
import theme from '../../utils/theme';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<MuiLink color="inherit" href="https://material-ui.com/">
				Your Website
			</MuiLink>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
const useStyles = makeStyles((theme: Theme) => ({
	mt3: {
		marginTop: theme.spacing(3),
	},
	textCenter: {
		textAlign: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	bgBox: {
		backgroundColor: theme.palette.secondary.contrastText,
	},
}));
const Login: React.FC = () => {
	const classes = useStyles();
	const schema = yup.object().shape({
		loginName: yup.string().required('loginName la bat buoc'),
		password: yup.string().required('password bat buoc'),
	});
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const history = useHistory();
	const onSubmit = async (data: any) => {
		const response = await LoginPost({ email: data.loginName, password: data.password });
		if (response?.errorCode === null) {
			const token: any = response.data.accessToken;
			const checkToken: any = jwtDecode(token);

			if (checkToken.isAdmin === 'admin') {
				window.localStorage.setItem('tokenAdmin', response.data.accessToken || '');
				history.push(AppURL.ADMIN_HOME);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Ban khong co quyen vao trang quan tri',
					//text: 'Ten tai khoan hoac mat khau khong dung',
				});
			}
		} else if (response?.errorCode === 1) {
			Swal.fire({
				icon: 'error',
				title: 'Dang nhap that bai',
				text: 'Ten tai khoan hoac mat khau khong dung',
			});
		} else if (response?.errorCode === 2) {
			Swal.fire({
				icon: 'error',
				title: 'Dang nhap that bai',
				text: 'Ten tai khoan hoac mat khau khong dung',
			});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Dang nhap that bai',
				text: 'Co loi xay ra',
			});
		}
	};

	return (
		<Container maxWidth="xs" className={classes.bgBox}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container className={classes.paper}>
					<Grid item xs={12}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} justify="center">
						<Typography component="h1" variant="h5" gutterBottom align="center">
							Sign in
						</Typography>
					</Grid>
				</Grid>

				<Grid container>
					<Grid item xs={12} className={classes.mt3}>
						<TextField
							{...register('loginName')}
							variant="outlined"
							disabled={false}
							label="Login Name"
							type="text"
							id="loginName"
							name="loginName"
							placeholder="Login Name"
							fullWidth={true}
							error={errors.loginName ? true : false}
							helperText={errors.loginName?.message}
						/>
					</Grid>
					<Grid item xs={12} className={classes.mt3}>
						<TextField
							{...register('password')}
							variant="outlined"
							disabled={false}
							label="Password"
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							fullWidth={true}
							error={errors.password ? true : false}
							helperText={errors.password?.message}
						/>
					</Grid>
				</Grid>
				{/* <Grid container justify="flex-start">
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox color="primary" name="remember" />}
							label="Remember me"
						/>
					</Grid>
				</Grid> */}
				<Grid container justify="center">
					<Grid item xs={12} className={classes.mt3}>
						<Button
							fullWidth={true}
							color="primary"
							type="submit"
							variant="contained"
							size="large"
							disabled={isSubmitting}
							style={{ position: 'relative' }}
						>
							Sign in
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
				{/* <Grid container style={{ textAlign: 'end' }}>
					<Grid item xs={12} className={classes.mt3}>
						<Link style={{ cursor: 'pointer' }} to={AppURL.REGISTER}>
							Don't have an account? Sign up
						</Link>
					</Grid>
				</Grid> */}
				<Grid container>
					<Grid item xs={12}>
						<Box mt={8}>
							<Copyright />
						</Box>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};
export default Login;
