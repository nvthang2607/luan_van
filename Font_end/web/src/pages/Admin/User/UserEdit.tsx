import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Collapse,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
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
import sp1 from './../../public/images/10047676-dien-thoai-vsmart-aris-8gb-128gb-xam-nhat-thuc-1.jpg';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { toast, ToastContainer } from 'react-toastify';
import { Close } from '@material-ui/icons';
import theme from '../../../utils/theme';
import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import Swal from 'sweetalert2';
import { CityGet, CommunePost, DistrictPost } from '../../../api/Address';
import { UpdateUserPost } from '../../../api/Admin/User';
interface ProfileInfoProps {
	profileInfo?: any;
	cancel?: (result: boolean) => void;
	create?: (result: boolean) => void;
}
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
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
const UserEdit: React.FC<ProfileInfoProps> = (props) => {
	const classes = useStyles();

	const schema = yup.object().shape({
		name: yup.string().required('Name không để trống'),
		email: yup.string().email('Email không hợp lệ').required('Email không để trống'),
		nameCity: yup.string().required('nameCity không để trống'),
		nameDistrict: yup.string().required('district không để trống'),
		nameCommune: yup.string().required('commune không để trống'),
		gender: yup.string().required('gioi tinh bat buoc').oneOf(['Nam', 'Nữ']),
		phone: yup
			.number()
			.required('Phone không để trống')
			.typeError('Số điện thoại không hợp lệ')
			.integer('Số điện thoại không hợp lệ'),
	});
	const [valueAddress, setValueAddress] = React.useState<any>(props.profileInfo);
	const {
		register,
		control,
		handleSubmit,
		reset,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: valueAddress,
	});
	const [progress, setProgress] = React.useState(false);
	const [idCity, setIdCity] = React.useState('');
	const [idDistrict, setIdDistrict] = React.useState('');
	const [idCommune, setIdCommune] = React.useState('');
	const [dataDistrict, setDataDistrict] = React.useState<any>([]);
	const [dataCommune, setDataCommune] = React.useState<any>([]);
	const [openCommune, setOpenCommune] = React.useState(false);
	const [openDistrict, setOpenDistrict] = React.useState(false);
	const loadingCommune = openCommune && dataCommune.length === 0;
	const loadingDistrict = openDistrict && dataDistrict.length === 0;
	const [data, setData] = React.useState<any>([]);
	const [openCity, setOpenCity] = React.useState(false);
	const loadingCity = openCity && data.length === 0;
	const [profileInfo, setProfileInfo] = React.useState<any>({});
	const [flagRefresh, setFlagRefresh] = React.useState(1);
	const [valueDistrict, setValueDistrict] = React.useState<any>({ id: '', name: '' });
	const [valueCommune, setValueCommnune] = React.useState<any>({ id: '', name: '' });

	React.useEffect(() => {
		const getData = async () => {
			//dispatch(userProfileAPI());
			// const profile = await UserGet();
			// if (profile.errorCode === null) {
			// 	setProfileInfo(profile.data);
			// }
			setOpenCity(true);

			const response = await CityGet();
			if (response.errorCode === null) {
				setData(response.data);
			}

			if (props.profileInfo.idCity !== '') {
				setOpenDistrict(true);
				const getDistrict = await DistrictPost({ idCity: props.profileInfo.idCity });
				if (getDistrict.errorCode === null) {
					setDataDistrict(getDistrict.data);
				}
			}

			if (props.profileInfo.idDistrict !== '') {
				setOpenCommune(true);
				const getCommune = await CommunePost({ idDistrict: props.profileInfo.idDistrict });
				//console.log(getCommune);
				if (getCommune.errorCode === null) {
					setDataCommune(getCommune.data);
				}
			}
		};
		getData();
	}, [props.profileInfo.idCity, props.profileInfo.idDistrict, flagRefresh]);
	const [flagOnChangeCity, setFlagOnchangeCity] = React.useState(false);
	const [flagOnChangeDistrict, setFlagOnchangeDistrict] = React.useState(false);
	const [flagOnchangeName, setFlagOnchangeName] = React.useState(false);
	const [flagOnchangGender, setFlagOnchangeGender] = React.useState(false);
	const [flagOnchangePhone, setFlagOnchangePhone] = React.useState(false);
	const [flagOnchangeEmail, setFlagOnchangeEmail] = React.useState(false);
	const [refresh, setRefresh] = React.useState(1);

	const onChangeCity = async (options: any) => {
		if (options) {
			reset({
				...valueAddress,
				nameDistrict: '',
				nameCommune: '',
				name: valueAddress.name,
				phone: valueAddress.phone,
				gender: valueAddress.gender,
				email: valueAddress.email,
			});
			setFlagOnchangeName(true);
			setFlagOnchangePhone(true);
			setFlagOnchangeGender(true);
			setFlagOnchangeEmail(true);
			//setValue('valueAddress', { nameDistrict: '', nameCommune: '' });
			setFlagOnchangeCity(true);
			setFlagOnchangeDistrict(true);
			setOpenCommune(false);
			setOpenDistrict(true);
			setValueAddress({ ...valueAddress, nameCity: options.name });
			setDataDistrict([]);
			setIdCity(options.id);
			const getDistrict = await DistrictPost({ idCity: options.id });
			setDataDistrict(getDistrict.data);
			setDataCommune([]);
		} else {
			setValueAddress({ ...valueAddress, nameCity: '' });
			//console.log('sanggg');
		}
	};

	const onChangeDistrict = async (options: any) => {
		if (options) {
			setFlagOnchangeCity(false);
			setFlagOnchangeEmail(true);
			setFlagOnchangeName(true);
			setFlagOnchangePhone(true);
			setFlagOnchangeGender(true);
			setValueAddress({ ...valueAddress, nameDistrict: options.name });
			reset({
				...valueAddress,
				nameCommune: '',
				name: valueAddress.name,
				nameDistrict: options.name,
				phone: valueAddress.phone,
				gender: valueAddress.gender,
				email: valueAddress.email,
			});
			setFlagOnchangeDistrict(true);
			setOpenCommune(true);
			setDataCommune([]);
			setIdDistrict(options.id);
			const getCommune = await CommunePost({ idDistrict: options.id });
			setDataCommune(getCommune.data);
		} else {
			setValueAddress({ ...valueAddress, nameDistrict: '' });
			//console.log('sanggg');
		}
	};
	const [open, setOpen] = React.useState(false);
	const [showInforOrder, setShowInforOrder] = React.useState(true);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onChangeCommune = (options: any) => {
		if (options) {
			setFlagOnchangeDistrict(false);

			setIdCommune(options.id);
			reset({
				...valueAddress,
				nameCommune: options.name,
				name: valueAddress.name,
				phone: valueAddress.phone,
				gender: valueAddress.gender,
				email: valueAddress.email,
			});
			setValueAddress({ ...valueAddress, nameCommune: options.name });
			setFlagOnchangeName(true);
			setFlagOnchangePhone(true);
			setFlagOnchangeGender(true);
			setFlagOnchangeEmail(true);
		} else {
			setValueAddress({ ...valueAddress, nameCommune: '' });
			//console.log('sanggg');
		}
	};
	const history = useHistory();

	const [valueSubmit, setValueSubmit] = React.useState<any>();
	const [dataInforOrder, setDataInforOrder] = React.useState<any>({});
	const onSubmit = async (data: any) => {
		let resultIdCity = '';
		let resultIdDistrict = '';
		let resultIdCommune = '';
		if (idCity === '') {
			resultIdCity = props.profileInfo.idCity;
		} else {
			resultIdCity = idCity;
		}
		if (idDistrict === '') {
			resultIdDistrict = props.profileInfo.idDistrict;
		} else {
			resultIdDistrict = idDistrict;
		}
		if (idCommune === '') {
			resultIdCommune = props.profileInfo.idCommune;
		} else {
			resultIdCommune = idCommune;
		}

		const reqData = {
			email: data.email,
			name: data.name,
			gender: data.gender,
			phone: data.phone,
			id_user: props.profileInfo.id,
			address: resultIdCommune + ', ' + resultIdDistrict + ', ' + resultIdCity,
		};
		setFlagOnchangeName(false);
		setFlagOnchangePhone(false);
		setFlagOnchangeGender(false);
		setFlagOnchangeEmail(false);
		setValueSubmit(reqData);
		const response = await UpdateUserPost(reqData);
		if (response.errorCode === null) {
			Swal.fire({
				icon: 'success',
				title: 'Cap nhat thong tin thanh cong',
			});
			props.create?.(true);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Co loi xay ra',
			});
		}
		console.log(props.profileInfo);
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit(onSubmit)}>
				<IconButton
					className={classes.closeButton}
					onClick={() => {
						props.cancel?.(false);
					}}
				>
					<Close />
				</IconButton>
				<DialogTitle>
					<Typography variant="h5">Cap nhat thong tin nguoi dung</Typography>
				</DialogTitle>
				<DialogContent dividers>
					<Grid item xs={12}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Grid container spacing={3}>
									{flagOnchangeEmail ? (
										<React.Fragment>
											<Grid item xs={4}>
												<Typography variant="body1" gutterBottom>
													Email
												</Typography>
												<Controller
													control={control}
													name="email"
													defaultValue={valueAddress.email}
													render={({ field: { onChange } }) => (
														<TextField
															id="email"
															InputProps={{
																readOnly: true,
															}}
															name="email"
															variant="outlined"
															fullWidth
															defaultValue={valueAddress.email}
															error={errors.email ? true : false}
															helperText={errors.email?.message}
															onChange={(e) => {
																setValueAddress({ ...valueAddress, email: e.target.value });
																onChange(e.target.value);
															}}
														/>
													)}
												/>
											</Grid>
										</React.Fragment>
									) : (
										<Grid item xs={4}>
											<Typography variant="body1" gutterBottom>
												Email
											</Typography>
											<Controller
												control={control}
												name="email"
												defaultValue={valueAddress.email}
												render={({ field: { onChange } }) => (
													<TextField
														id="email"
														name="email"
														InputProps={{
															readOnly: true,
														}}
														variant="outlined"
														defaultValue={valueAddress.email}
														fullWidth
														error={errors.email ? true : false}
														helperText={errors.email?.message}
														onChange={(e) => {
															setValueAddress({ ...valueAddress, email: e.target.value });
															onChange(e.target.value);
														}}
													/>
												)}
											/>
										</Grid>
									)}
									{flagOnchangeName ? (
										<React.Fragment>
											<Grid item xs={4}>
												<Typography variant="body1" gutterBottom>
													Họ và tên
												</Typography>
												<Controller
													control={control}
													name="name"
													defaultValue={valueAddress.name}
													render={({ field: { onChange } }) => (
														<TextField
															id="name"
															name="name"
															defaultValue={valueAddress.name}
															variant="outlined"
															fullWidth
															error={errors.name ? true : false}
															helperText={errors.name?.message}
															onChange={(e) => {
																onChange(e.target.value);
																setValueAddress({ ...valueAddress, name: e.target.value });
															}}
														/>
													)}
												/>
											</Grid>
										</React.Fragment>
									) : (
										<Grid item xs={4}>
											<Typography variant="body1" gutterBottom>
												Họ và tên
											</Typography>
											<Controller
												control={control}
												name="name"
												defaultValue={valueAddress.name}
												render={({ field: { onChange } }) => (
													<TextField
														id="name"
														name="name"
														defaultValue={valueAddress.name}
														variant="outlined"
														fullWidth
														error={errors.name ? true : false}
														helperText={errors.name?.message}
														//onChange={(e) => }
														onChange={(e) => {
															onChange(e.target.value);
															setValueAddress({ ...valueAddress, name: e.target.value });
														}}
													/>
												)}
											/>
										</Grid>
									)}
									{flagOnchangePhone ? (
										<React.Fragment>
											<Grid item xs={4}>
												<Typography variant="body1" gutterBottom>
													Số điện thoại
												</Typography>
												<Controller
													control={control}
													name="phone"
													defaultValue={valueAddress.phone}
													render={({ field: { onChange } }) => (
														<TextField
															id="phone"
															name="phone"
															variant="outlined"
															defaultValue={valueAddress.phone}
															fullWidth
															error={errors.phone ? true : false}
															helperText={errors.phone?.message}
															onChange={(e) => {
																onChange(e.target.value);
																setValueAddress({ ...valueAddress, phone: e.target.value });
															}}
														/>
													)}
												/>
											</Grid>
										</React.Fragment>
									) : (
										<Grid item xs={4}>
											<Typography variant="body1" gutterBottom>
												Số điện thoại
											</Typography>
											<Controller
												control={control}
												name="phone"
												defaultValue={valueAddress.phone}
												render={({ field: { onChange } }) => (
													<TextField
														id="phone"
														name="phone"
														variant="outlined"
														defaultValue={valueAddress.phone}
														fullWidth
														error={errors.phone ? true : false}
														helperText={errors.phone?.message}
														onChange={(e) => {
															onChange(e.target.value);
															setValueAddress({ ...valueAddress, phone: e.target.value });
														}}
													/>
												)}
											/>
										</Grid>
									)}
									<Grid item xs={4}>
										<Typography variant="body1" gutterBottom>
											Thành phố/Tỉnh
										</Typography>
										{/* <Controller
										control={control}
										name="nameCity"
										defaultValue={valueAddress.nameCity}
										render={({ field: { onChange } }) => ( */}
										<Autocomplete
											{...register('address')}
											options={data}
											onChange={(e, options: any) => onChangeCity(options)}
											getOptionLabel={(option: any) => option.name}
											loading={loadingCity}
											defaultValue={{
												name: valueAddress.nameCity,
											}}
											getOptionSelected={(option, value) => option.id === option.id}
											renderInput={(params) => (
												<TextField
													{...params}
													variant="outlined"
													name="nameCity"
													fullWidth
													error={errors.nameCity ? true : false}
													helperText={errors.nameCity?.message}
													//onChange={(e) => onChange(e.target.value)}
													//defaultValue={valueAddress.nameCity}
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<React.Fragment>
																{loadingCity ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</React.Fragment>
														),
													}}
												/>
											)}
										/>
										{/* )}
									/> */}
									</Grid>
									{flagOnChangeCity ? (
										<React.Fragment>
											<Grid item xs={4}>
												<Typography variant="body1" gutterBottom>
													Quận/Huyện
												</Typography>
												{/* <Controller
									control={control}
									name="nameDistrict"
									defaultValue={valueAddress.nameDistrict}
									render={({ field: { onChange } }) => ( */}
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
															fullWidth
															//defaultValue={valueDistrict.name}
															error={errors.nameDistrict ? true : false}
															helperText={errors.nameDistrict?.message}
															InputProps={{
																...params.InputProps,
																endAdornment: (
																	<React.Fragment>
																		{loadingDistrict ? (
																			<CircularProgress color="inherit" size={20} />
																		) : null}
																		{params.InputProps.endAdornment}
																	</React.Fragment>
																),
															}}
														/>
													)}
												/>
												{/* )}
								/> */}
											</Grid>
										</React.Fragment>
									) : (
										<Grid item xs={4}>
											<Typography variant="body1" gutterBottom>
												Quận/Huyện
											</Typography>
											{/* <Controller
										control={control}
										name="nameDistrict"
										defaultValue={valueAddress.nameDistrict}
										render={({ field: { onChange } }) => ( */}
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
														fullWidth
														//defaultValue={valueDistrict.name}
														error={errors.nameDistrict ? true : false}
														helperText={errors.nameDistrict?.message}
														InputProps={{
															...params.InputProps,
															endAdornment: (
																<React.Fragment>
																	{loadingDistrict ? (
																		<CircularProgress color="inherit" size={20} />
																	) : null}
																	{params.InputProps.endAdornment}
																</React.Fragment>
															),
														}}
													/>
												)}
											/>
											{/* )}
									/> */}
										</Grid>
									)}

									{flagOnChangeDistrict ? (
										<React.Fragment>
											<Grid item xs={4}>
												<Typography variant="body1" gutterBottom>
													Phường/Xã
												</Typography>
												{/* <Controller
										control={control}
										name="nameCommune"
										defaultValue={valueAddress.nameCommune}
										render={({ field: { onChange } }) => ( */}
												<Autocomplete
													options={dataCommune}
													{...register('commune')}
													defaultValue={{ name: '' }}
													onChange={(e, options: any) => onChangeCommune(options)}
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
															variant="outlined"
															name="nameCommune"
															fullWidth
															//defaultValue={valueCommune.name}
															error={errors.nameCommune ? true : false}
															helperText={errors.nameCommune?.message}
															InputProps={{
																...params.InputProps,
																endAdornment: (
																	<React.Fragment>
																		{loadingCommune ? (
																			<CircularProgress color="inherit" size={20} />
																		) : null}
																		{params.InputProps.endAdornment}
																	</React.Fragment>
																),
															}}
														/>
													)}
												/>
												{/* )}
									/> */}
											</Grid>
										</React.Fragment>
									) : (
										<Grid item xs={4}>
											<Typography variant="body1" gutterBottom>
												Phường/Xã
											</Typography>
											{/* <Controller
										control={control}
										name="nameCommune"
										defaultValue={valueAddress.nameCommune}
										render={({ field: { onChange } }) => ( */}
											<Autocomplete
												options={dataCommune}
												{...register('commune')}
												defaultValue={{ name: valueAddress.nameCommune }}
												onChange={(e, options: any) => onChangeCommune(options)}
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
														variant="outlined"
														name="nameCommune"
														fullWidth
														//defaultValue={valueCommune.name}
														error={errors.nameCommune ? true : false}
														helperText={errors.nameCommune?.message}
														InputProps={{
															...params.InputProps,
															endAdornment: (
																<React.Fragment>
																	{loadingCommune ? (
																		<CircularProgress color="inherit" size={20} />
																	) : null}
																	{params.InputProps.endAdornment}
																</React.Fragment>
															),
														}}
													/>
												)}
											/>
											{/* )}
									/> */}
										</Grid>
									)}

									{flagOnchangGender ? (
										<React.Fragment>
											<Grid item xs={12}>
												<Typography variant="body1" gutterBottom>
													Giới tính
												</Typography>
												<Controller
													control={control}
													name="gender"
													defaultValue={valueAddress.gender}
													render={({ field: { onChange, value } }) => (
														<RadioGroup
															name="gender"
															value={value}
															row
															onChange={(e) => {
																onChange(e.target.value);
																setValueAddress({ ...valueAddress, gender: e.target.value });
															}}
														>
															<FormControlLabel
																value="Nam"
																control={<Radio color="primary" />}
																label="Nam"
															/>
															<FormControlLabel
																value="Nữ"
																control={<Radio color="primary" />}
																label="Nữ"
															/>
														</RadioGroup>
													)}
												/>
												{errors.gender && (
													<FormHelperText error>{errors.gender.message}</FormHelperText>
												)}
											</Grid>
										</React.Fragment>
									) : (
										<Grid item xs={12}>
											<Typography variant="body1" gutterBottom>
												Giới tính
											</Typography>
											<Controller
												control={control}
												name="gender"
												defaultValue={valueAddress.gender}
												render={({ field: { onChange, value } }) => (
													<RadioGroup
														name="gender"
														value={value}
														row
														onChange={(e) => {
															onChange(e.target.value);
															setValueAddress({ ...valueAddress, gender: e.target.value });
														}}
													>
														<FormControlLabel
															value="Nam"
															control={<Radio color="primary" />}
															label="Nam"
														/>
														<FormControlLabel
															value="Nữ"
															control={<Radio color="primary" />}
															label="Nữ"
														/>
													</RadioGroup>
												)}
											/>
											{errors.gender && (
												<FormHelperText error>{errors.gender.message}</FormHelperText>
											)}
										</Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid item xs={12}>
						<Button
							variant="outlined"
							color="primary"
							size="large"
							type="submit"
							//disabled={true}
							style={{ position: 'relative' }}
						>
							cap nhat thong tin
							{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
						</Button>
						&nbsp;&nbsp;
						<Button
							variant="outlined"
							color="primary"
							size="large"
							//disabled={true}
							style={{ position: 'relative' }}
							onClick={() => {
								props.cancel?.(false);
							}}
						>
							Dong
							{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
						</Button>
					</Grid>
				</DialogActions>
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
		</React.Fragment>
	);
};
export default UserEdit;
