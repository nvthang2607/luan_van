import {
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	Card,
	CircularProgress,
	Collapse,
	Divider,
	Grid,
	IconButton,
	LinearProgress,
	makeStyles,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LaptopIcon from '@material-ui/icons/Laptop';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import HeadsetIcon from '@material-ui/icons/Headset';
import sp1 from './../../public/images/10048267-dien-thoai-samsung-galaxy-a12-128gb-den-1.jpg';
import sp2 from './../../public/images/iphone-6s-vang-hong_1592643194.jpg';
import sp3 from './../../public/images/xiaomi-redmi-note-9-xam_1593057875-copy.jpg';
import watchImg1200 from './../../public/images/10048267-dien-thoai-samsung-galaxy-a12-128gb-den-1.jpg';
import watchImg300 from './../../public/images/10048267-dien-thoai-samsung-galaxy-a12-128gb-den-1.jpg';
//import SliderImage from 'react-zoom-slider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Pagination, Rating } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
//import ReactImageMagnify from 'react-image-magnify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ProductCarousel from '../../Components/Product/ProductCarousel';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateProfileUser } from '../Profile/UserSlice';
import {
	getValueRefreshPage,
	updateValueRefreshPage,
} from '../../features/refresh/RefreshPageSlice';
import { ProductIdGet } from '../../api/Product';
import { getCartData, updataCartData } from '../../Components/Product/CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { AppURL } from '../../utils/const';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CommentPost } from '../../api/comment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
function SampleNextArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: '#cacaca' }}
			onClick={onClick}
		/>
	);
}
function SamplePrevArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: '#cacaca' }}
			onClick={onClick}
		/>
	);
}
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#f4f4f4',

		// marginBottom: '10px',
	},
	reply: { color: 'blue', cursor: 'pointer', display: 'contents', '&:hover': { color: 'grey' } },
	titleText: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		paddingLeft: '10px',
		marginBottom: '33px',
	},
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	discount_percent: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
	},
	discount_percent1: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
		marginLeft: '10px',
		position: 'relative',
		'&:after': {
			right: '100%',
			top: '50%',
			border: 'solid transparent',
			content: '""',
			height: 0,
			width: 0,
			position: 'absolute',
			pointerEvents: 'none',
			borderColor: `rgba(${82},${184},${88},${0})`,
			borderRightColor: theme.palette.primary.main,
			borderWidth: '6px',
			marginTop: '-6px',
		},
	},
	showBox: {
		display: 'block !important',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	link: {
		display: 'flex',
		textDecoration: 'none',
		color: 'black',
	},
	button: {},
	tagLi: {
		textDecoration: 'none',
		cursor: 'pointer',
		color: 'black',
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
}));
const ProductDetail: React.FC = () => {
	const labels: { [index: string]: string } = {
		1: 'Không thích',
		2: 'Tạm được',
		3: 'Bình thường',
		4: 'Rất tốt',
		5: 'Tuyệt vời quá',
	};
	const settings = {
		//dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		//slidesToScroll: 3,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	const [value, setValue] = React.useState<number | null>(3);
	const [hover, setHover] = React.useState(-1);
	const classes = useStyles();
	const [configuration, setConfiguration] = React.useState<any>([
		{ name: 'Màn hình:', value: '6.67 inches IPS LCD, 1080 x 2400 pixels' },
		{ name: 'CPU:', value: 'Snapdragon 732G (8 nm)' },
		{ name: 'GPU:', value: 'Adreno 618' },
		{ name: 'RAM:', value: '6GB' },
		{ name: 'Bộ nhớ:', value: '64/128GB' },
		{ name: 'Pin:', value: '5160mAh, sạc nhanh 33W' },
	]);
	const schema = yup.object().shape({
		email: yup.string().email('Email không hợp lệ').required('Email không để trống'),
		name: yup.string().required('Mật khẩu không để trống'),
	});
	const [collapse, setCollapse] = React.useState(false);
	const [collapseReply, setCollapseReply] = React.useState(false);
	const [collapseForm, setCollapseForm] = React.useState(false);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: any) => {
		console.log(data);
	};

	const dispatch = useAppDispatch();
	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(updateValueRefreshPage(true));
		setProgress(true);
	}, [dispatch]);
	const [progress, setProgress] = React.useState(false);
	const { idProduct } = useParams<{ idProduct?: string }>();
	const [dataProduct, setDataProduct] = React.useState<any>({});
	const [dataComment, setDataComment] = React.useState<any>({});
	const [refresh, setPrefresh] = React.useState(1);
	const [txtCopy, setTxtCopy] = React.useState('Copy');
	const [rate, setRate] = React.useState({
		idRate: 0,
		value: 0,
	});
	React.useEffect(() => {
		//window.scrollTo(0, 0);
		const fetchProductId = async () => {
			const getComment = await CommentPost({ id: 1, page: 1, pageSize: 10 });
			console.log(getComment);

			if (getComment) {
				if (getComment.errorCode === null) {
					console.log(getComment);
					setDataComment(getComment.data);
				}
			}
			const getProductId = await ProductIdGet(idProduct);
			if (getProductId) {
				if (getProductId.errorCode === null) {
					setDataProduct(getProductId.data);
					console.log(getProductId.data);
					setProgress(false);

					const valueRate =
						Math.round(
							Number((getProductId.data?.rate?.rate1 / getProductId.data.rate_number) * 100)
						) +
						Math.round(
							Number((getProductId.data?.rate?.rate2 / getProductId.data.rate_number) * 100)
						) +
						Math.round(
							Number((getProductId.data?.rate?.rate3 / getProductId.data.rate_number) * 100)
						) +
						Math.round(
							Number((getProductId.data?.rate?.rate4 / getProductId.data.rate_number) * 100)
						) +
						Math.round(
							Number((getProductId.data?.rate?.rate5 / getProductId.data.rate_number) * 100)
						);
					if (100 - valueRate > 0) {
						if (
							Math.round(
								Number((getProductId.data?.rate?.rate5 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 5, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate4 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 4, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate3 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 3, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate2 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 2, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate1 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 1, value: 100 - valueRate });
						}
					} else if (100 - valueRate < 0) {
						if (
							Math.round(
								Number((getProductId.data?.rate?.rate1 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 1, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate2 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 2, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate3 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 3, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate4 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 4, value: 100 - valueRate });
						} else if (
							Math.round(
								Number((getProductId.data?.rate?.rate5 / getProductId.data.rate_number) * 100)
							) > 0
						) {
							setRate({ idRate: 5, value: 100 - valueRate });
						}
					}
				}
			}
		};

		fetchProductId();
	}, [idProduct, refresh, dataProduct?.item?.id]);
	console.log(rate);

	const cartData = useAppSelector(getCartData);
	const storeQuantity = () => {
		let result = 1;
		cartData.map((item: any) => {
			console.log(item.quantity);
			console.log(dataProduct);
			if (item.id === dataProduct.item.id) {
				if (item.quantity >= dataProduct.item.quantity) result = -1;
			}
		});
		return result;
	};
	const history = useHistory();
	const buyNow = () => {
		//setPrefresh(refresh + 1);
		if (storeQuantity() === -1) {
			toast.error('ko du so luong');
		} else {
			dispatch(
				updataCartData({
					id: dataProduct.item.id,
					name: dataProduct.item.name,
					storeQuantity: dataProduct.item.quantity,
					link: dataProduct.image_key,
					unit_price: dataProduct.item.unit_price,
					promotion_price: dataProduct.item.promotion_price,
					quantity: 1,
					promotion: dataProduct.promotion,
				})
			);
			// history.push(AppURL.CHECKOUT);
			toast.success('Da them san pham vao gio hang');
		}
	};
	const addToCart = () => {
		//setPrefresh(refresh + 1);
		if (storeQuantity() === -1) {
			toast.error('ko du so luong');
		} else {
			dispatch(
				updataCartData({
					id: dataProduct.item.id,
					name: dataProduct.item.name,
					storeQuantity: dataProduct.item.quantity,
					link: dataProduct.image_key,
					unit_price: dataProduct.item.unit_price,
					promotion_price: dataProduct.item.promotion_price,
					quantity: 1,
				})
			);
			toast.success('Da them san pham vao gio hang');
		}
	};
	const [idcmt, setIdCmt] = React.useState(-1);
	return (
		<Grid container className={classes.bgHeader}>
			<Grid item xs={9} style={{ position: 'absolute', top: '93px', left: '362px' }}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link to="/" className={classes.link}>
						<HomeIcon className={classes.icon} />
						Trang chu
					</Link>
					<Link to="/" className={classes.link}>
						Dien thoai
					</Link>
					{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
					</Link> */}
				</Breadcrumbs>
			</Grid>

			{progress ? (
				<CircularProgress
					color="secondary"
					style={{ position: 'fixed', top: '100px', left: '50%' }}
				/>
			) : (
				<React.Fragment>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Box style={{ paddingTop: '10px' }}>
								<Carousel
									infiniteLoop
									stopOnHover
									showThumbs={true}
									showStatus={false}
									showArrows={false}
									showIndicators={false}
								>
									{dataProduct.image?.map((item: any) => {
										return (
											<div>
												<img style={{ width: '82%' }} src={`http://localhost:8000/${item}`} />
											</div>
										);
									})}
								</Carousel>

								{/* <div style={{ position: 'absolute' }}>
							<SliderImage data={data} showDescription={true} direction="right" />
						</div> */}
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="h5" gutterBottom>
								{dataProduct?.item?.name}
							</Typography>
							<Typography gutterBottom style={{ display: 'flex', paddingBottom: '5px' }}>
								<Typography component="span">{Number(dataProduct?.avg).toFixed(1)}</Typography>
								<Rating
									style={{ fontSize: '20px' }}
									name="read-only"
									value={Number(Number(dataProduct?.avg).toFixed(1))}
									precision={0.04}
									readOnly
								/>
								<Typography component="span">Co {dataProduct.rate_number} danh gia</Typography>
							</Typography>
							<Divider />
							<Typography variant="h4" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
								{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.promotion_price))}đ
							</Typography>
							<Typography component="span" className={classes.discount_percent}>
								-6%
							</Typography>
							&nbsp;&nbsp;
							<Typography
								component="span"
								style={{ color: 'grey', textDecoration: 'line-through' }}
							>
								{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.unit_price))}đ
							</Typography>
							{dataProduct?.item?.quantity === 0 ? (
								<Typography
									variant="body1"
									gutterBottom
									style={{ marginTop: '20px', fontWeight: 'bold' }}
								>
									Tinh trang: het hang&nbsp;&nbsp;
									<i
										className="fa fa-times-circle"
										aria-hidden="true"
										style={{ color: '#ff0000', fontSize: '20px' }}
									></i>
								</Typography>
							) : (
								<Typography
									variant="body1"
									gutterBottom
									style={{ marginTop: '20px', fontWeight: 'bold' }}
								>
									Tinh trang: con hang&nbsp;&nbsp;
									<i
										className="fa fa-check-circle"
										aria-hidden="true"
										style={{ color: '#4caf50', fontSize: '20px' }}
									></i>
								</Typography>
							)}
							<Box style={{ position: 'relative', paddingTop: '10px', marginTop: '20px' }}>
								<Card variant="outlined" style={{ padding: '20px', paddingTop: '30px' }}>
									<Typography
										component="span"
										className={classes.discount_percent}
										style={{
											position: 'absolute',
											top: '-4px',
											left: '10px',
										}}
									>
										Khuyen mai
									</Typography>
									<Typography>
										<i
											className="fa fa-check-circle"
											aria-hidden="true"
											style={{ color: '#4caf50' }}
										></i>
										&nbsp;&nbsp;
										<Typography component="span" style={{ color: 'red', fontWeight: 600 }}>
											Tặng sạc cáp Deimark chính hãng bảo hành 1 đổi 1 trong 12 tháng
										</Typography>
									</Typography>
									<Typography>
										<i
											className="fa fa-check-circle"
											aria-hidden="true"
											style={{ color: '#4caf50' }}
										></i>
										&nbsp;&nbsp;
										<Typography component="span" style={{ color: 'red', fontWeight: 600 }}>
											Đổi sạc nhanh 20W MIỄN PHÍ khi nâng cấp BH 12 tháng
										</Typography>
									</Typography>
									{dataProduct?.promotion?.map((item: any) => {
										return (
											<Typography>
												<i
													className="fa fa-check-circle"
													aria-hidden="true"
													style={{ color: '#4caf50' }}
												></i>
												&nbsp;&nbsp;
												<Typography component="span" style={{ color: 'red', fontWeight: 600 }}>
													{item.name}&nbsp;
													{/* <Typography
														component="span"
														style={{ fontSize: '12px', fontWeight: 600 }}
													>
														(chi áp dụng cho san pham nay)
													</Typography>
													&nbsp; */}
													<i
														className="fa fa-hand-o-right"
														aria-hidden="true"
														style={{ color: 'indigo' }}
													></i>
													&nbsp; &nbsp;&nbsp;
													<CopyToClipboard text={item.code} onCopy={() => setTxtCopy('Copied')}>
														<Tooltip title={txtCopy} onOpen={() => setTxtCopy('Copy')}>
															<i
																className="fa fa-clone"
																aria-hidden="true"
																style={{ fontSize: '22px', color: 'black', cursor: 'pointer' }}
															></i>
														</Tooltip>
													</CopyToClipboard>
												</Typography>
											</Typography>
										);
									})}
									<Typography>
										<i
											className="fa fa-check-circle"
											aria-hidden="true"
											style={{ color: '#4caf50' }}
										></i>
										&nbsp;&nbsp;
										<Typography component="span" style={{ fontStyle: 'italic', fontWeight: 600 }}>
											Bảo hành quốc tế trọn đời, đổi mới nếu bị Relock
										</Typography>
									</Typography>
									<Typography>
										<i
											className="fa fa-check-circle"
											aria-hidden="true"
											style={{ color: '#4caf50' }}
										></i>
										&nbsp;&nbsp;
										<Typography component="span" style={{ fontStyle: 'italic', fontWeight: 600 }}>
											Hỗ trợ cài đặt, tạo tài khoản iCloud miễn phí
										</Typography>
									</Typography>
									<Typography>
										<i
											className="fa fa-check-circle"
											aria-hidden="true"
											style={{ color: '#4caf50' }}
										></i>
										&nbsp;&nbsp;
										<Typography component="span">
											Mua Online: Giao hàng tận nhà- Nhận hàng thanh toán
										</Typography>
									</Typography>
								</Card>
							</Box>
							<Button
								variant="contained"
								color="primary"
								style={{ display: 'flex', marginTop: '10px' }}
								fullWidth
								size="large"
								onClick={buyNow}
							>
								<Box style={{ display: 'contents' }}>
									<AddShoppingCartIcon style={{ fontSize: '50px' }} />
								</Box>
								<Box>
									<Typography component="h6" style={{ fontSize: '1.5rem' }}>
										Mua ngay
									</Typography>
									<Typography variant="body1" style={{ textTransform: 'initial' }}>
										Giao hang tan noi
									</Typography>
								</Box>
							</Button>
							{/* <Button
								variant="outlined"
								color="primary"
								style={{ display: 'block', marginTop: '10px' }}
								fullWidth
								size="large"
								onClick={addToCart}
							>
								<Typography component="h6" style={{ fontSize: '1.2rem' }}>
									Them vao gio hang
								</Typography>
							</Button> */}
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={3}>
							<Grid item xs={9}>
								<Typography variant="h5" className={classes.titleText} gutterBottom>
									Thong so ly thuuat
								</Typography>
								{dataProduct.information?.map((item: any, index: number) => {
									return (
										<Box style={{ backgroundColor: index % 2 === 0 ? '#ededed' : 'inherit' }}>
											<Typography
												variant="body1"
												style={{
													fontWeight: 'bold',

													display: 'inline-block',
													padding: '10px',
													paddingRight: '162px',
												}}
											>
												{item.name}
											</Typography>
											<Typography
												variant="body1"
												style={{ display: 'inline-block', padding: '10px' }}
											>
												{item.value}
											</Typography>
										</Box>
									);
								})}
								<Typography
									variant="h5"
									className={classes.titleText}
									gutterBottom
									style={{ marginTop: '10px' }}
								>
									Bai viet danh gia
								</Typography>
								<Typography
									variant="h5"
									className={classes.titleText}
									gutterBottom
									style={{ marginTop: '10px' }}
								>
									Nhan xet va danh gia
								</Typography>
								<Card variant="outlined" style={{ padding: '10px' }}>
									<Box style={{ display: 'flex' }}>
										<Box style={{ width: '50%' }}>
											<Typography gutterBottom style={{ display: 'flex', paddingBottom: '5px' }}>
												<Typography variant="h5" style={{ color: '#ffb400', fontWeight: 'bold' }}>
													{Number(dataProduct?.avg).toFixed(1)}
												</Typography>
												&nbsp;&nbsp;
												<Rating
													style={{ fontSize: '27px' }}
													name="read-only"
													value={Number(Number(dataProduct?.avg).toFixed(1))}
													precision={0.04}
													readOnly
												/>
												&nbsp;&nbsp;
												<Typography
													variant="body1"
													style={{ display: 'flex', alignItems: 'center' }}
												>
													Co {dataProduct.rate_number} danh gia
												</Typography>
											</Typography>
											<Typography
												gutterBottom
												style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
											>
												<Typography component="span">5.0 </Typography>&nbsp;&nbsp;
												<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
												<Box width="100%">
													<LinearProgress
														variant="determinate"
														value={
															Math.round(
																Number((dataProduct?.rate?.rate5 / dataProduct.rate_number) * 100)
															) + Number(rate.idRate == 5 ? rate.value : 0)
														}
														//style={{ color: '#ffb400 !important' }}
													/>
												</Box>
												&nbsp;&nbsp;
												<Box minWidth={35}>
													<Typography
														variant="body1"
														style={{ color: '#4c70ba', fontWeight: 'bold' }}
													>
														{Math.round(
															Number((dataProduct?.rate?.rate5 / dataProduct.rate_number) * 100)
														) + Number(rate.idRate == 5 ? rate.value : 0)}
														%
													</Typography>
												</Box>
											</Typography>
											<Typography
												gutterBottom
												style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
											>
												<Typography component="span">4.0 </Typography>&nbsp;&nbsp;
												<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
												<Box width="100%">
													<LinearProgress
														variant="determinate"
														value={
															Math.round(
																Number((dataProduct?.rate?.rate4 / dataProduct.rate_number) * 100)
															) + Number(rate.idRate === 4 ? rate.value : 0)
														}
													/>
												</Box>
												&nbsp;&nbsp;
												<Box minWidth={35}>
													<Typography
														variant="body1"
														style={{ color: '#4c70ba', fontWeight: 'bold' }}
													>
														{Math.round(
															Number((dataProduct?.rate?.rate4 / dataProduct.rate_number) * 100)
														) + Number(rate.idRate === 4 ? rate.value : 0)}
														%
													</Typography>
												</Box>
											</Typography>
											<Typography
												gutterBottom
												style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
											>
												<Typography component="span">3.0 </Typography>&nbsp;&nbsp;
												<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
												<Box width="100%">
													<LinearProgress
														variant="determinate"
														value={
															Math.round(
																Number((dataProduct?.rate?.rate3 / dataProduct.rate_number) * 100)
															) + Number(rate.idRate === 3 ? rate.value : 0)
														}
													/>
												</Box>
												&nbsp;&nbsp;
												<Box minWidth={35}>
													<Typography
														variant="body1"
														style={{ color: '#4c70ba', fontWeight: 'bold' }}
													>
														{Math.round(
															Number((dataProduct?.rate?.rate3 / dataProduct.rate_number) * 100)
														) + Number(rate.idRate === 3 ? rate.value : 0)}
														%
													</Typography>
												</Box>
											</Typography>
											<Typography
												gutterBottom
												style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
											>
												<Typography component="span">2.0 </Typography>&nbsp;&nbsp;
												<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
												<Box width="100%">
													<LinearProgress
														variant="determinate"
														value={
															Math.round(
																Number((dataProduct?.rate?.rate2 / dataProduct.rate_number) * 100)
															) + Number(rate.idRate === 2 ? rate.value : 0)
														}
													/>
												</Box>
												&nbsp;&nbsp;
												<Box minWidth={35}>
													<Typography
														variant="body1"
														style={{ color: '#4c70ba', fontWeight: 'bold' }}
													>
														{Math.round(
															Number((dataProduct?.rate?.rate2 / dataProduct.rate_number) * 100)
														) + Number(rate.idRate === 2 ? rate.value : 0)}
														%
													</Typography>
												</Box>
											</Typography>
											<Typography
												gutterBottom
												style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
											>
												<Typography component="span">1.0 </Typography>&nbsp;&nbsp;
												<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
												<Box width="100%">
													<LinearProgress
														variant="determinate"
														value={
															Math.round(
																Number((dataProduct?.rate?.rate1 / dataProduct.rate_number) * 100)
															) + Number(rate.idRate === 1 ? rate.value : 0)
														}
													/>
												</Box>
												&nbsp;&nbsp;
												<Box minWidth={35}>
													<Typography
														variant="body1"
														style={{ color: '#4c70ba', fontWeight: 'bold' }}
													>
														{Math.round(
															Number((dataProduct?.rate?.rate1 / dataProduct.rate_number) * 100)
														) + Number(rate.idRate === 1 ? rate.value : 0)}
														%
													</Typography>
												</Box>
											</Typography>
										</Box>
										<Box
											style={{
												width: '50%',
												justifyContent: 'center',
												alignItems: 'center',
												display: 'flex',
											}}
										>
											<Button
												variant="contained"
												color="primary"
												style={{ textTransform: 'initial', padding: '8px 25px' }}
												onClick={() => {
													setCollapse(!collapse);
													collapse ? setCollapseForm(false) : setCollapseForm(true);
													setValue(3);
												}}
											>
												{collapse ? 'Dong lai' : 'Gui danh gia cua ban'}
											</Button>
										</Box>
									</Box>
									<Collapse in={collapse} timeout="auto" unmountOnExit>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												marginTop: '25px',
												marginBottom: '25px',
											}}
										>
											<Typography variant="body1" style={{ paddingRight: '20px' }}>
												Chon danh gia cua ban
											</Typography>

											<Rating
												name="size-large"
												defaultValue={3}
												size="large"
												onChange={(event, newValue) => {
													setValue(newValue);
													console.log(newValue);

													if (newValue === null) {
														setCollapseForm(false);
													} else {
														setCollapseForm(true);
													}
												}}
												onChangeActive={(event, newHover) => {
													setHover(newHover);
												}}
											/>
											{value !== null && (
												<Box className={classes.discount_percent1}>
													{labels[hover !== -1 ? hover : value]}
												</Box>
											)}
										</Box>
									</Collapse>
									<Collapse in={collapseForm} timeout="auto" unmountOnExit>
										<Box style={{ display: 'flex' }}>
											<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
												<Box style={{ display: 'inline-block', width: '60%' }}>
													<TextField
														id="rate_content"
														{...register('rate_content')}
														multiline
														name="rate_content"
														rows={4}
														placeholder="Nhập đánh giá về sản phẩm"
														variant="outlined"
														fullWidth
													/>
												</Box>
												<Box style={{ display: 'inline-block', width: '40%', marginLeft: '10px' }}>
													<TextField
														{...register('name')}
														id="name"
														label="Ho ten *"
														name="name"
														variant="outlined"
														fullWidth
														error={errors.name ? true : false}
														helperText={errors.name?.message}
														style={{ marginBottom: '10px' }}
													/>
													<TextField
														{...register('email')}
														id="email"
														name="email"
														label="Email *"
														variant="outlined"
														fullWidth
														error={errors.email ? true : false}
														helperText={errors.email?.message}
														style={{ marginBottom: '10px' }}
													/>
													<Button variant="contained" color="primary" type="submit">
														gui danh gia
													</Button>
												</Box>
											</form>
										</Box>
									</Collapse>
								</Card>
								<Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
								<Box style={{ marginBottom: '10px' }}>
									<Box style={{ display: 'flex', alignItems: 'center' }}>
										<Avatar>S</Avatar> &nbsp;&nbsp;
										<Typography variant="h6" style={{ fontWeight: 'bold' }}>
											Sang tran
										</Typography>
									</Box>
									<Box style={{ marginLeft: '39px' }}>
										<Typography variant="h6">
											<Rating
												style={{ fontSize: '20px', display: 'flex' }}
												name="read-only"
												value={3.2}
												readOnly
											/>
											<Typography color="textSecondary">Vao ngay 29/09/2021</Typography>
										</Typography>
										<Typography>Cho mình hỏi. Sao dùng camera máy lại nóng ghê vậy?</Typography>
									</Box>
								</Box>
								<Box style={{ marginBottom: '10px' }}>
									<Box style={{ display: 'flex', alignItems: 'center' }}>
										<Avatar>T</Avatar> &nbsp;&nbsp;
										<Typography variant="h6" style={{ fontWeight: 'bold' }}>
											Thang nguyen
										</Typography>
									</Box>
									<Box style={{ marginLeft: '39px' }}>
										<Typography variant="h6">
											<Rating
												style={{ fontSize: '20px', display: 'flex' }}
												name="read-only"
												value={3.2}
												readOnly
											/>
											<Typography color="textSecondary">Vao ngay 29/09/2021</Typography>
										</Typography>
										<Typography>Cho mình hỏi. Sao dùng camera máy lại nóng ghê vậy?</Typography>
									</Box>
								</Box>
								{/* <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
							<Pagination count={10} color="primary" />
						</Box> */}
								<Box>
									<Typography
										variant="h5"
										className={classes.titleText}
										gutterBottom
										style={{ marginTop: '10px' }}
									>
										Hoi & Dap{' '}
										<Typography component="span" className={classes.discount_percent}>
											co {dataComment.total} binh luan
										</Typography>
									</Typography>

									<Box>
										<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
											<Box style={{ display: 'inline-block', width: '100%' }}>
												<TextField
													id="rate_content"
													{...register('rate_content')}
													multiline
													name="rate_content"
													rows={3}
													placeholder="Nhập đánh giá về sản phẩm"
													variant="outlined"
													fullWidth
													style={{ marginBottom: '10px' }}
												/>
												<Button variant="contained" color="primary" type="submit">
													gui cau hoi
												</Button>
											</Box>
										</form>
									</Box>

									<Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
									{dataComment?.listdata?.map((item: any) => {
										return (
											<Box>
												<Box style={{ marginBottom: '10px' }}>
													<Box style={{ display: 'flex', alignItems: 'center' }}>
														<Avatar>{item?.email_comment?.charAt(0)}</Avatar> &nbsp;&nbsp;
														<Typography variant="h6" style={{ fontWeight: 'bold' }}>
															{item.email_comment.slice(0, item.email_comment.indexOf('@'))}
														</Typography>
														&nbsp;&nbsp;
														<Typography color="textSecondary">vao ngay 29/09/2021</Typography>
													</Box>
													<Box style={{ marginLeft: '39px', marginBottom: '10px' }}>
														<Typography>{item.comment_comment}</Typography>
														<Typography
															className={classes.reply}
															onClick={() => {
																setCollapseReply(!collapseReply);
																setIdCmt(item.id_comment);
															}}
														>
															Tra loi
														</Typography>
													</Box>
													{item?.feedback?.map((itemFeedback: any) => {
														return (
															<Box
																style={{
																	marginLeft: '60px',
																	borderLeft: '5px solid #dee2e6',
																	paddingLeft: '10px',
																	marginBottom: '10px',
																}}
															>
																<Typography style={{ display: 'flex', alignItems: 'center' }}>
																	<Typography variant="h6">
																		{itemFeedback.email_feedback.slice(
																			0,
																			itemFeedback.email_feedback.indexOf('@')
																		)}
																	</Typography>
																	&nbsp;&nbsp;
																	{itemFeedback.isadmin === 'admin' && (
																		<Typography
																			component="span"
																			className={classes.discount_percent}
																			style={{ fontSize: '11px', marginRight: '10px' }}
																		>
																			Quan tri vien
																		</Typography>
																	)}
																	<Typography color="textSecondary">vao ngay 29/09/2021</Typography>
																</Typography>
																<Typography>{itemFeedback.comment_feedback}</Typography>
															</Box>
														);
													})}

													<Box
														style={{
															marginLeft: '60px',

															paddingLeft: '10px',
															marginBottom: '10px',
														}}
													>
														<Collapse
															in={collapseReply && idcmt === item.id_comment}
															timeout="auto"
															unmountOnExit
														>
															<form
																onSubmit={handleSubmit(onSubmit)}
																style={{ display: 'contents' }}
															>
																<Box style={{ display: 'inline-block', width: '100%' }}>
																	<TextField
																		id="rate_content"
																		{...register('rate_content')}
																		multiline
																		name="rate_content"
																		rows={3}
																		placeholder="Nhập đánh giá về sản phẩm"
																		variant="outlined"
																		fullWidth
																		style={{ marginBottom: '10px' }}
																	/>
																	<Button variant="contained" color="primary" type="submit">
																		gui cau hoi
																	</Button>
																</Box>
															</form>
														</Collapse>
													</Box>
												</Box>
											</Box>
										);
									})}

									<Box style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
										<Pagination count={10} color="primary" />
									</Box>
								</Box>
							</Grid>
							<Grid item xs={3} style={{ paddingRight: '10px' }}>
								<Card
									variant="outlined"
									style={{ padding: '10px', position: 'sticky', top: '86px' }}
								>
									<Box style={{ textAlign: 'center' }}>
										<Typography variant="h6" style={{ lineHeight: 1 }}>
											Apple Watch SE GPS 40mm Vàng Chính Hãng
										</Typography>
										<Typography
											variant="h5"
											style={{
												fontWeight: 'bold',
												paddingTop: '10px',
												color: 'red',
											}}
										>
											19.000.000đ
										</Typography>
									</Box>
									<Box style={{ position: 'relative', paddingTop: '10px', marginTop: '20px' }}>
										<Card variant="outlined" style={{ padding: '20px', paddingTop: '30px' }}>
											<Typography
												component="span"
												className={classes.discount_percent}
												style={{
													position: 'absolute',
													top: '-4px',
													left: '10px',
												}}
											>
												Khuyen mai
											</Typography>
											<Typography>
												Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae fuga
												dolorum, rerum soluta porro quisquam? Odio magni doloremque explicabo.
												Doloribus sint asperiores a officia aperiam neque unde, libero excepturi
												magni.
											</Typography>
										</Card>
									</Box>
									<Button
										variant="contained"
										color="primary"
										style={{ display: 'block', marginTop: '10px' }}
										fullWidth
										size="large"
									>
										<Typography component="h6" style={{ fontSize: '1.1rem' }}>
											Mua ngay
										</Typography>
									</Button>
									<Button
										variant="outlined"
										color="primary"
										style={{ display: 'block', marginTop: '10px' }}
										fullWidth
										size="large"
									>
										<Typography component="h6" style={{ fontSize: '1rem' }}>
											Them vao gio hang
										</Typography>
									</Button>
								</Card>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<Typography
							variant="h5"
							className={classes.titleText}
							gutterBottom
							style={{ marginTop: '10px' }}
						>
							San pham cung loai
						</Typography>
						<Slider {...settings}>
							<ProductCarousel />
							<ProductCarousel />
							<ProductCarousel />
							<ProductCarousel />
							<ProductCarousel />
							<ProductCarousel />
							<ProductCarousel />
						</Slider>
					</Grid>
				</React.Fragment>
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
		</Grid>
	);
};
export default ProductDetail;
