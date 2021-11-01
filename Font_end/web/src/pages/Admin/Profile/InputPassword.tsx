import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	FormHelperText,
	Grid,
	LinearProgress,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { toast, ToastContainer } from 'react-toastify';
import { UpdateEmployeePatch, UpdateEmployeePost } from '../../../api/Admin/Employee';
import { updateValueRefreshPage } from '../../../features/refresh/RefreshPageAdminSlice';
import { useAppDispatch } from '../../../app/hooks';
interface InputPasswordProps {
	valueSubmit?: any;
	action?: (result: boolean) => void;
}
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	button: {},
	activeTagLi: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		color: `${theme.palette.primary.main} !important`,
	},
	tagLi: {
		textDecoration: 'none',
		cursor: 'pointer',
		color: 'black',
		padding: '8px',
		display: 'block',
	},
}));
const InputPassword: React.FC<InputPasswordProps> = (props) => {
	const classes = useStyles();

	const schema = yup.object().shape({
		password: yup.string().required('Mật khẩu không để trống').min(8, 'Mật khẩu ít nhất 8 ký tự'),
	});

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const history = useHistory();
	const dispatch = useAppDispatch();
	const onSubmit = async (data: any) => {
		const reqData = {
			password: data.password,
			name: props.valueSubmit.name,
			idCommune: props.valueSubmit.idCommune,
			idDistrict: props.valueSubmit.idDistrict,
			idCity: props.valueSubmit.idCity,
			gender: props.valueSubmit.gender,

			phone: props.valueSubmit.phone,
		};
		const response = await UpdateEmployeePost(reqData);
		if (response.errorCode === null) {
			toast.success('Cap nhat thanh cong');
			props?.action?.(true);
			dispatch(updateValueRefreshPage(true));
		} else if (response.errorCode === 2) {
			toast.error('Mat khau ko chinh xac');
		}
		console.log(reqData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
			{/* <Grid container>
						<Grid item xs={12}>
							<Grid container spacing={3}>
								

								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Mat khau
									</Typography>
									<TextField
										{...register('password')}
										id="password"
										name="password"
										variant="outlined"
										fullWidth
										//defaultValue="098788778"
										type="password"
										error={errors.password ? true : false}
										helperText={errors.password?.message}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid> */}
			<TextField
				{...register('password')}
				autoFocus
				margin="dense"
				name="password"
				label="Mat khau"
				type="password"
				fullWidth
				error={errors.password ? true : false}
				helperText={errors.password?.message}
			/>
			<DialogActions>
				<Button color="primary" onClick={() => props?.action?.(true)}>
					Dong
				</Button>
				<Button type="submit" color="primary" disabled={isSubmitting}>
					Xac nhan
				</Button>
			</DialogActions>
			{isSubmitting && (
				<CircularProgress
					color="secondary"
					style={{ position: 'fixed', top: '50%', left: '50%' }}
				/>
			)}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</form>
	);
};
export default InputPassword;
