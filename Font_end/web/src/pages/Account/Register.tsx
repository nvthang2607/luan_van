import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import { LoginPost } from '../../api/LoginAPI';
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
		nameCity: yup.string().required('Address không để trống'),
		nameDistrict: yup.string().required('district không để trống'),
		nameCommune: yup.string().required('commune không để trống'),
		password: yup.string().required('Mật khẩu không để trống').min(8, 'Mật khẩu ít nhất 8 ký tự'),
		gender: yup.string().required('gioi tinh bat buoc').oneOf(['Nam', 'Nữ']),
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
	const [valueAddress, setValueAddress] = React.useState<any>({
		nameCity: '',
		nameDistrict: '',
		nameCommune: '',
		name: '',
		email: '',
		gender: 'Nam',
		phone: 0,
		password: '',
		retypePassword: '',
	});
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: valueAddress,
	});
	const [progress, setProgress] = React.useState(false);
	const [idCity, setIdCity] = React.useState('');
	const [idDistrict, setIdDistrict] = React.useState('');
	const [idCommune, setIdCommune] = React.useState('');
	const [idCity1, setIdCity1] = React.useState('');
	const [idDistrict1, setIdDistrict1] = React.useState('');
	const [idCommue1, setIdCommue1] = React.useState('');
	const history = useHistory();

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
	const [flagOnchangeCity, setFlagOnchangeCity] = React.useState(false);
	const [flagOnchangeName, setFlagOnchangeName] = React.useState(false);
	const [flagOnchangeEmail, setFlagOnchangeEmail] = React.useState(false);
	const [flagOnchangePassword, setFlagOnchangePassword] = React.useState(false);
	const [flagOnchangeRetypePassword, setFlagOnchangeRetypePassword] = React.useState(false);
	const [flagOnchangeGender, setFlagOnchangeGender] = React.useState(false);
	const [flagOnchangePhone, setFlagOnchangePhone] = React.useState(false);
	const [valueInfo, setValueInfo] = React.useState<any>({
		name: '',
		email: '',
		gender: 'Nam',
		phone: '',
		password: '',
		retypePassword: '',
	});
	const [flagOnChangeDistrict, setFlagOnchangeDistrict] = React.useState(false);
	const onChangeCity = async (options: any) => {
		if (options) {
			reset({
				...valueAddress,
				nameDistrict: '',
				nameCommune: '',
				name: valueInfo.name,
				email: valueInfo.email,
				gender: valueInfo.gender,
				password: valueInfo.password,
				retypePassword: valueInfo.retypePassword,
				phone: valueInfo.phone,
			});
			setValueAddress({ ...valueAddress, nameCity: options.name });
			setFlagOnchangeName(true);
			setFlagOnchangeEmail(true);
			setFlagOnchangePassword(true);
			setFlagOnchangeRetypePassword(true);
			setFlagOnchangePhone(true);
			setFlagOnchangeGender(true);
			setFlagOnchangeCity(true);
			setFlagOnchangeDistrict(true);
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
			setValueAddress({ ...valueAddress, nameDistrict: options.name });
			setFlagOnchangeCity(false);
			setFlagOnchangeDistrict(true);

			reset({
				...valueAddress,
				nameCommune: '',
				nameDistrict: options.name,
				name: valueInfo.name,
				email: valueInfo.email,
				gender: valueInfo.gender,
				password: valueInfo.password,
				retypePassword: valueInfo.retypePassword,
				phone: valueInfo.phone,
			});
			setFlagOnchangeName(true);
			setFlagOnchangeEmail(true);
			setFlagOnchangePassword(true);
			setFlagOnchangeRetypePassword(true);
			setFlagOnchangePhone(true);
			setFlagOnchangeGender(true);
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
			setFlagOnchangeDistrict(false);
			setFlagOnchangeName(true);
			setFlagOnchangeEmail(true);
			setFlagOnchangePassword(true);
			setFlagOnchangeRetypePassword(true);
			setFlagOnchangePhone(true);
			setFlagOnchangeGender(true);
			reset({
				...valueAddress,
				nameCommune: options.name,
				name: valueInfo.name,
				email: valueInfo.email,
				gender: valueInfo.gender,
				password: valueInfo.password,
				retypePassword: valueInfo.retypePassword,
				phone: valueInfo.phone,
			});
			setValueAddress({ ...valueAddress, nameCommune: options.name });
			setFlagOnchangeEmail(true);
			setFlagOnchangePassword(true);
			setFlagOnchangeRetypePassword(true);
			setFlagOnchangePhone(true);
			setFlagOnchangeGender(true);
		}
	};
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
			const res = await LoginPost({ email: data.email, password: data.password });
			if (res?.errorCode === null) {
				window.localStorage.setItem('token', res.data.accessToken || '');
			}
			if (res?.errorCode || res?.errorCode === null) {
				props?.receivePropsRegister?.(false);
				setProgress(false);
				history.push('/');
			}
		}
		setFlagOnchangeName(false);
		setFlagOnchangeEmail(false);
		setFlagOnchangePassword(false);
		setFlagOnchangeRetypePassword(false);
		setFlagOnchangePhone(false);
		setFlagOnchangeGender(false);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={3}>
				{flagOnchangeName ? (
					<React.Fragment>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Họ và tên
							</Typography>
							<Controller
								control={control}
								name="name"
								defaultValue={valueInfo.name}
								render={({ field: { onChange } }) => (
									<TextField
										id="name"
										name="name"
										variant="outlined"
										defaultValue={valueInfo.name}
										fullWidth
										error={errors.name ? true : false}
										helperText={errors.name?.message}
										onChange={(e) => {
											setValueInfo({ ...valueInfo, name: e.target.value });
											onChange(e.target.value);
										}}
									/>
								)}
							/>
						</Grid>
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Họ và tên
						</Typography>
						<Controller
							control={control}
							name="name"
							defaultValue={valueInfo.name}
							render={({ field: { onChange } }) => (
								<TextField
									id="name"
									name="name"
									variant="outlined"
									defaultValue={valueInfo.name}
									fullWidth
									error={errors.name ? true : false}
									helperText={errors.name?.message}
									onChange={(e) => {
										setValueInfo({ ...valueInfo, name: e.target.value });
										onChange(e.target.value);
									}}
								/>
							)}
						/>
					</Grid>
				)}
				{flagOnchangeEmail ? (
					<React.Fragment>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Email
							</Typography>
							<Controller
								control={control}
								name="email"
								defaultValue={valueInfo.email}
								render={({ field: { onChange } }) => (
									<TextField
										id="email"
										name="email"
										variant="outlined"
										fullWidth
										defaultValue={valueInfo.email}
										error={errors.email ? true : false}
										helperText={errors.email?.message}
										onChange={(e) => {
											setValueInfo({ ...valueInfo, email: e.target.value });
											onChange(e.target.value);
										}}
									/>
								)}
							/>
						</Grid>
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Email
						</Typography>
						<Controller
							control={control}
							name="email"
							defaultValue={valueInfo.email}
							render={({ field: { onChange } }) => (
								<TextField
									id="email"
									name="email"
									variant="outlined"
									fullWidth
									error={errors.email ? true : false}
									helperText={errors.email?.message}
									onChange={(e) => {
										setValueInfo({ ...valueInfo, email: e.target.value });
										onChange(e.target.value);
									}}
								/>
							)}
						/>
					</Grid>
				)}
				{flagOnchangePassword ? (
					<React.Fragment>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Nhập mật khẩu
							</Typography>

							<FormControl variant="outlined" fullWidth>
								<Controller
									control={control}
									name="password"
									defaultValue={valueInfo.password}
									render={({ field: { onChange } }) => (
										<OutlinedInput
											id="password"
											name="password"
											defaultValue={valueInfo.password}
											type={state.showPwd ? 'text' : 'password'}
											error={errors.password ? true : false}
											//helperText={errors.password?.message}
											//value={values.password}
											//onChange={handleChange('password')}
											onChange={(e) => {
												setValueInfo({ ...valueInfo, password: e.target.value });
												onChange(e.target.value);
											}}
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
									)}
								/>

								<FormHelperText error id="accountId-error">
									{errors.password ? errors.password.message : ''}
								</FormHelperText>
							</FormControl>
						</Grid>
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Nhập mật khẩu
						</Typography>

						<FormControl variant="outlined" fullWidth>
							<Controller
								control={control}
								name="password"
								defaultValue={valueInfo.password}
								render={({ field: { onChange } }) => (
									<OutlinedInput
										id="password"
										name="password"
										defaultValue={valueInfo.password}
										type={state.showPwd ? 'text' : 'password'}
										error={errors.password ? true : false}
										//helperText={errors.password?.message}
										//value={values.password}
										//onChange={handleChange('password')}
										onChange={(e) => {
											setValueInfo({ ...valueInfo, password: e.target.value });
											onChange(e.target.value);
										}}
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
								)}
							/>

							<FormHelperText error id="accountId-error">
								{errors.password ? errors.password.message : ''}
							</FormHelperText>
						</FormControl>
					</Grid>
				)}
				{flagOnchangeRetypePassword ? (
					<React.Fragment>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Nhập lại mật khẩu
							</Typography>

							<FormControl variant="outlined" fullWidth>
								<Controller
									control={control}
									name="retypePassword"
									defaultValue={valueInfo.retypePassword}
									render={({ field: { onChange } }) => (
										<OutlinedInput
											id="retypePassword"
											name="retypePassword"
											defaultValue={valueInfo.retypePassword}
											type={state.showRetypePwd ? 'text' : 'password'}
											error={errors.retypePassword ? true : false}
											//helperText={errors.password?.message}
											//value={values.password}
											//onChange={handleChange('password')}
											onChange={(e) => {
												setValueInfo({ ...valueInfo, retypePassword: e.target.value });
												onChange(e.target.value);
											}}
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
									)}
								/>

								<FormHelperText error id="accountId-error">
									{errors.retypePassword ? errors.retypePassword.message : ''}
								</FormHelperText>
							</FormControl>
						</Grid>
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Nhập lại mật khẩu
						</Typography>

						<FormControl variant="outlined" fullWidth>
							<Controller
								control={control}
								name="retypePassword"
								defaultValue={valueInfo.retypePassword}
								render={({ field: { onChange } }) => (
									<OutlinedInput
										id="retypePassword"
										name="retypePassword"
										defaultValue={valueInfo.retypePassword}
										type={state.showRetypePwd ? 'text' : 'password'}
										error={errors.retypePassword ? true : false}
										//helperText={errors.password?.message}
										//value={values.password}
										//onChange={handleChange('password')}
										onChange={(e) => {
											setValueInfo({ ...valueInfo, retypePassword: e.target.value });
											onChange(e.target.value);
										}}
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
								)}
							/>

							<FormHelperText error id="accountId-error">
								{errors.retypePassword ? errors.retypePassword.message : ''}
							</FormHelperText>
						</FormControl>
					</Grid>
				)}
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
						defaultValue={{ name: valueAddress.nameCity }}
						getOptionSelected={(option, value) => option.id === option.id}
						renderInput={(params) => (
							<TextField
								{...params}
								label="City *"
								variant="outlined"
								name="nameCity"
								fullWidth
								error={errors.nameCity ? true : false}
								helperText={errors.nameCity?.message}
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
				{flagOnchangeCity ? (
					<React.Fragment>
						<Grid item xs={12}>
							{/* <Typography variant="body1" gutterBottom className={classes.titleInput}>
						District
					</Typography> */}
							<Autocomplete
								options={dataDistrict}
								{...register('district')}
								defaultValue={{ name: '' }}
								onChange={(e, options: any) => onChangeDistrict(options)}
								getOptionLabel={(option: any) => option.name}
								loading={loadingDistrict}
								getOptionSelected={(option, value) => option.id === option.id}
								renderInput={(params) => (
									<TextField
										{...params}
										variant="outlined"
										name="nameDistrict"
										label="District *"
										fullWidth
										error={errors.nameDistrict ? true : false}
										helperText={errors.nameDistrict?.message}
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
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						{/* <Typography variant="body1" gutterBottom className={classes.titleInput}>
						District
					</Typography> */}
						<Autocomplete
							options={dataDistrict}
							{...register('district')}
							defaultValue={{ name: valueAddress.nameDistrict }}
							onChange={(e, options: any) => onChangeDistrict(options)}
							getOptionLabel={(option: any) => option.name}
							loading={loadingDistrict}
							getOptionSelected={(option, value) => option.id === option.id}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="outlined"
									name="nameDistrict"
									label="District *"
									fullWidth
									error={errors.nameDistrict ? true : false}
									helperText={errors.nameDistrict?.message}
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
				)}
				{flagOnChangeDistrict ? (
					<React.Fragment>
						<Grid item xs={12}>
							{/* <Typography variant="body1" gutterBottom className={classes.titleInput}>
						Commune
					</Typography> */}
							<Autocomplete
								options={dataCommune}
								{...register('commune')}
								onChange={(e, options: any) => onChangeCommune(options)}
								defaultValue={{ name: '' }}
								getOptionLabel={(option: any) => option.name}
								getOptionSelected={(option, value) => option.id === option.id}
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
										name="nameCommune"
										fullWidth
										error={errors.nameCommune ? true : false}
										helperText={errors.nameCommune?.message}
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
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						{/* <Typography variant="body1" gutterBottom className={classes.titleInput}>
						Commune
					</Typography> */}
						<Autocomplete
							options={dataCommune}
							{...register('commune')}
							onChange={(e, options: any) => onChangeCommune(options)}
							defaultValue={{ name: valueAddress.nameCommune }}
							getOptionLabel={(option: any) => option.name}
							getOptionSelected={(option, value) => option.id === option.id}
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
									name="nameCommune"
									fullWidth
									error={errors.nameCommune ? true : false}
									helperText={errors.nameCommune?.message}
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
				)}
				{flagOnchangePhone ? (
					<React.Fragment>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Số điện thoại
							</Typography>
							<Controller
								control={control}
								name="phone"
								defaultValue={valueInfo.phone}
								render={({ field: { onChange } }) => (
									<TextField
										id="phone"
										name="phone"
										variant="outlined"
										fullWidth
										defaultValue={valueInfo.phone}
										error={errors.phone ? true : false}
										helperText={errors.phone?.message}
										onChange={(e) => {
											setValueInfo({ ...valueInfo, phone: e.target.value });
											onChange(e.target.value);
										}}
									/>
								)}
							/>
						</Grid>
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Số điện thoại
						</Typography>
						<Controller
							control={control}
							name="phone"
							defaultValue={valueInfo.phone}
							render={({ field: { onChange } }) => (
								<TextField
									id="phone"
									name="phone"
									variant="outlined"
									fullWidth
									defaultValue={valueInfo.phone}
									error={errors.phone ? true : false}
									helperText={errors.phone?.message}
									onChange={(e) => {
										setValueInfo({ ...valueInfo, phone: e.target.value });
										onChange(e.target.value);
									}}
								/>
							)}
						/>
					</Grid>
				)}
				{flagOnchangeGender ? (
					<React.Fragment>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Giới tính
							</Typography>
							<Controller
								control={control}
								name="gender"
								defaultValue={valueInfo.gender}
								render={({ field: { onChange, value } }) => (
									<RadioGroup
										name="gender"
										value={value}
										row
										onChange={(e) => {
											onChange(e.target.value);
											setValueInfo({ ...valueInfo, gender: e.target.value });
										}}
									>
										<FormControlLabel value="Nam" control={<Radio color="primary" />} label="Nam" />
										<FormControlLabel value="Nữ" control={<Radio color="primary" />} label="Nữ" />
									</RadioGroup>
								)}
							/>
							{errors.gender && <FormHelperText error>{errors.gender.message}</FormHelperText>}
						</Grid>
					</React.Fragment>
				) : (
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Giới tính
						</Typography>
						<Controller
							control={control}
							name="gender"
							defaultValue={valueInfo.gender}
							render={({ field: { onChange, value } }) => (
								<RadioGroup
									name="gender"
									value={value}
									row
									onChange={(e) => {
										onChange(e.target.value);
										setValueInfo({ ...valueInfo, gender: e.target.value });
									}}
								>
									<FormControlLabel value="Nam" control={<Radio color="primary" />} label="Nam" />
									<FormControlLabel value="Nữ" control={<Radio color="primary" />} label="Nữ" />
								</RadioGroup>
							)}
						/>
						{errors.gender && <FormHelperText error>{errors.gender.message}</FormHelperText>}
					</Grid>
				)}
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
