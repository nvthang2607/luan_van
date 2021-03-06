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
	Toolbar,
	Tooltip,
	Typography,
	useScrollTrigger,
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
import { ProductIdGet, RatingPost, RecommendPost, SameProductPost } from '../../api/Product';
import { getCartData, updataCartData } from '../../Components/Product/CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { AppURL } from '../../utils/const';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import jwtDecode from 'jwt-decode';
import { useMediaQuery } from 'react-responsive';
import ProductCarouselPhone from '../../Components/Product/ProductCarouselPhone';
import Swal from 'sweetalert2';
import { UserGet } from '../../api/User';
import { CreateCommentPost, ListCommentPost } from '../../api/Comment';
import { CreateFeedbackPost } from '../../api/Feedback';
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
interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children: React.ReactElement;
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
	bgHeaderMobile: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		backgroundColor: '#f4f4f4',
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
const ProductDetail: React.FC<Props> = (props) => {
	const { children } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const handleClickPageRating = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
			'#back-to-rating'
		);

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};
	const handleClickPageCmt = (event: any) => {
		const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
			'#back-to-Cmt'
		);
		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	const labels: { [index: string]: string } = {
		1: 'Kh??ng th??ch',
		2: 'T???m ???????c',
		3: 'B??nh th?????ng',
		4: 'R???t t???t',
		5: 'Tuy???t v???i qu??',
	};

	const [value, setValue] = React.useState<number | null>(3);
	const [hover, setHover] = React.useState(-1);
	const classes = useStyles();
	const [configuration, setConfiguration] = React.useState<any>([
		{ name: 'M??n h??nh:', value: '6.67 inches IPS LCD, 1080 x 2400 pixels' },
		{ name: 'CPU:', value: 'Snapdragon 732G (8 nm)' },
		{ name: 'GPU:', value: 'Adreno 618' },
		{ name: 'RAM:', value: '6GB' },
		{ name: 'B??? nh???:', value: '64/128GB' },
		{ name: 'Pin:', value: '5160mAh, s???c nhanh 33W' },
	]);
	const schema = yup.object().shape({
		email: yup.string().email('Email kh??ng h???p l???').required('Email kh??ng ????? tr???ng'),
		name: yup.string().required('M???t kh???u kh??ng ????? tr???ng'),
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
	const onSubmitCmt = (data: any) => {
		console.log(data);
	};
	const dispatch = useAppDispatch();
	const [dataProductRecommend, setDataProductRecommend] = React.useState<any>([]);
	const [dataSameProduct, setDataSameProduct] = React.useState<any>([]);
	React.useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(updateValueRefreshPage(true));
		setProgress(true);
	}, [dispatch]);
	const [progress, setProgress] = React.useState(false);
	const carouselOnclick: (result: boolean) => void = (result) => {
		if (result) {
			setProgress(true);
		}
	};
	const { idProduct } = useParams<{ idProduct?: string }>();
	const [dataProduct, setDataProduct] = React.useState<any>({});
	const [dataComment, setDataComment] = React.useState<any>({});
	const [refresh, setPrefresh] = React.useState(1);
	const [txtCopy, setTxtCopy] = React.useState('Copy');
	const [rate, setRate] = React.useState({
		idRate: 0,
		value: 0,
	});
	const [ratingListData, setRatingListData] = React.useState<any>({});
	const [pageCmt, setPageCmt] = React.useState(1);
	const [refreshCmt, setRefreshCmt] = React.useState(1);
	const [pageRating, setPageRating] = React.useState(1);
	const [progressCmt, setProgressCmt] = React.useState(false);
	const [progressRating, setProgressRating] = React.useState(false);
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseiveProductMobile = useMediaQuery({ query: '(min-width: 1098px)' });
	const isResponseiveProduct1Mobile = useMediaQuery({ query: '(min-width: 780px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });

	const settings = {
		//dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: isResponseiveMobile ? 5 : 3,
		//slidesToScroll: 3,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	React.useEffect(() => {
		const fetchCmt = async () => {
			setProgressCmt(true);
			const getComment = await ListCommentPost({ id: idProduct, page: pageCmt, pageSize: 5 });

			const responseSameProduct = await SameProductPost({
				id_product: idProduct,
				page: 1,
				pageSize: 5,
			});
			if (responseSameProduct) {
				if (responseSameProduct.errorCode === null) {
					console.log('responseSameProduct', responseSameProduct);
					setDataSameProduct(responseSameProduct.data.listData);
				}
			}
			if (getComment) {
				if (getComment.errorCode === null) {
					console.log(getComment);
					setDataComment(getComment.data);
					setProgressCmt(false);
				}
			}
		};
		fetchCmt();
	}, [pageCmt, idProduct, refreshCmt]);
	const [profileInfo, setProfileInfo] = React.useState<any>();
	React.useEffect(() => {
		const fetchProfile = async () => {
			const profile = await UserGet();
			if (profile) {
				if (profile.errorCode === null) {
					setProfileInfo(profile.data);
					console.log('profile', profile);
				} else {
					setProfileInfo({ email: '' });
				}
			}
		};
		fetchProfile();
	}, []);

	React.useEffect(() => {
		const fetchRating = async () => {
			setProgressRating(true);
			const fetchRatingList = await RatingPost({ id: idProduct, page: pageRating, pageSize: 5 });
			if (fetchRatingList) {
				if (fetchRatingList.errorCode === null) {
					console.log('fetchRatingList', fetchRatingList);
					setRatingListData(fetchRatingList.data);
					setProgressRating(false);
				}
			}
		};
		const getDataRecommend = async () => {
			const token: any = window.localStorage.getItem('token');
			const date = Date.now();
			if (token) {
				const checkToken: any = jwtDecode(token);
				if (checkToken.exp < date / 1000) {
					localStorage.removeItem('token');
					dispatch(updateValueRefreshPage(true));
					setDataProductRecommend([]);
				} else {
					const response = await RecommendPost({ page: 1, pageSize: 8 });
					if (response.errorCode === null) {
						//dispatch(updateValueRefreshPage(true));
						setDataProductRecommend(response.data.listData);
						//dispatch(updateProfileUser(response.data));
					}
				}
			} else {
				setDataProductRecommend([]);
			}
		};
		getDataRecommend();
		fetchRating();
	}, [pageRating, idProduct, dispatch]);
	React.useEffect(() => {
		//window.scrollTo(0, 0);
		const fetchProductId = async () => {
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
			toast.error('Kh??ng ????? s??? l?????ng');
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
			toast.success('???? th??m s???n ph???m v??o gi??? h??ng');
		}
	};
	const addToCart = () => {
		//setPrefresh(refresh + 1);
		if (storeQuantity() === -1) {
			toast.error('Kh??ng ????? s??? l?????ng');
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
			toast.success('???? th??m s???n ph???m v??o gi??? h??ng');
		}
	};
	const [idcmt, setIdCmt] = React.useState(-1);
	const [valueCmt, setValueCmt] = React.useState('');
	const [valueEmail, setValueEmail] = React.useState('');
	const [valueCmtMain, setValueCmtMain] = React.useState('');
	const [valueEmailMain, setValueEmailMain] = React.useState('');
	return isResponseiveMobile ? (
		<Grid container className={classes.bgHeader}>
			{isResponseive ? (
				<Grid item xs={9} style={{ position: 'absolute', top: '93px', left: '362px' }}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to="/" className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang ch???
						</Link>
						<Link to="/" className={classes.link}>
							??i???n tho???i
						</Link>
						{/* <Link to="/" className={classes.link}>
					Apple Watch SE GPS 40mm V??ng Ch??nh H??ng Ch??a K??ch Tr??i BH Apple Watch SE GPS 40mm
				</Link> */}
					</Breadcrumbs>
				</Grid>
			) : (
				<Grid item xs={12} style={{ marginTop: '30px' }}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to="/" className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang ch???
						</Link>
						<Link to="/" className={classes.link}>
							??i???n tho???i
						</Link>
						{/* <Link to="/" className={classes.link}>
					Apple Watch SE GPS 40mm V??ng Ch??nh H??ng Ch??a K??ch Tr??i BH Apple Watch SE GPS 40mm
				</Link> */}
					</Breadcrumbs>
				</Grid>
			)}

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
												<img style={{ width: '82%' }} src={`http://localhost:8000${item}`} />
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
								{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.promotion_price))}??
							</Typography>
							<Typography component="span" className={classes.discount_percent}>
								{`-${
									((Number(dataProduct?.item?.unit_price) -
										Number(dataProduct?.item?.promotion_price)) *
										100) /
									Number(dataProduct?.item?.unit_price)
								}%`}
							</Typography>
							&nbsp;&nbsp;
							<Typography
								component="span"
								style={{ color: 'grey', textDecoration: 'line-through' }}
							>
								{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.unit_price))}??
							</Typography>
							{dataProduct?.item?.quantity === 0 ? (
								<Typography
									variant="body1"
									gutterBottom
									style={{ marginTop: '20px', fontWeight: 'bold' }}
								>
									T??nh tr???ng: h???t h??ng&nbsp;&nbsp;
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
									T??nh tr???ng: c??n h??ng&nbsp;&nbsp;
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
										Khuy???n m??i
									</Typography>
									<Typography>
										<i
											className="fa fa-check-circle"
											aria-hidden="true"
											style={{ color: '#4caf50' }}
										></i>
										&nbsp;&nbsp;
										<Typography component="span" style={{ color: 'red', fontWeight: 600 }}>
											T???ng s???c c??p Deimark ch??nh h??ng b???o h??nh 1 ?????i 1 trong 12 th??ng
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
											?????i s???c nhanh 20W MI???N PH?? khi n??ng c???p BH 12 th??ng
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
													(chi ??p d???ng cho san pham nay)
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
											B???o h??nh qu???c t??? tr???n ?????i, ?????i m???i n???u b??? Relock
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
											H??? tr??? c??i ?????t, t???o t??i kho???n iCloud mi???n ph??
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
											Mua Online: Giao h??ng t???n nh??- Nh???n h??ng thanh to??n
										</Typography>
									</Typography>
								</Card>
							</Box>
							<Button
								variant="contained"
								color="primary"
								style={{ display: 'flex', marginTop: '10px', marginBottom: '20px' }}
								fullWidth
								size="large"
								onClick={buyNow}
								disabled={dataProduct?.item?.quantity === 0 ? true : false}
							>
								<Box style={{ display: 'contents' }}>
									<AddShoppingCartIcon style={{ fontSize: '50px' }} />
								</Box>
								<Box>
									<Typography component="h6" style={{ fontSize: '1.5rem' }}>
										Mua ngay
									</Typography>
									<Typography variant="body1" style={{ textTransform: 'initial' }}>
										Giao h??ng t???n n??i
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
									Th??ng s??? k??? thu???t
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
													paddingRight: 0,
													width: '30%',
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
									B??i vi???t ????nh gi??
								</Typography>
								<Box style={{ overflow: 'hidden' }}>
									<div dangerouslySetInnerHTML={{ __html: dataProduct?.description }} />
								</Box>
								<Typography
									variant="h5"
									className={classes.titleText}
									gutterBottom
									style={{ marginTop: '10px' }}
								>
									Nh???n x??t v?? ????nh gi??
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
													C?? {dataProduct.rate_number} ????nh gi??
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
															dataProduct?.rate?.rate5 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate5 / dataProduct.rate_number) * 100
																		)
																  ) + Number(rate.idRate === 5 ? rate.value : 0)
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
														{dataProduct?.rate?.rate5 === undefined
															? 0
															: Math.round(
																	Number((dataProduct?.rate?.rate5 / dataProduct.rate_number) * 100)
															  ) + Number(rate.idRate === 5 ? rate.value : 0)}
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
															dataProduct?.rate?.rate4 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate4 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate4 === undefined
															? 0
															: Math.round(
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
															dataProduct?.rate?.rate3 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate3 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate3 === undefined
															? 0
															: Math.round(
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
															dataProduct?.rate?.rate2 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate2 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate2 === undefined
															? 0
															: Math.round(
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
															dataProduct?.rate?.rate1 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate1 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate1 === undefined
															? 0
															: Math.round(
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
												{collapse ? '????ng l???i' : 'G???i ????nh gi?? c???a b???n'}
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
												Ch???n ????nh gi?? c???a b???n
											</Typography>

											<Rating
												name="size-large"
												defaultValue={3}
												size="large"
												onChange={(event, newValue) => {
													setValue(newValue);
													//console.log(newValue);

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
														placeholder="Nh???p ????nh gi?? v??? s???n ph???m"
														variant="outlined"
														fullWidth
													/>
												</Box>
												<Box style={{ display: 'inline-block', width: '40%', marginLeft: '10px' }}>
													<TextField
														{...register('name')}
														id="name"
														label="H??? t??n *"
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
														G???i ????nh gia
													</Button>
												</Box>
											</form>
										</Box>
									</Collapse>
								</Card>
								<Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
								<Toolbar id="back-to-rating" />
								<Box style={{ position: 'relative' }}>
									{progressRating ? (
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', top: '50%', left: '50%' }}
										/>
									) : (
										<React.Fragment>
											{ratingListData.listdata?.map((item: any) => {
												return (
													<Box style={{ marginBottom: '10px' }}>
														<Box style={{ display: 'flex', alignItems: 'center' }}>
															<Avatar>S</Avatar> &nbsp;&nbsp;
															<Typography variant="h6" style={{ fontWeight: 'bold' }}>
																{item.email_user.slice(0, item.email_user.indexOf('@'))}
															</Typography>
														</Box>
														<Box style={{ marginLeft: '39px' }}>
															<Typography variant="h6">
																<Rating
																	style={{ fontSize: '20px', display: 'flex' }}
																	name="read-only"
																	value={item.rating}
																	readOnly
																/>

																<Typography color="textSecondary">v??o ng??y {item.date}</Typography>
															</Typography>
															<Typography>{item.comment}</Typography>
														</Box>
													</Box>
												);
											})}
											{ratingListData.total > 5 && (
												<Box
													style={{
														display: 'flex',
														justifyContent: 'flex-end',
														marginTop: ' 30px',
													}}
												>
													<Pagination
														count={Math.ceil(ratingListData.total / 5)}
														variant="outlined"
														color="primary"
														defaultPage={pageRating}
														onClick={handleClickPageRating}
														onChange={(event: object, page: number) => {
															setPageRating(page);
														}}
													/>
												</Box>
											)}
										</React.Fragment>
									)}
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
										H???i & ????p{' '}
										<Typography component="span" className={classes.discount_percent}>
											c?? {dataComment.total} b??nh lu???n
										</Typography>
										<Button
											variant="text"
											className={classes.discount_percent}
											onClick={() => {
												setRefreshCmt(refreshCmt + 1);
											}}
											style={{
												marginLeft: '10px',
												backgroundColor: '#d32f2f',
												textTransform: 'inherit',
												padding: '0',
											}}
										>
											T???i l???i
										</Button>
									</Typography>

									<Box>
										<Box style={{ display: 'contents' }}>
											<Box style={{ display: 'inline-block', width: '100%' }}>
												{profileInfo?.email === '' && (
													<TextField
														id="email"
														value={valueEmailMain}
														label="Email"
														name="email"
														size="small"
														variant="outlined"
														fullWidth
														onChange={(e) => {
															setValueEmailMain(e.target.value);
														}}
														style={{ marginBottom: '10px' }}
													/>
												)}
												<TextField
													id="comment"
													value={valueCmtMain}
													multiline
													name="comment"
													rows={3}
													placeholder="Nh???p ????nh gi?? v??? s???n ph???m"
													variant="outlined"
													fullWidth
													onChange={(e) => {
														setValueCmtMain(e.target.value);
													}}
													style={{ marginBottom: '10px' }}
												/>
												<Button
													variant="contained"
													color="primary"
													disabled={progressCmt}
													onClick={async (event) => {
														if (profileInfo.email === '') {
															if (valueCmtMain === '') {
																Swal.fire({
																	icon: 'error',
																	title: 'N???i dung kh??ng ????? tr???ng',
																});
															} else if (valueEmailMain === '') {
																Swal.fire({
																	icon: 'error',
																	title: 'Email kh??ng ????? tr???ng',
																});
															} else {
																setProgressCmt(true);
																const response = await CreateCommentPost({
																	email: valueEmailMain,
																	comment: valueCmtMain,
																	id_product: idProduct,
																});
																if (response) {
																	if (response.errorCode === null) {
																		Swal.fire({
																			icon: 'success',
																			title: 'G???i c??u h???i th??nh c??ng',
																		});
																		setRefreshCmt(refreshCmt + 1);
																		setProgressCmt(false);
																		setValueCmtMain('');
																		setValueEmailMain('');
																	} else if (response.errorCode === 1) {
																		Swal.fire({
																			icon: 'error',
																			title: 'Email kh??ng ????ng ?????nh d???ng',
																		});
																		setProgressCmt(false);
																	} else {
																		Swal.fire({
																			icon: 'error',
																			title: 'C?? l???i x???y ra',
																		});
																		setProgressCmt(false);
																	}
																}
															}
														} else {
															if (valueCmtMain === '') {
																Swal.fire({
																	icon: 'error',
																	title: 'N???i dung kh??ng ????? tr???ng',
																});
															} else {
																setProgressCmt(true);
																const response = await CreateCommentPost({
																	email: profileInfo.email,
																	comment: valueCmtMain,
																	id_product: idProduct,
																});
																if (response) {
																	if (response.errorCode === null) {
																		Swal.fire({
																			icon: 'success',
																			title: 'G???i c??u h???i th??nh c??ng',
																		});
																		setRefreshCmt(refreshCmt + 1);
																		setProgressCmt(false);
																		setValueCmtMain('');
																	} else if (response.errorCode === 1) {
																		Swal.fire({
																			icon: 'error',
																			title: 'Email kh??ng ????ng ?????nh d???ng',
																		});
																		setProgressCmt(false);
																	} else {
																		Swal.fire({
																			icon: 'error',
																			title: 'C?? l???i x???y ra',
																		});
																		setProgressCmt(false);
																	}
																}
															}
														}
													}}
												>
													G???i c??u h???i
												</Button>
											</Box>
										</Box>
									</Box>

									<Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
									<Toolbar id="back-to-Cmt" />
									<Box style={{ position: 'relative' }}>
										{progressCmt ? (
											<CircularProgress
												color="secondary"
												style={{ position: 'inherit', left: '50%' }}
											/>
										) : (
											<React.Fragment>
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
																	<Typography color="textSecondary">
																		v??o ng??y {item.date}
																	</Typography>
																</Box>
																<Box style={{ marginLeft: '39px', marginBottom: '10px' }}>
																	<Typography>{item.comment_comment}</Typography>
																	<Typography
																		className={classes.reply}
																		onClick={() => {
																			setCollapseReply(!collapseReply);
																			if (idcmt === item.id_comment) {
																				setIdCmt(0);
																			} else {
																				setIdCmt(item.id_comment);
																				setValueCmt('');
																			}
																		}}
																	>
																		Tr??? l???i
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
																						Qu???n tr??? vi??n
																					</Typography>
																				)}
																				<Typography color="textSecondary">
																					v??o ng??y {itemFeedback.date}
																				</Typography>
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
																		in={idcmt === item.id_comment ? true : false}
																		timeout="auto"
																		unmountOnExit
																	>
																		<Box style={{ display: 'contents' }}>
																			<Box style={{ display: 'inline-block', width: '100%' }}>
																				{profileInfo?.email === '' && (
																					<TextField
																						id="email"
																						value={valueEmail}
																						name="email"
																						label="Email"
																						variant="outlined"
																						fullWidth
																						onChange={(e) => {
																							setValueEmail(e.target.value);
																						}}
																						style={{ marginBottom: '10px' }}
																					/>
																				)}
																				<TextField
																					id="comment"
																					value={valueCmt}
																					multiline
																					name="comment"
																					rows={3}
																					placeholder="Nh???p ????nh gi?? v??? s???n ph???m"
																					variant="outlined"
																					fullWidth
																					onChange={(e) => {
																						setValueCmt(e.target.value);
																					}}
																					style={{ marginBottom: '10px' }}
																				/>
																				<Button
																					variant="contained"
																					color="primary"
																					disabled={progressCmt}
																					onClick={async () => {
																						if (profileInfo.email === '') {
																							if (valueCmt === '') {
																								Swal.fire({
																									icon: 'error',
																									title: 'N???i dung kh??ng ????? tr???ng',
																								});
																							} else if (valueEmail === '') {
																								Swal.fire({
																									icon: 'error',
																									title: 'Email kh??ng ????? tr???ng',
																								});
																							} else {
																								handleClickPageCmt(event);
																								setProgressCmt(true);
																								const response = await CreateFeedbackPost({
																									comment: valueCmt,
																									email: valueEmail,
																									id_comment: item.id_comment,
																								});
																								if (response) {
																									if (response.errorCode === null) {
																										Swal.fire({
																											icon: 'success',
																											title: 'G???i c??u h???i th??nh c??ng',
																										});
																										setRefreshCmt(refreshCmt + 1);
																										setProgressCmt(false);
																										setValueCmt('');
																										setIdCmt(0);
																										setValueEmail('');
																									} else if (response.errorCode === 1) {
																										Swal.fire({
																											icon: 'error',
																											title: 'Email kh??ng ????ng ?????nh d???ng',
																										});
																										setProgressCmt(false);
																									} else {
																										Swal.fire({
																											icon: 'error',
																											title: 'C?? l???i x???y ra',
																										});
																										setProgressCmt(false);
																									}
																								}
																							}
																						} else {
																							if (valueCmt === '') {
																								Swal.fire({
																									icon: 'error',
																									title: 'N???i dung kh??ng ????? tr???ng',
																								});
																							} else {
																								handleClickPageCmt(event);
																								setProgressCmt(true);
																								const response = await CreateFeedbackPost({
																									comment: valueCmt,
																									email: profileInfo.email,
																									id_comment: item.id_comment,
																								});
																								if (response) {
																									if (response.errorCode === null) {
																										Swal.fire({
																											icon: 'success',
																											title: 'G???i c??u h???i th??nh c??ng',
																										});
																										setRefreshCmt(refreshCmt + 1);
																										setProgressCmt(false);
																										setValueCmt('');
																										setIdCmt(0);
																									} else if (response.errorCode === 1) {
																										Swal.fire({
																											icon: 'error',
																											title: 'Email kh??ng ????ng ?????nh d???ng',
																										});
																										setProgressCmt(false);
																									} else {
																										Swal.fire({
																											icon: 'error',
																											title: 'C?? l???i x???y ra',
																										});
																										setProgressCmt(false);
																									}
																								}
																							}
																						}
																					}}
																				>
																					G???i c??u h???i
																				</Button>
																			</Box>
																		</Box>
																	</Collapse>
																</Box>
															</Box>
														</Box>
													);
												})}
												{dataComment.total > 5 && (
													<Box
														style={{
															display: 'flex',
															justifyContent: 'flex-end',
															marginTop: ' 30px',
														}}
													>
														<Pagination
															count={Math.ceil(dataComment.total / 5)}
															variant="outlined"
															color="primary"
															defaultPage={pageCmt}
															onClick={handleClickPageCmt}
															onChange={(event: object, page: number) => {
																setPageCmt(page);
															}}
														/>
													</Box>
												)}
											</React.Fragment>
										)}
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
											{dataProduct?.item?.name}
										</Typography>
										<Typography
											variant="h5"
											style={{
												fontWeight: 'bold',
												paddingTop: '10px',
												color: 'red',
											}}
										>
											{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.unit_price))}??
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
												Khuy???n m??i
											</Typography>
											<Typography>
												<i
													className="fa fa-check-circle"
													aria-hidden="true"
													style={{ color: '#4caf50' }}
												></i>
												&nbsp;&nbsp;
												<Typography component="span" style={{ color: 'red', fontWeight: 600 }}>
													T???ng s???c c??p Deimark ch??nh h??ng b???o h??nh 1 ?????i 1 trong 12 th??ng
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
													?????i s???c nhanh 20W MI???N PH?? khi n??ng c???p BH 12 th??ng
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
													(chi ??p d???ng cho san pham nay)
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
												<Typography
													component="span"
													style={{ fontStyle: 'italic', fontWeight: 600 }}
												>
													B???o h??nh qu???c t??? tr???n ?????i, ?????i m???i n???u b??? Relock
												</Typography>
											</Typography>
											<Typography>
												<i
													className="fa fa-check-circle"
													aria-hidden="true"
													style={{ color: '#4caf50' }}
												></i>
												&nbsp;&nbsp;
												<Typography
													component="span"
													style={{ fontStyle: 'italic', fontWeight: 600 }}
												>
													H??? tr??? c??i ?????t, t???o t??i kho???n iCloud mi???n ph??
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
													Mua Online: Giao h??ng t???n nh??- Nh???n h??ng thanh to??n
												</Typography>
											</Typography>
										</Card>
									</Box>
									<Button
										variant="contained"
										color="primary"
										style={{ display: 'block', marginTop: '10px' }}
										fullWidth
										size="large"
										onClick={buyNow}
										disabled={dataProduct?.item?.quantity === 0 ? true : false}
									>
										<Typography component="h6" style={{ fontSize: '1.1rem' }}>
											Mua ngay
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
							S???n ph???m t????ng t???
						</Typography>

						<Slider {...settings}>
							{dataSameProduct?.map((item: any) => {
								return (
									<ProductCarousel
										unit_price={item[0].unit_price}
										name={item[0].name}
										id={item[0].id}
										promotion_price={item[0].promotion_price}
										link={item.image}
										avg={item.avg}
										promotion={item.promotion}
										rate_number={item.rate_number}
										storeQuantity={item[0].quantity}
										carouselOnclick={carouselOnclick}
									/>
								);
							})}
						</Slider>
					</Grid>
					{dataProductRecommend.length > 0 && (
						<Grid item xs={12}>
							<Typography
								variant="h5"
								className={classes.titleText}
								gutterBottom
								style={{ marginTop: '10px' }}
							>
								S???n ph???m g???i ??
							</Typography>

							<Slider {...settings}>
								{dataProductRecommend?.map((item: any) => {
									return (
										<ProductCarousel
											unit_price={item[0].unit_price}
											name={item[0].name}
											id={item[0].id}
											promotion_price={item[0].promotion_price}
											link={item.image}
											avg={item.avg}
											promotion={item.promotion}
											rate_number={item.rate_number}
											storeQuantity={item[0].quantity}
											carouselOnclick={carouselOnclick}
										/>
									);
								})}
							</Slider>
						</Grid>
					)}
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
	) : (
		<Grid container className={classes.bgHeaderMobile}>
			{isResponseive ? (
				<Grid item xs={9} style={{ position: 'absolute', top: '93px', left: '362px' }}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to="/" className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang ch???
						</Link>
						<Link to="/" className={classes.link}>
							??i???n tho???i
						</Link>
						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm V??ng Ch??nh H??ng Ch??a K??ch Tr??i BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>
			) : (
				<Grid item xs={12} style={{ marginTop: '30px' }}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to="/" className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang ch???
						</Link>
						<Link to="/" className={classes.link}>
							??i???n tho???i
						</Link>
						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm V??ng Ch??nh H??ng Ch??a K??ch Tr??i BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>
			)}

			{progress ? (
				<CircularProgress
					color="secondary"
					style={{ position: 'fixed', top: '100px', left: '50%' }}
				/>
			) : (
				<React.Fragment>
					{isResponseivePhone ? (
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
													<img style={{ width: '82%' }} src={`http://localhost:8000${item}`} />
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
									{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.promotion_price))}??
								</Typography>
								<Typography component="span" className={classes.discount_percent}>
									{`-${
										((Number(dataProduct?.item?.unit_price) -
											Number(dataProduct?.item?.promotion_price)) *
											100) /
										Number(dataProduct?.item?.unit_price)
									}%`}
								</Typography>
								&nbsp;&nbsp;
								<Typography
									component="span"
									style={{ color: 'grey', textDecoration: 'line-through' }}
								>
									{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.unit_price))}??
								</Typography>
								{dataProduct?.item?.quantity === 0 ? (
									<Typography
										variant="body1"
										gutterBottom
										style={{ marginTop: '20px', fontWeight: 'bold' }}
									>
										T??nh tr???ng: h???t h??ng&nbsp;&nbsp;
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
										T??nh tr???ng: c??n h??ng&nbsp;&nbsp;
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
											Khuy???n m??i
										</Typography>
										<Typography>
											<i
												className="fa fa-check-circle"
												aria-hidden="true"
												style={{ color: '#4caf50' }}
											></i>
											&nbsp;&nbsp;
											<Typography component="span" style={{ color: 'red', fontWeight: 600 }}>
												T???ng s???c c??p Deimark ch??nh h??ng b???o h??nh 1 ?????i 1 trong 12 th??ng
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
												?????i s???c nhanh 20W MI???N PH?? khi n??ng c???p BH 12 th??ng
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
														(chi ??p d???ng cho san pham nay)
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
												B???o h??nh qu???c t??? tr???n ?????i, ?????i m???i n???u b??? Relock
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
												H??? tr??? c??i ?????t, t???o t??i kho???n iCloud mi???n ph??
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
												Mua Online: Giao h??ng t???n nh??- Nh???n h??ng thanh to??n
											</Typography>
										</Typography>
									</Card>
								</Box>
								<Button
									variant="contained"
									color="primary"
									style={{ display: 'flex', marginTop: '10px', marginBottom: '20px' }}
									fullWidth
									size="large"
									onClick={buyNow}
									disabled={dataProduct?.item?.quantity === 0 ? true : false}
								>
									<Box style={{ display: 'contents' }}>
										<AddShoppingCartIcon style={{ fontSize: '50px' }} />
									</Box>
									<Box>
										<Typography component="h6" style={{ fontSize: '1.5rem' }}>
											Mua ngay
										</Typography>
										<Typography variant="body1" style={{ textTransform: 'initial' }}>
											Giao h??ng t???n n??i
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
					) : (
						<Grid container spacing={3}>
							<Grid item xs={12}>
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
							</Grid>
							<Grid item xs={12}>
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
													<img style={{ width: '82%' }} src={`http://localhost:8000${item}`} />
												</div>
											);
										})}
									</Carousel>

									{/* <div style={{ position: 'absolute' }}>
							<SliderImage data={data} showDescription={true} direction="right" />
						</div> */}
								</Box>
							</Grid>
							<Grid item xs={12}>
								<Divider />
								<Typography variant="h4" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
									{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.promotion_price))}??
								</Typography>
								<Typography component="span" className={classes.discount_percent}>
									{`-${
										((Number(dataProduct?.item?.unit_price) -
											Number(dataProduct?.item?.promotion_price)) *
											100) /
										Number(dataProduct?.item?.unit_price)
									}%`}
								</Typography>
								&nbsp;&nbsp;
								<Typography
									component="span"
									style={{ color: 'grey', textDecoration: 'line-through' }}
								>
									{Intl.NumberFormat('en-US').format(Number(dataProduct?.item?.unit_price))}??
								</Typography>
								{dataProduct?.item?.quantity === 0 ? (
									<Typography
										variant="body1"
										gutterBottom
										style={{ marginTop: '20px', fontWeight: 'bold' }}
									>
										T??nh tr???ng: h???t h??ng&nbsp;&nbsp;
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
										T??nh tr???ng: c??n h??ng&nbsp;&nbsp;
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
											Khuy???n m??i
										</Typography>
										<Typography>
											<i
												className="fa fa-check-circle"
												aria-hidden="true"
												style={{ color: '#4caf50' }}
											></i>
											&nbsp;&nbsp;
											<Typography component="span" style={{ color: 'red', fontWeight: 600 }}>
												T???ng s???c c??p Deimark ch??nh h??ng b???o h??nh 1 ?????i 1 trong 12 th??ng
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
												?????i s???c nhanh 20W MI???N PH?? khi n??ng c???p BH 12 th??ng
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
														(chi ??p d???ng cho san pham nay)
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
												B???o h??nh qu???c t??? tr???n ?????i, ?????i m???i n???u b??? Relock
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
												H??? tr??? c??i ?????t, t???o t??i kho???n iCloud mi???n ph??
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
												Mua Online: Giao h??ng t???n nh??- Nh???n h??ng thanh to??n
											</Typography>
										</Typography>
									</Card>
								</Box>
								<Button
									variant="contained"
									color="primary"
									style={{ display: 'flex', marginTop: '10px', marginBottom: '20px' }}
									fullWidth
									size="large"
									disabled={dataProduct?.item?.quantity === 0 ? true : false}
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
											Giao h??ng t???n n??i
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
					)}
					<Grid item xs={12}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<Typography variant="h5" className={classes.titleText} gutterBottom>
									Th??ng s??? k??? thu???t
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
													paddingRight: 0,
													width: '30%',
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
									B??i vi???t ????nh gi??
								</Typography>
								<Box style={{ overflow: 'hidden' }}>
									<div dangerouslySetInnerHTML={{ __html: dataProduct?.description }} />
								</Box>
								<Typography
									variant="h5"
									className={classes.titleText}
									gutterBottom
									style={{ marginTop: '10px' }}
								>
									Nh???n x??t v?? ????nh gi??
								</Typography>
								<Card variant="outlined" style={{ padding: '10px' }}>
									<Box style={{ display: 'flex' }}>
										<Box style={{ width: '50%' }}>
											<Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
												Co {dataProduct.rate_number} danh gia
											</Typography>
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
															dataProduct?.rate?.rate5 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate5 / dataProduct.rate_number) * 100
																		)
																  ) + Number(rate.idRate === 5 ? rate.value : 0)
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
														{dataProduct?.rate?.rate5 === undefined
															? 0
															: Math.round(
																	Number((dataProduct?.rate?.rate5 / dataProduct.rate_number) * 100)
															  ) + Number(rate.idRate === 5 ? rate.value : 0)}
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
															dataProduct?.rate?.rate4 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate4 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate4 === undefined
															? 0
															: Math.round(
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
															dataProduct?.rate?.rate3 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate3 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate3 === undefined
															? 0
															: Math.round(
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
															dataProduct?.rate?.rate2 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate2 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate2 === undefined
															? 0
															: Math.round(
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
															dataProduct?.rate?.rate1 === undefined
																? 0
																: Math.round(
																		Number(
																			(dataProduct?.rate?.rate1 / dataProduct.rate_number) * 100
																		)
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
														{dataProduct?.rate?.rate1 === undefined
															? 0
															: Math.round(
																	Number((dataProduct?.rate?.rate1 / dataProduct.rate_number) * 100)
															  ) + Number(rate.idRate === 1 ? rate.value : 0)}
														%
													</Typography>
												</Box>
											</Typography>
										</Box>
										<Box
											style={{
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
												{collapse ? '????ng l???i' : 'G???i ????nh gi?? c???a b???n'}
											</Button>
										</Box>
									</Box>
									<Collapse in={collapse} timeout="auto" unmountOnExit>
										<Typography variant="body1" style={{ paddingRight: '20px' }}>
											Ch???n ????nh gi?? c???a b???n
										</Typography>
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												marginTop: '25px',
												marginBottom: '25px',
											}}
										>
											<Rating
												name="size-large"
												defaultValue={3}
												size="large"
												onChange={(event, newValue) => {
													setValue(newValue);
													//console.log(newValue);

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
										<Box>
											<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
												<Box style={{ marginBottom: '10px' }}>
													<TextField
														id="rate_content"
														{...register('rate_content')}
														multiline
														name="rate_content"
														rows={4}
														placeholder="Nh???p ????nh gi?? v??? s???n ph???m"
														variant="outlined"
														fullWidth
													/>
												</Box>
												<Box style={{ display: 'inline-block' }}>
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
														G???i ????nh gia
													</Button>
												</Box>
											</form>
										</Box>
									</Collapse>
								</Card>
								<Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
								<Toolbar id="back-to-rating" />
								<Box style={{ position: 'relative' }}>
									{progressRating ? (
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', top: '50%', left: '50%' }}
										/>
									) : (
										<React.Fragment>
											{ratingListData.listdata?.map((item: any) => {
												return (
													<Box style={{ marginBottom: '10px' }}>
														<Box style={{ display: 'flex', alignItems: 'center' }}>
															<Avatar>S</Avatar> &nbsp;&nbsp;
															<Typography variant="h6" style={{ fontWeight: 'bold' }}>
																{item.email_user.slice(0, item.email_user.indexOf('@'))}
															</Typography>
														</Box>
														<Box style={{ marginLeft: '39px' }}>
															<Typography variant="h6">
																<Rating
																	style={{ fontSize: '20px', display: 'flex' }}
																	name="read-only"
																	value={item.rating}
																	readOnly
																/>

																<Typography color="textSecondary">v??o ng??y {item.date}</Typography>
															</Typography>
															<Typography>{item.comment}</Typography>
														</Box>
													</Box>
												);
											})}
											{ratingListData.total > 5 && (
												<Box
													style={{
														display: 'flex',
														justifyContent: 'flex-end',
														marginTop: ' 30px',
													}}
												>
													<Pagination
														count={Math.ceil(ratingListData.total / 5)}
														variant="outlined"
														color="primary"
														defaultPage={pageRating}
														onClick={handleClickPageRating}
														onChange={(event: object, page: number) => {
															setPageRating(page);
														}}
													/>
												</Box>
											)}
										</React.Fragment>
									)}
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
										H???i & ????p{' '}
										<Typography component="span" className={classes.discount_percent}>
											c?? {dataComment.total} b??nh lu???n
										</Typography>
										<Button
											variant="text"
											className={classes.discount_percent}
											onClick={() => {
												setRefreshCmt(refreshCmt + 1);
											}}
											style={{
												marginLeft: '10px',
												backgroundColor: '#d32f2f',
												textTransform: 'inherit',
												padding: '0',
											}}
										>
											T???i l???i
										</Button>
									</Typography>

									<Box>
										<Box style={{ display: 'contents' }}>
											<Box style={{ display: 'inline-block', width: '100%' }}>
												{profileInfo?.email === '' && (
													<TextField
														id="email"
														value={valueEmailMain}
														label="Email"
														name="email"
														size="small"
														variant="outlined"
														fullWidth
														onChange={(e) => {
															setValueEmailMain(e.target.value);
														}}
														style={{ marginBottom: '10px' }}
													/>
												)}
												<TextField
													id="comment"
													value={valueCmtMain}
													multiline
													name="comment"
													rows={3}
													placeholder="Nh???p ????nh gi?? v??? s???n ph???m"
													variant="outlined"
													fullWidth
													onChange={(e) => {
														setValueCmtMain(e.target.value);
													}}
													style={{ marginBottom: '10px' }}
												/>
												<Button
													variant="contained"
													color="primary"
													disabled={progressCmt}
													onClick={async (event) => {
														if (profileInfo.email === '') {
															if (valueCmtMain === '') {
																Swal.fire({
																	icon: 'error',
																	title: 'N???i dung kh??ng ????? tr???ng',
																});
															} else if (valueEmailMain === '') {
																Swal.fire({
																	icon: 'error',
																	title: 'Email kh??ng ????? tr???ng',
																});
															} else {
																setProgressCmt(true);
																const response = await CreateCommentPost({
																	email: valueEmailMain,
																	comment: valueCmtMain,
																	id_product: idProduct,
																});
																if (response) {
																	if (response.errorCode === null) {
																		Swal.fire({
																			icon: 'success',
																			title: 'G???i c??u h???i th??nh c??ng',
																		});
																		setRefreshCmt(refreshCmt + 1);
																		setProgressCmt(false);
																		setValueCmtMain('');
																		setValueEmailMain('');
																	} else if (response.errorCode === 1) {
																		Swal.fire({
																			icon: 'error',
																			title: 'Email kh??ng ????ng ?????nh d???ng',
																		});
																		setProgressCmt(false);
																	} else {
																		Swal.fire({
																			icon: 'error',
																			title: 'C?? l???i x???y ra',
																		});
																		setProgressCmt(false);
																	}
																}
															}
														} else {
															if (valueCmtMain === '') {
																Swal.fire({
																	icon: 'error',
																	title: 'N???i dung kh??ng ????? tr???ng',
																});
															} else {
																setProgressCmt(true);
																const response = await CreateCommentPost({
																	email: profileInfo.email,
																	comment: valueCmtMain,
																	id_product: idProduct,
																});
																if (response) {
																	if (response.errorCode === null) {
																		Swal.fire({
																			icon: 'success',
																			title: 'G???i c??u h???i th??nh c??ng',
																		});
																		setRefreshCmt(refreshCmt + 1);
																		setProgressCmt(false);
																		setValueCmtMain('');
																	} else if (response.errorCode === 1) {
																		Swal.fire({
																			icon: 'error',
																			title: 'Email kh??ng ????ng ?????nh d???ng',
																		});
																		setProgressCmt(false);
																	} else {
																		Swal.fire({
																			icon: 'error',
																			title: 'C?? l???i x???y ra',
																		});
																		setProgressCmt(false);
																	}
																}
															}
														}
													}}
												>
													G???i c??u h???i
												</Button>
											</Box>
										</Box>
									</Box>

									<Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
									<Box style={{ position: 'relative' }}>
										{progressCmt ? (
											<CircularProgress
												color="secondary"
												style={{
													position: 'inherit',

													left: '50%',
													marginBottom: '20px',
												}}
											/>
										) : (
											<React.Fragment>
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
																	<Typography color="textSecondary">
																		v??o ng??y {item.date}
																	</Typography>
																</Box>
																<Box style={{ marginLeft: '39px', marginBottom: '10px' }}>
																	<Typography>{item.comment_comment}</Typography>
																	<Typography
																		className={classes.reply}
																		onClick={() => {
																			setCollapseReply(!collapseReply);

																			idcmt === item.id_comment
																				? setIdCmt(0)
																				: setIdCmt(item.id_comment);
																		}}
																	>
																		Tr??? l???i
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
																						Qu???n tr??? vi??n
																					</Typography>
																				)}
																				<Typography color="textSecondary">
																					v??o ng??y {itemFeedback.date}
																				</Typography>
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
																		in={idcmt === item.id_comment ? true : false}
																		timeout="auto"
																		unmountOnExit
																	>
																		<Box style={{ display: 'contents' }}>
																			<Box style={{ display: 'inline-block', width: '100%' }}>
																				{profileInfo?.email === '' && (
																					<TextField
																						id="email"
																						value={valueEmail}
																						name="email"
																						label="Email"
																						variant="outlined"
																						fullWidth
																						onChange={(e) => {
																							setValueEmail(e.target.value);
																						}}
																						style={{ marginBottom: '10px' }}
																					/>
																				)}
																				<TextField
																					id="comment"
																					value={valueCmt}
																					multiline
																					name="comment"
																					rows={3}
																					placeholder="Nh???p ????nh gi?? v??? s???n ph???m"
																					variant="outlined"
																					fullWidth
																					onChange={(e) => {
																						setValueCmt(e.target.value);
																					}}
																					style={{ marginBottom: '10px' }}
																				/>
																				<Button
																					variant="contained"
																					color="primary"
																					disabled={progressCmt}
																					onClick={async () => {
																						if (profileInfo.email === '') {
																							if (valueCmt === '') {
																								Swal.fire({
																									icon: 'error',
																									title: 'N???i dung kh??ng ????? tr???ng',
																								});
																							} else if (valueEmail === '') {
																								Swal.fire({
																									icon: 'error',
																									title: 'Email kh??ng ????? tr???ng',
																								});
																							} else {
																								handleClickPageCmt(event);
																								setProgressCmt(true);
																								const response = await CreateFeedbackPost({
																									comment: valueCmt,
																									email: valueEmail,
																									id_comment: item.id_comment,
																								});
																								if (response) {
																									if (response.errorCode === null) {
																										Swal.fire({
																											icon: 'success',
																											title: 'G???i c??u h???i th??nh c??ng',
																										});
																										setRefreshCmt(refreshCmt + 1);
																										setProgressCmt(false);
																										setValueCmt('');
																										setIdCmt(0);
																										setValueEmail('');
																									} else if (response.errorCode === 1) {
																										Swal.fire({
																											icon: 'error',
																											title: 'Email kh??ng ????ng ?????nh d???ng',
																										});
																										setProgressCmt(false);
																									} else {
																										Swal.fire({
																											icon: 'error',
																											title: 'C?? l???i x???y ra',
																										});
																										setProgressCmt(false);
																									}
																								}
																							}
																						} else {
																							if (valueCmt === '') {
																								Swal.fire({
																									icon: 'error',
																									title: 'N???i dung kh??ng ????? tr???ng',
																								});
																							} else {
																								handleClickPageCmt(event);
																								setProgressCmt(true);
																								const response = await CreateFeedbackPost({
																									comment: valueCmt,
																									email: profileInfo.email,
																									id_comment: item.id_comment,
																								});
																								if (response) {
																									if (response.errorCode === null) {
																										Swal.fire({
																											icon: 'success',
																											title: 'G???i c??u h???i th??nh c??ng',
																										});
																										setRefreshCmt(refreshCmt + 1);
																										setProgressCmt(false);
																										setValueCmt('');
																										setIdCmt(0);
																									} else if (response.errorCode === 1) {
																										Swal.fire({
																											icon: 'error',
																											title: 'Email kh??ng ????ng ?????nh d???ng',
																										});
																										setProgressCmt(false);
																									} else {
																										Swal.fire({
																											icon: 'error',
																											title: 'C?? l???i x???y ra',
																										});
																										setProgressCmt(false);
																									}
																								}
																							}
																						}
																					}}
																				>
																					G???i c??u h???i
																				</Button>
																			</Box>
																		</Box>
																	</Collapse>
																</Box>
															</Box>
														</Box>
													);
												})}
												{dataComment.total > 5 && (
													<Box
														style={{
															display: 'flex',
															justifyContent: 'flex-end',
															marginTop: ' 30px',
														}}
													>
														<Pagination
															count={Math.ceil(dataComment.total / 5)}
															variant="outlined"
															color="primary"
															defaultPage={pageCmt}
															onClick={handleClickPageCmt}
															onChange={(event: object, page: number) => {
																setPageCmt(page);
															}}
														/>
													</Box>
												)}
											</React.Fragment>
										)}
									</Box>
								</Box>
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
							S???n ph???m g???i ??
						</Typography>

						<Slider {...settings}>
							{dataSameProduct?.map((item: any) => {
								return isResponseivePhone ? (
									<ProductCarousel
										unit_price={item[0].unit_price}
										name={item[0].name}
										id={item[0].id}
										promotion_price={item[0].promotion_price}
										link={item.image}
										avg={item.avg}
										promotion={item.promotion}
										rate_number={item.rate_number}
										storeQuantity={item[0].quantity}
										carouselOnclick={carouselOnclick}
									/>
								) : (
									<ProductCarouselPhone
										unit_price={item[0].unit_price}
										name={item[0].name}
										id={item[0].id}
										promotion_price={item[0].promotion_price}
										link={item.image}
										avg={item.avg}
										promotion={item.promotion}
										rate_number={item.rate_number}
										storeQuantity={item[0].quantity}
										carouselOnclick={carouselOnclick}
									/>
								);
							})}
						</Slider>
					</Grid>
					{dataProductRecommend.length > 0 && (
						<Grid item xs={12}>
							<Typography
								variant="h5"
								className={classes.titleText}
								gutterBottom
								style={{ marginTop: '10px' }}
							>
								S???n ph???m g???i ??
							</Typography>

							<Slider {...settings}>
								{dataProductRecommend?.map((item: any) => {
									return isResponseivePhone ? (
										<ProductCarousel
											unit_price={item[0].unit_price}
											name={item[0].name}
											id={item[0].id}
											promotion_price={item[0].promotion_price}
											link={item.image}
											avg={item.avg}
											promotion={item.promotion}
											rate_number={item.rate_number}
											storeQuantity={item[0].quantity}
											carouselOnclick={carouselOnclick}
										/>
									) : (
										<ProductCarouselPhone
											unit_price={item[0].unit_price}
											name={item[0].name}
											id={item[0].id}
											promotion_price={item[0].promotion_price}
											link={item.image}
											avg={item.avg}
											promotion={item.promotion}
											rate_number={item.rate_number}
											storeQuantity={item[0].quantity}
											carouselOnclick={carouselOnclick}
										/>
									);
								})}
							</Slider>
						</Grid>
					)}
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
