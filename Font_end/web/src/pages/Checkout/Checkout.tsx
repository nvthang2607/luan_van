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
import { AppURL } from '../../utils/const';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { CityGet, CommunePost, DistrictPost } from '../../api/Address';
import { UpdateProfilePost, UserGet } from '../../api/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toast, ToastContainer } from 'react-toastify';
import { Close } from '@material-ui/icons';
import {
	getValueRefreshPage,
	updateValueRefreshPage,
} from '../../features/refresh/RefreshPageSlice';
import { deleteCart, getCartData, updateVoucher } from '../../Components/Product/CartSlice';
import theme from '../../utils/theme';
import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import Swal from 'sweetalert2';
import { OrderPost } from '../../api/Product';
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
const Checkout: React.FC<ProfileInfoProps> = (props) => {
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
	const dispatch = useAppDispatch();
	const valueRefreshPage = useAppSelector(getValueRefreshPage);
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
			password: data.password,
			gender: data.gender,
			phone: data.phone,
			idCity: resultIdCity,
			idDistrict: resultIdDistrict,
			idCommune: resultIdCommune,
		};
		setFlagOnchangeName(false);
		setFlagOnchangePhone(false);
		setFlagOnchangeGender(false);
		setFlagOnchangeEmail(false);
		setValueSubmit(reqData);
		// const response = await UpdateProfilePost(reqData);
		// if (response.errorCode === null) {
		// 	toast.success('Cap nhat thanh cong');
		// 	dispatch(updateValueRefreshPage(true));
		// 	console.log(valueRefreshPage);
		// } else if (response.errorCode === 2) {
		// 	toast.error('Mat khau ko chinh xac');
		// }
		setOpen(true);
		//dispatch(updateProfileUser(reqData));

		//console.log(reqData);
		setDataInforOrder({
			name: data.name,
			password: data.password,
			gender: data.gender,
			phone: data.phone,
			email: data.email,
			idCity: resultIdCity,
			idDistrict: resultIdDistrict,
			idCommune: resultIdCommune,
			address: data.nameCommune + ', ' + data.nameDistrict + ', ' + data.nameCity,
			note: data.note,
		});
		setShowInforOrder(false);
		window.scrollTo(0, 0);
	};
	const action: (result: boolean) => void = (result) => {
		if (result) {
			setOpen(false);
		}
	};
	const [shippingMethod, setShippingMethod] = React.useState('cod');
	const cartData = useAppSelector(getCartData);
	const countQuantity = () => {
		let count = 0;
		cartData.map((item: any) => {
			count = count + item.quantity;
		});
		return count;
	};
	const totalPriceTmp = () => {
		let total = 0;
		cartData.map((item: any) => {
			total += item.quantity * item.promotion_price;
		});
		return total;
	};
	const promotionTotal = () => {
		let total = 0;
		cartData.map((item: any) => {
			total += item.voucher;
		});
		return total;
	};
	const totalPrice = () => {
		let price = 0;
		cartData.map((item: any) => {
			price += item.quantity * item.promotion_price;
		});
		return price - valuePromotion();
	};
	const [voucher, setVoucher] = React.useState('');
	const [progressCheckOrder, setProgressCheckOrder] = React.useState(false);
	const handlePayment = async () => {
		//console.log(dataInforOrder);
		//console.log(shippingMethod);
		//console.log(totalPrice());

		const cartProduct: any[] = [];
		cartData.map((item: any) => {
			cartProduct.push(`${item.id}-${item.promotion_price}-${item.quantity}`);
		});

		const dataPayment = {
			name: dataInforOrder.name,
			gender: dataInforOrder.gender,
			email: dataInforOrder.email,
			phone: dataInforOrder.phone,
			address: dataInforOrder.address,
			total: totalPrice(),
			payment: shippingMethod,
			note: dataInforOrder.note,
			item: cartProduct,
		};
		//console.log(dataPayment);
		setProgressCheckOrder(true);
		const response = await OrderPost(dataPayment);
		if (response) {
			if (response.errorCode === null) {
				Swal.fire({
					icon: 'success',
					title: 'Dat hang thanh cong!',
					text: 'Cảm ơn bạn đã mua hàng tại SangTV.VN',
				});
				dispatch(deleteCart());
				history.push('/');
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Dat hang khong thanh cong!',
				});
				setProgressCheckOrder(false);
			}
		}
	};

	const [valueCode, setValueCode] = React.useState('');
	const valuePromotion = () => {
		let result = 0;
		cartData.map((item: any) => {
			item.promotion?.map((itemPromotion: any) => {
				if (itemPromotion.code === valueCode) {
					result = itemPromotion.value;
				}
			});
		});
		return result;
	};

	const checkVoucher = () => {
		let nofi = -1;
		let price = 0;

		cartData.map((item: any) => {
			item.promotion.map((itemPromotion: any) => {
				if (itemPromotion.code === voucher) {
					price = itemPromotion.value;
					nofi = 1;
				}
			});
		});
		if (nofi === 1) {
			Swal.fire({
				icon: 'success',
				title: 'Ma giam gia hop le!',
				text: `Ban duoc giam ${Intl.NumberFormat('en-US').format(Number(price))}
				đ`,
			});
			setValueCode(voucher);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Ma giam gia da het han!',
				//text: 'Something went wrong!',
			});
		}
	};
	const handleCheckVoucher = () => {
		if (voucher.trim() !== '') {
			checkVoucher();
		}
	};
	return (
		<Container>
			{cartData?.length > 0 ? (
				<React.Fragment>
					<Grid item xs={12}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container spacing={3}>
								<Grid
									item
									xs={7}
									style={{ paddingRight: '66px', borderRight: '1px solid #ededed' }}
								>
									<Collapse in={!showInforOrder} timeout="auto" unmountOnExit>
										<Grid container spacing={3}>
											<Grid item xs={12}>
												<Card variant="outlined" style={{ padding: '10px' }}>
													<Typography variant="body1" gutterBottom style={{ display: 'flow-root' }}>
														<Typography
															component="span"
															style={{ float: 'left', fontStyle: 'italic' }}
														>
															Thong tin nhan hang:
														</Typography>
														<Typography component="span" style={{ float: 'right' }}>
															<Button
																style={{
																	padding: 0,

																	textTransform: 'inherit',
																}}
																onClick={() => setShowInforOrder(true)}
															>
																Thay doi
															</Button>
														</Typography>
													</Typography>
													<Typography variant="body1" gutterBottom>
														<Typography component="span" style={{ fontWeight: 'bold' }}>
															Email:
														</Typography>
														&nbsp;
														<Typography component="span">{dataInforOrder.email}</Typography>
													</Typography>
													<Typography variant="body1" gutterBottom>
														<Typography component="span" style={{ fontWeight: 'bold' }}>
															Ho ten:
														</Typography>
														&nbsp;
														<Typography component="span">{dataInforOrder.name}</Typography>
													</Typography>
													<Typography variant="body1" gutterBottom>
														<Typography component="span" style={{ fontWeight: 'bold' }}>
															Gioi tinh:
														</Typography>
														&nbsp;
														<Typography component="span">{dataInforOrder.gender}</Typography>
													</Typography>
													<Typography variant="body1" gutterBottom>
														<Typography component="span" style={{ fontWeight: 'bold' }}>
															So dien thoai:
														</Typography>
														&nbsp;
														<Typography component="span">{dataInforOrder.phone}</Typography>
													</Typography>
													<Typography variant="body1" gutterBottom>
														<Typography component="span" style={{ fontWeight: 'bold' }}>
															Dia chi:
														</Typography>
														&nbsp;
														<Typography component="span">{dataInforOrder.address}</Typography>
													</Typography>

													<Typography variant="body1" gutterBottom>
														<Typography component="span" style={{ fontWeight: 'bold' }}>
															Ghi chu:
														</Typography>
														&nbsp;
														<Typography component="span">{dataInforOrder.note}</Typography>
													</Typography>
												</Card>
											</Grid>
											<Grid item xs={12} style={{ paddingBottom: 0 }}>
												<Typography variant="h6" style={{ fontWeight: 'bold' }}>
													Thanh toán
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Card variant="outlined" style={{ padding: '10px' }}>
													<RadioGroup
														//name="gender"
														value={shippingMethod}
														row
														onChange={(e) => {
															setShippingMethod(e.target.value);
														}}
													>
														<FormControlLabel
															value="cod"
															control={<Radio color="secondary" />}
															label="Thanh toán khi giao hàng (COD)"
														/>
														<FormControlLabel
															value="bankTransfer"
															control={<Radio color="secondary" />}
															label="Chuyển khoản qua ngân hàng"
														/>
													</RadioGroup>
													<Collapse
														in={shippingMethod === 'bankTransfer' ? true : false}
														timeout="auto"
														unmountOnExit
													>
														<Grid item xs={12}>
															<Box style={{ paddingTop: '30px' }}>
																<Typography variant="body1">
																	🎁 Tặng Cable Sạc Nhanh VEGER 3.0A 1 Đổi 1 36 Tháng Khi Quý Khách
																	Chuyển Khoản 100% Qua Ngân Hàng.
																</Typography>

																<Typography variant="body1">💵 Tài khoản nhận:</Typography>
																<Typography variant="body1">⚜️ Tran Van Sang</Typography>
																<Typography variant="body1">⚜️ 019282172127221</Typography>
																<Typography variant="body1">
																	⚜️ Agribank, Chi nhanh Can Tho
																</Typography>
																<Typography variant="body1">🛒 Thủ tục:</Typography>
																<Typography variant="body1">
																	☑️ Ghi chú chuyển khoản: Tên Khách Hàng + SĐT
																</Typography>
																<Typography variant="body1">
																	☑️ Nhan vien sẽ xác nhận đã nhận tiền trong 60 phút qua điện thoại
																</Typography>
																<Typography variant="body1">
																	⛔ Trong tình huống không thể giao hàng, chúng tôi sẽ hoàn tiền
																	cho quý khách.
																</Typography>
															</Box>
														</Grid>
													</Collapse>
												</Card>
											</Grid>
											<Grid item xs={12}>
												<Button
													variant="contained"
													size="large"
													color="primary"
													onClick={handlePayment}
													disabled={progressCheckOrder}
													style={{ position: 'relative' }}
												>
													Thanh toan
													{progressCheckOrder && (
														<CircularProgress
															size={24}
															style={{
																position: 'absolute',
																top: '50%',
																left: '50%',
																marginTop: '-12px',
																marginLeft: '-12px',
																color: theme.palette.secondary.main,
															}}
														/>
													)}
												</Button>
											</Grid>
										</Grid>
									</Collapse>

									<Collapse in={showInforOrder} timeout="auto" unmountOnExit>
										<Grid container spacing={3}>
											<Grid item xs={12}>
												<Typography variant="h5">Thong tin mua hang</Typography>
												<Divider style={{ marginTop: '20px' }} />
											</Grid>
											{flagOnchangeEmail ? (
												<React.Fragment>
													<Grid item xs={12}>
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
												<Grid item xs={12}>
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
													<Grid item xs={12}>
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
												<Grid item xs={12}>
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
													<Grid item xs={12}>
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
												<Grid item xs={12}>
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
											<Grid item xs={12}>
												<Typography variant="body1" gutterBottom>
													Ghi chu
												</Typography>
												<Controller
													control={control}
													name="note"
													defaultValue={dataInforOrder.note}
													render={({ field: { onChange } }) => (
														<TextField
															defaultValue={dataInforOrder.note}
															id="note"
															name="note"
															variant="outlined"
															fullWidth
															onChange={(e) => {
																onChange(e.target.value);
															}}
														/>
													)}
												/>
											</Grid>
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
											<Grid item xs={12}>
												<Button
													variant="contained"
													color="primary"
													size="large"
													type="submit"
													//disabled={true}
													style={{ position: 'relative' }}
												>
													xac nhan thong tin
													{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
												</Button>
											</Grid>
										</Grid>
									</Collapse>
								</Grid>
								<Grid item xs={5} style={{ paddingLeft: '64px', backgroundColor: '##fafafa' }}>
									<Grid container spacing={3}>
										<Grid item xs={12}>
											<Typography variant="h5">Don hang ({countQuantity()} san pham)</Typography>
											<Divider style={{ marginTop: '20px' }} />
										</Grid>
										<Grid item xs={12}>
											<DialogContent style={{ height: `calc(${100}vh - ${400}px)` }}>
												{cartData.map((item: any) => {
													return (
														<Box style={{ display: 'flex', marginBottom: '35px' }}>
															<Box style={{ width: '20%' }}>
																<img width="100%" src={`http://localhost:8000/${item.link}`} />
															</Box>
															<Box style={{ marginLeft: '4px', width: '80%' }}>
																<Typography variant="body1" style={{ fontWeight: 'bold' }}>
																	{item.name}
																</Typography>
																<Box style={{ display: 'contents' }}>
																	<Box style={{ width: '50%', float: 'left' }}>
																		<Typography>So luong: {item.quantity}</Typography>
																	</Box>
																	<Box style={{ width: '50%', float: 'right' }}>
																		<Typography>
																			{Intl.NumberFormat('en-US').format(
																				Number(item.quantity * item.promotion_price)
																			)}
																			đ
																		</Typography>
																	</Box>
																</Box>
															</Box>
														</Box>
													);
												})}
											</DialogContent>
											<Divider style={{ marginTop: '20px' }} />
										</Grid>
										<Grid item xs={12} style={{ display: 'flex' }}>
											<Grid container spacing={2}>
												<Grid item xs={8}>
													<TextField
														id="outlined-basic"
														label="Nhap ma giam gia"
														variant="outlined"
														fullWidth
														size="small"
														onChange={(e) => setVoucher(e.target.value)}
													/>
												</Grid>
												<Grid item xs={4}>
													<Button
														variant="contained"
														color="primary"
														onClick={handleCheckVoucher}
														disabled={false}
													>
														Ap dung
													</Button>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<Divider style={{ marginBottom: '20px' }} />
											<Box>
												<Box style={{ float: 'left' }}>
													<Typography>Tam tinh</Typography>
												</Box>
												<Box style={{ float: 'right' }}>
													{Intl.NumberFormat('en-US').format(Number(totalPriceTmp()))}đ
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12}>
											<Box>
												<Box style={{ float: 'left' }}>
													<Typography>Giam gia</Typography>
												</Box>
												<Box style={{ float: 'right' }}>
													{Intl.NumberFormat('en-US').format(Number(valuePromotion()))}đ
												</Box>
											</Box>
										</Grid>
										<Grid item xs={12}>
											<Divider style={{ marginBottom: '20px' }} />
											<Box style={{ float: 'left' }}>
												<Typography variant="h6">Tong cong:</Typography>
											</Box>
											<Box style={{ float: 'right' }}>
												<Typography
													style={{
														fontWeight: 'bold',
														color: 'black',
													}}
													variant="h6"
												>
													{Intl.NumberFormat('en-US').format(Number(totalPrice()))}đ
												</Typography>
											</Box>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</form>
					</Grid>
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
				</React.Fragment>
			) : (
				<Box style={{ textAlign: 'center' }}>
					<img
						width="25%"
						src="https://bizweb.dktcdn.net/100/420/160/themes/825846/assets/mobile-shopping.svg?1631101741005"
					/>
					<Box>
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => {
								history.push('/');
								window.scrollTo(0, 0);
							}}
						>
							Tiep tuc mua hang
						</Button>
					</Box>
				</Box>
			)}
		</Container>
	);
};
export default Checkout;
