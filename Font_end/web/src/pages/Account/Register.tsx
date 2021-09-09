import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import Logo from '../../public/images/logo1.png';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import fbIcon from '../../public/images/facebook.svg';
import ggIcon from '../../public/images/google.webp';
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
	FormControlLabel,
	Radio,
	RadioGroup,
	CircularProgress,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { CityGet, CommunePost, DistrictPost } from '../../api/Address';
import { RegisterDTO } from '../../DTO/Register/RegisterDTO';
import { RegisterPost } from '../../api/RegisterAPI';
interface registerProps {
	receivePropsRegister?: (result: boolean) => void;
	resultApiRegister?: (result: any) => void;
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
const Register: React.FC<registerProps> = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const schema = yup.object().shape({
		email: yup.string().email('Email không hợp lệ').required('Email không để trống'),
		name: yup.string().required('Name không để trống'),
		address: yup.string().required('Address không để trống'),
		district: yup.string().required('district không để trống'),
		commune: yup.string().required('commune không để trống'),
		password: yup.string().required('Mật khẩu không để trống').min(8, 'Mật khẩu ít nhất 8 ký tự'),
		retypePassword: yup
			.string()
			.required('Mật khẩu không để trống')
			.oneOf([yup.ref('password')], '2 trường mật khẩu ko giống nhau'),
		phone: yup
			.number()
			.required('Phone không để trống')
			.typeError('Số điện thoại không hợp lệ')
			.integer('Số điện thoại không hợp lệ'),
		//.max(11, 'Số điện thoại không hợp lệ'),
	});
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [progress, setProgress] = React.useState(false);
	const [idCity, setIdCity] = React.useState('');
	const [idDistrict, setIdDistrict] = React.useState('');
	const [idCommune, setIdCommune] = React.useState('');
	const [idCity1, setIdCity1] = React.useState('');
	const [idDistrict1, setIdDistrict1] = React.useState('');
	const [idCommue1, setIdCommue1] = React.useState('');
	const onSubmit = async (data: any) => {
		const dataRegister = {
			name: data.name,
			email: data.email,
			password: data.password,
			gender: data.gender,
			idCity: idCity1,
			idDistrict: idDistrict1,
			idCommue: idCommue1,
			phone: data.phone,
		};
		props?.receivePropsRegister?.(true);
		setProgress(true);
		const response = await RegisterPost(dataRegister);
		if (response?.errorCode) {
			props?.resultApiRegister?.(response.errorCode);
			props?.receivePropsRegister?.(false);
			setProgress(false);
		} else if (response?.errorCode === null) {
			console.log('dang nhap');
			props?.receivePropsRegister?.(false);
			setProgress(false);
		}
	};
	const [state, setState] = React.useState({
		showPwd: false,
		showRetypePwd: false,
	});
	const handleClickShowPassword = () => {
		setState({ ...state, showPwd: !state.showPwd });
	};
	const handleClickShowRetypePassword = () => {
		setState({ ...state, showRetypePwd: !state.showRetypePwd });
	};
	const [data, setData] = React.useState<any>([]);
	const [openCity, setOpenCity] = React.useState(false);
	const loadingCity = openCity && data.length === 0;

	React.useEffect(() => {
		const getData = async () => {
			setOpenCity(true);
			const response = await CityGet();
			setData(response.data);
		};
		getData();
	}, []);
	const [dataDistrict, setDataDistrict] = React.useState<any>([]);
	const [dataCommune, setDataCommune] = React.useState<any>([]);

	const [openCommune, setOpenCommune] = React.useState(false);
	const [openDistrict, setOpenDistrict] = React.useState(false);
	const loadingCommune = openCommune && dataCommune.length === 0;
	const loadingDistrict = openDistrict && dataDistrict.length === 0;
	const onChangeCity = async (options: any) => {
		if (options) {
			setIdCity1(options.id);
			setOpenCommune(false);
			setOpenDistrict(true);
			setDataDistrict([]);
			setIdCity(options.id);
			const getDistrict = await DistrictPost({ idCity: options.id });
			setDataDistrict(getDistrict.data);
			setDataCommune([]);
		}
	};
	const onChangeDistrict = async (options: any) => {
		if (options) {
			setIdDistrict1(options.id);
			setOpenCommune(true);
			setDataCommune([]);
			setIdCommune(options.id);
			const getCommune = await CommunePost({ idDistrict: options.id });
			setDataCommune(getCommune.data);
		}
	};
	const onChangeCommune = (options: any) => {
		if (options) {
			setIdCommue1(options.id);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="body1" gutterBottom className={classes.titleInput}>
						Họ và tên
					</Typography>
					<TextField
						{...register('name')}
						id="name"
						name="name"
						variant="outlined"
						fullWidth
						error={errors.name ? true : false}
						helperText={errors.name?.message}
					/>
				</Grid>
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
					<FormControl variant="outlined" fullWidth>
						<OutlinedInput
							{...register('password')}
							id="psssword"
							name="password"
							type={state.showPwd ? 'text' : 'password'}
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
										{state.showPwd ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText error id="accountId-error">
							{errors.password ? errors.password.message : ''}
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1" gutterBottom className={classes.titleInput}>
						Nhập lại mật khẩu
					</Typography>
					<FormControl variant="outlined" fullWidth>
						<OutlinedInput
							{...register('retypePassword')}
							id="retypePassword"
							name="retypePassword"
							type={state.showRetypePwd ? 'text' : 'password'}
							error={errors.retypePassword ? true : false}
							//helperText={errors.password?.message}
							//value={values.password}
							//onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowRetypePassword}
										//onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{state.showRetypePwd ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText error id="accountId-error">
							{errors.retypePassword ? errors.retypePassword.message : ''}
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1" gutterBottom className={classes.titleInput}>
						Địa chỉ
					</Typography>
					<Autocomplete
						options={data}
						{...register('address')}
						onChange={(e, options: any) => onChangeCity(options)}
						getOptionLabel={(option: any) => option.name}
						loading={loadingCity}
						//getOptionSelected={(option, value) => option.id === option.id}
						renderInput={(params) => (
							<TextField
								{...params}
								label="City *"
								variant="outlined"
								name="address"
								fullWidth
								error={errors.address ? true : false}
								helperText={errors.address?.message}
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loadingCity ? <CircularProgress color="inherit" size={20} /> : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* <Typography variant="body1" gutterBottom className={classes.titleInput}>
						District
					</Typography> */}
					<Autocomplete
						options={dataDistrict}
						{...register('district')}
						onChange={(e, options: any) => onChangeDistrict(options)}
						getOptionLabel={(option: any) => option.name}
						loading={loadingDistrict}
						//getOptionSelected={(option, value) => option.id === option.id}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								name="district"
								label="District *"
								fullWidth
								error={errors.district ? true : false}
								helperText={errors.district?.message}
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loadingDistrict ? <CircularProgress color="inherit" size={20} /> : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* <Typography variant="body1" gutterBottom className={classes.titleInput}>
						Commune
					</Typography> */}
					<Autocomplete
						options={dataCommune}
						{...register('commune')}
						onChange={(e, options: any) => onChangeCommune(options)}
						getOptionLabel={(option: any) => option.name}
						//getOptionSelected={(option, value) => option.id === option.id}
						// open={open}
						// onOpen={() => {
						// 	setOpen(true);
						// }}
						// onClose={() => {
						// 	setOpen(false);
						// }}
						loading={loadingCommune}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Commune *"
								variant="outlined"
								name="commune"
								fullWidth
								error={errors.commune ? true : false}
								helperText={errors.commune?.message}
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loadingCommune ? <CircularProgress color="inherit" size={20} /> : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1" gutterBottom className={classes.titleInput}>
						Số điện thoại
					</Typography>
					<TextField
						{...register('phone')}
						id="phone"
						name="phone"
						variant="outlined"
						fullWidth
						error={errors.phone ? true : false}
						helperText={errors.phone?.message}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1" gutterBottom className={classes.titleInput}>
						Giới tính
					</Typography>
					<Controller
						control={control}
						name="gender"
						defaultValue="Nam"
						render={({ field: { onChange, value } }) => (
							<RadioGroup
								name="gender"
								value={value}
								row
								onChange={(e) => onChange(e.target.value)}
							>
								<FormControlLabel value="Nam" control={<Radio color="primary" />} label="Nam" />
								<FormControlLabel value="Nữ" control={<Radio color="primary" />} label="Nữ" />
							</RadioGroup>
						)}
					/>
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
						disabled={progress}
					>
						đăng ký
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
export default Register;
