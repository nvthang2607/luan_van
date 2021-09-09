import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	FormControlLabel,
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
import { NavLink } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { CityGet, CommunePost, DistrictPost } from '../../api/Address';
import { UserGet } from '../../api/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserProfile, userProfileAPI } from './UserSlice';
interface ProfileInfoProps {
	profileInfo?: any;
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
const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
	const classes = useStyles();
	const schema = yup.object().shape({
		password: yup.string().required('Mật khẩu không để trống').min(8, 'Mật khẩu ít nhất 8 ký tự'),
		name: yup.string().required('Name không để trống'),
		address: yup.string().required('Address không để trống'),
		//district: yup.string().required('district không để trống'),
		//commune: yup.string().required('commune không để trống'),
		phone: yup
			.number()
			.required('Phone không để trống')
			.typeError('Số điện thoại không hợp lệ')
			.integer('Số điện thoại không hợp lệ'),
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
	const [dataDistrict, setDataDistrict] = React.useState<any>([]);
	const [dataCommune, setDataCommune] = React.useState<any>([]);
	const [value, setValue] = React.useState<any>({ id: '01', name: 'Thành phố Hà Nội' });
	const [openCommune, setOpenCommune] = React.useState(false);
	const [openDistrict, setOpenDistrict] = React.useState(false);
	const loadingCommune = openCommune && dataCommune.length === 0;
	const loadingDistrict = openDistrict && dataDistrict.length === 0;
	const [data, setData] = React.useState<any>([]);
	const [openCity, setOpenCity] = React.useState(false);
	const loadingCity = openCity && data.length === 0;
	const [flagOnchange, setFlagOnchange] = React.useState(true);
	const [profileInfo, setProfileInfo] = React.useState<any>({});
	const [valueCity, setValueCity] = React.useState<any>({ id: '', name: 'Thành phố Hà Nội' });
	const [valueDistrict, setValueDistrict] = React.useState<any>({ id: '', name: '' });
	const [valueCommune, setValueCommnune] = React.useState<any>({ id: '', name: '' });
	React.useEffect(() => {
		const getData = async () => {
			//dispatch(userProfileAPI());
			const profile = await UserGet();
			if (profile.errorCode === null) {
				setProfileInfo(profile.data);
			}
			setOpenCity(true);
			setOpenDistrict(true);
			setOpenCommune(true);
			const response = await CityGet();
			if (response.errorCode === null) {
				setData(response.data);
			}

			const getDistrict = await DistrictPost({ idCity: '01' });
			if (getDistrict.errorCode === null) {
				setDataDistrict(getDistrict.data);
			}

			const getCommune = await CommunePost({ idDistrict: '001' });
			//console.log(getCommune);
			if (getCommune.errorCode === null) {
				setDataCommune(getCommune.data);
			}
		};
		getData();
	}, []);
	const onChangeCity = async (options: any) => {
		setFlagOnchange(false);

		if (options) {
			setIdCity1(options.id);
			setOpenCommune(false);
			setOpenDistrict(true);
			setValueCity({ ...valueCity, name: options.name });
			setDataDistrict([]);
			setIdCity(options.id);
			const getDistrict = await DistrictPost({ idCity: options.id });
			setDataDistrict(getDistrict.data);
			setDataCommune([]);
		} else {
			setValueCity({ ...valueCity, name: '' });
			console.log('sanggg');
		}
	};
	const onChangeDistrict = async (options: any) => {
		if (options) {
			setIdDistrict1(options.id);
			//console.log(options.id);

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
	const onSubmit = (data: any) => {
		console.log(data);
		console.log('city: ', valueCity.name);
	};

	return (
		<Container>
			<Grid item xs={12}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant="h5">Thong tin ca nhan</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Email
									</Typography>
									<TextField
										id="email"
										name="email"
										defaultValue={props.profileInfo.email}
										InputProps={{
											readOnly: true,
										}}
										variant="outlined"
										fullWidth
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Họ và tên
									</Typography>
									<Controller
										control={control}
										name="name"
										defaultValue={props.profileInfo.name}
										render={({ field: { onChange } }) => (
											<TextField
												{...register('name')}
												id="name"
												name="name"
												defaultValue={props.profileInfo.name}
												variant="outlined"
												fullWidth
												error={errors.name ? true : false}
												helperText={errors.name?.message}
												onChange={(e) => onChange(e.target.value)}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Số điện thoại
									</Typography>
									<Controller
										control={control}
										name="phone"
										defaultValue={props.profileInfo.phone}
										render={({ field: { onChange } }) => (
											<TextField
												id="phone"
												name="phone"
												variant="outlined"
												defaultValue={props.profileInfo.phone}
												fullWidth
												error={errors.phone ? true : false}
												helperText={errors.phone?.message}
												onChange={(e) => onChange(e.target.value)}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Giới tính
									</Typography>
									<Controller
										control={control}
										name="gender"
										defaultValue={props.profileInfo.gender}
										render={({ field: { onChange, value } }) => (
											<RadioGroup
												name="gender"
												value={value}
												row
												onChange={(e) => onChange(e.target.value)}
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
								</Grid>
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
										defaultValue="098788778"
										type="password"
										error={errors.password ? true : false}
										helperText={errors.password?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										size="large"
										type="submit"
										//disabled={true}
										style={{ position: 'relative' }}
									>
										cap nhat thong tin
										{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
									</Button>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={6}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant="h5">Thong tin dia chi</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Thành phố/Tỉnh
									</Typography>
									<Controller
										control={control}
										name="address"
										defaultValue={valueCity.name}
										render={({ field: { onChange } }) => (
											<Autocomplete
												{...register('address')}
												options={data}
												onChange={(e, options: any) => onChangeCity(options)}
												getOptionLabel={(option: any) => option.name}
												loading={loadingCity}
												defaultValue={{ name: valueCity.name }}
												getOptionSelected={(option, value) => option.id === option.id}
												renderInput={(params) => (
													<TextField
														{...params}
														variant="outlined"
														name="address"
														fullWidth
														error={errors.address ? true : false}
														helperText={errors.address?.message}
														//onChange={(e) => onChange(e.target.value)}
														//defaultValue={value.name}
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
										)}
									/>
								</Grid>
								{/* <Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Quận/Huyện
									</Typography>
									<Controller
										control={control}
										name="district"
										defaultValue={valueDistrict.name}
										render={({ field: { onChange } }) => (
											<Autocomplete
												options={dataDistrict}
												{...register('district')}
												defaultValue={{ name: valueDistrict.name }}
												onChange={(e, options: any) => onChangeDistrict(options)}
												getOptionLabel={(option: any) => option.name}
												loading={loadingDistrict}
												//getOptionSelected={(option, value) => option.id === option.id}
												renderInput={(params) => (
													<TextField
														{...params}
														variant="outlined"
														name="district"
														fullWidth
														defaultValue={valueDistrict.name}
														error={errors.district ? true : false}
														helperText={errors.district?.message}
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
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Phường/Xã
									</Typography>
									<Controller
										control={control}
										name="commune"
										defaultValue={valueCommune.name}
										render={({ field: { onChange } }) => (
											<Autocomplete
												options={dataCommune}
												{...register('commune')}
												defaultValue={{ name: valueCommune.name }}
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
														variant="outlined"
														name="commune"
														fullWidth
														defaultValue={valueCommune.name}
														error={errors.commune ? true : false}
														helperText={errors.commune?.message}
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
										)}
									/>
								</Grid> */}
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Container>
	);
};
export default ProfileInfo;
