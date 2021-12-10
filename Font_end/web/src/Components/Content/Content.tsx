import {
	Avatar,
	Box,
	Chip,
	CircularProgress,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	MenuItem,
	MenuList,
	styled,
	Theme,
	Typography,
} from '@material-ui/core';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LaptopIcon from '@material-ui/icons/Laptop';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import HeadsetIcon from '@material-ui/icons/Headset';
import img1 from './../../public/images/830-300-830x300-5.png';
import img2 from './../../public/images/830-300-830x300-9.png';
import img3 from './../../public/images/fold3-830-300-830x300-4.png';
import img4 from './../../public/images/slider_6.jpg';
import img5 from './../../public/images/slider_7.jpg';
import sp1 from './../../public/images/10047676-dien-thoai-vsmart-aris-8gb-128gb-xam-nhat-thuc-1.jpg';
import sale from './../../public/images/evo_block_product_title_2.gif';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { relative } from 'path';
import { Rating } from '@material-ui/lab';
import {
	PhoneBrand,
	ProductFSalePost,
	NewProductRecommendPost,
	RecommendPost,
	SearchPhoneGet,
	SellProductPost,
	SellProductRecommendPost,
	TopProductPost,
} from '../../api/Product';
import { AppURL } from '../../utils/const';
import theme from './../../utils/theme/index';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import spsale from './../../public/images/4.png';
import ProductSale from './ProductSale';
import Slider from 'react-slick';
import ad1_1 from './../../public/images/feature_banner_1.jpg';
import ad1_2 from './../../public/images/feature_banner_2.png';
import ad2_1 from './../../public/images/feature_banner.jpg';
import jwtDecode from 'jwt-decode';
import NewsSmall from '../News/NewsSmall';
import { NewsGet } from '../../api/News';

import Product from '../Product/Product';
import { toast, ToastContainer } from 'react-toastify';
import {
	getValueRefreshPage,
	updateValueRefreshPage,
} from '../../features/refresh/RefreshPageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useMediaQuery } from 'react-responsive';
import ProductMobile from '../Product/ProductMobile';
import ProductPhone from '../Product/ProductPhone';
import { ListSlideGet } from '../../api/Slide';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: '30px',
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: '#d4d7d9',
		height: '10px',
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.primary.main,
		height: '10px',
	},
}));
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#f4f4f4',
	},
	bgHeaderMobile: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		backgroundColor: '#f4f4f4',
	},

	showBox: {
		display: 'block !important',
	},
	discount_percent: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
		marginRight: '10px',
		fontSize: '18px',
	},
	showBorder: {
		borderLeft: '0.5px solid #8c8c8c4f',
		borderRight: '0.5px solid #8c8c8c4f',
	},
	button: {},
	stylePhoneBrand: {
		textDecoration: 'none',
		color: 'black',
		fontWeight: 'bold',
		'&:hover': {
			color: '#ff6600',
		},
	},
	styleViewAll: {
		color: '#ff6600',
		textDecoration: 'none',
		'&:hover': {
			color: 'red',
		},
	},
	titles: {
		textDecoration: 'none',
		padding: '12px',
		fontSize: '19px',
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		position: 'relative',
		fontWeight: 'bold',
	},
	title: {
		position: 'absolute',
		backgroundColor: 'inherit',
		transform: `skew(${23}deg)`,
		padding: 'inherit',
		top: 0,
		left: '10%',
		zIndex: -1,
		display: 'inherit',
		height: '-webkit-fill-available',
		width: '-webkit-fill-available',
	},
	nameProduct: {
		textDecoration: 'none',
		color: 'black',
		'&:hover': {
			color: theme.palette.primary.main + ' !important',
		},
	},
	hoverProduct: {
		cursor: 'pointer',
		'&:hover': {
			boxShadow: `rgb(${0} ${0} ${0} / ${20}%) ${0}px ${3}px ${5}px ${-1}px, rgb(${0} ${0} ${0} / ${14}%) ${0}px ${5}px ${8}px ${0}px, rgb(${0} ${0} ${0} / ${12}%) ${0}px ${1}px ${14}px ${0}px`,
		},
	},

	borderTitle: {
		borderBottom: `4px solid ${theme.palette.primary.main}`,
		display: 'inline-flex',

		zIndex: 1,
	},
	tagLi: {
		width: 'inherit',
		float: 'left',
		cursor: 'pointer',
		paddingLeft: '12px',
		paddingRight: '12px',
		'&:hover': {
			borderLeft: '0.5px solid #8c8c8c4f',
			borderRight: '0.5px solid #8c8c8c4f',
		},
	},
}));
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
const Content: React.FC = () => {
	const classes = useStyles();
	const [hoverProduct, setHoverProduct] = React.useState(false);
	const onMouseOverProduct = () => {
		setHoverProduct(true);
	};
	const onMouseOutProduct = () => {
		setHoverProduct(false);
	};
	const [dataProductRecommend, setDataProductRecommend] = React.useState<any>([]);
	const [dataPhoneBrand, setDataPhoneBrand] = React.useState<any>([]);
	const [dataNews, setDataNews] = React.useState<any>({});
	const [dataProductSell, setDataProductSell] = React.useState<any>([]);
	const [dataProductNew, setDataProductNew] = React.useState<any>([]);
	const [dataPhoneSell, setDataPhoneSell] = React.useState<any>([]);
	const [dataProductFsale, setDataProductFsale] = React.useState<any>([]);
	const [dataSlide, setDataSlide] = React.useState<any>([]);
	const [progressProductNew, setProgressProductNew] = React.useState(false);
	const [dataTopProduct, setDataTopProduct] = React.useState<any>([]);
	const [progressTopProduct, setProgressTopProduct] = React.useState(false);
	const [progressProductSell, setProgressProductSell] = React.useState(false);
	const [progressPhoneSell, setProgressPhoneSell] = React.useState(false);
	const [progressProductFsale, setProgressProductFsale] = React.useState(false);
	const [progressProductRecommend, setProgressProductRecommend] = React.useState(false);
	const [progressNews, setProgressNews] = React.useState(false);
	const dispatch = useAppDispatch();
	const history = useHistory();
	const valueRefreshPage = useAppSelector(getValueRefreshPage);
	React.useEffect(() => {
		const fetchPhoneBrand = async () => {
			const getPhoneBrand = await PhoneBrand();
			if (getPhoneBrand) {
				if (getPhoneBrand.errorCode === null) {
					//console.log(getPhoneBrand);
					setDataPhoneBrand(getPhoneBrand.data);
				}
			}
			const responseDataSlide = await ListSlideGet();
			if (responseDataSlide) {
				if (responseDataSlide.errorCode === null) {
					setDataSlide(responseDataSlide.data);
				}
			}
			const getProductFSalePost = await ProductFSalePost({ page: 1, pageSize: 4, type: 'fsale' });
			if (getProductFSalePost) {
				if (getProductFSalePost.errorCode === null) {
					console.log('getProductFSalePost', getProductFSalePost);
					setDataProductFsale(getProductFSalePost.data.listData);
				}
			}
			setProgressPhoneSell(true);
			const responsePhoneSellPost = await SellProductPost({ page: 1, pageSize: 4 });
			if (responsePhoneSellPost) {
				if (responsePhoneSellPost.errorCode === null) {
					setDataPhoneSell(responsePhoneSellPost.data.listData);
					//console.log(responseNewsGet.data);
					setProgressPhoneSell(false);
				}
			}
			setProgressNews(true);
			const responseNewsGet = await NewsGet({ page: 1, pageSize: 9 });
			if (responseNewsGet) {
				if (responseNewsGet.errorCode === null) {
					setDataNews(responseNewsGet.data);
					//console.log(responseNewsGet.data);
					setProgressNews(false);
				}
			}
		};

		const getDataRecommend = async () => {
			setProgressProductRecommend(true);
			const token: any = window.localStorage.getItem('token');
			const date = Date.now();
			if (token) {
				const checkToken: any = jwtDecode(token);
				if (checkToken.exp < date / 1000) {
					localStorage.removeItem('token');
					dispatch(updateValueRefreshPage(true));
					setDataProductRecommend([]);
					setDataTopProduct([]);
					setProgressProductRecommend(false);
					setProgressTopProduct(false);
					setProgressProductNew(true);
					const responseProductNew = await NewProductRecommendPost({
						page: 1,
						pageSize: 4,
						type: 'new',
					});
					if (responseProductNew) {
						if (responseProductNew.errorCode === null) {
							setDataProductNew(responseProductNew.data.listData);
							//console.log(responseProductNew.data.listData);
							setProgressProductNew(false);
						}
					}
					setProgressProductSell(true);
					const responseProductSell = await SellProductRecommendPost({
						page: 1,
						pageSize: 4,
						type: 'sell',
					});
					if (responseProductSell) {
						if (responseProductSell.errorCode === null) {
							setDataProductSell(responseProductSell.data.listData);
							//console.log(responseProductSell.data.listData);
							setProgressProductSell(false);
						}
					}
				} else {
					const response = await RecommendPost({ page: 1, pageSize: 4 });
					if (response) {
						if (response.errorCode === null) {
							//dispatch(updateValueRefreshPage(true));
							setDataProductRecommend(response.data.listData);
							setProgressProductRecommend(false);
							setDataTopProduct([]);
							//dispatch(updateProfileUser(response.data));
						} else if (response.errorCode === 3) {
							const responseTopProduct = await TopProductPost({ page: 1, pageSize: 4 });
							if (responseTopProduct) {
								if (responseTopProduct.errorCode === null) {
									setDataTopProduct(responseTopProduct.data.listData);
									setProgressTopProduct(false);
								}
							}
						}
					}
				}
			} else {
				setDataProductRecommend([]);
				setProgressProductRecommend(false);
				setProgressProductNew(true);
				const responseProductNew = await NewProductRecommendPost({
					page: 1,
					pageSize: 4,
					type: 'new',
				});
				if (responseProductNew) {
					if (responseProductNew.errorCode === null) {
						setDataProductNew(responseProductNew.data.listData);
						//console.log(responseProductNew.data.listData);
						setProgressProductNew(false);
					}
				}
				setProgressProductSell(true);
				const responseProductSell = await SellProductRecommendPost({
					page: 1,
					pageSize: 4,
					type: 'sell',
				});
				if (responseProductSell) {
					if (responseProductSell.errorCode === null) {
						setDataProductSell(responseProductSell.data.listData);
						//console.log(responseProductSell.data.listData);
						setProgressProductSell(false);
					}
				}
			}
		};
		getDataRecommend();
		fetchPhoneBrand();
	}, [dispatch, valueRefreshPage]);

	const toURL = (str: string) => {
		str = str.toLowerCase();
		str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
		str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
		str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
		str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
		str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
		str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
		str = str.replace(/(đ)/g, 'd');
		str = str.replace(/([^0-9a-z-\s])/g, '');
		str = str.replace(/(\s+)/g, '-');
		str = str.replace(/^-+/g, '');
		str = str.replace(/-+$/g, '');
		return str;
	};
	const addToCart: (result: boolean) => void = (result) => {
		if (result) {
			toast.success('Đã thêm sản phẩm vào giỏ hàng');
		} else {
			toast.error('Không đủ số lượng');
		}
	};
	const [countSale, setCountSale] = React.useState(2);
	const isResponseiveFsale = useMediaQuery({ query: '(min-width: 800px)' });
	const settings = {
		//dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: isResponseiveFsale ? countSale : countSale - 1,
		//slidesToScroll: 3,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseiveProductMobile = useMediaQuery({ query: '(min-width: 1098px)' });
	const isResponseiveProduct1Mobile = useMediaQuery({ query: '(min-width: 780px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });

	return (
		<React.Fragment>
			{isResponseiveMobile ? (
				<Grid container className={classes.bgHeader}>
					{isResponseive ? (
						<React.Fragment>
							<Grid item xs={9} style={{ zIndex: 0 }}>
								<Carousel autoPlay infiniteLoop stopOnHover showThumbs={false}>
									{dataSlide?.map((item: any) => {
										return (
											<div
												style={{ cursor: 'pointer' }}
												onClick={() => {
													history.push(
														`/product_detail/${toURL(item.name_product)}-${item?.id_product}.html`
													);
												}}
											>
												<img src={`http://localhost:8000${item.image}`} />
											</div>
										);
									})}
								</Carousel>
							</Grid>
							<Grid item xs={3} style={{ paddingLeft: '8px' }}>
								<div>
									<img width="100%" src={img4} />
								</div>
								<div>
									<img width="100%" src={img5} />
								</div>
							</Grid>
						</React.Fragment>
					) : (
						<Grid item xs={12} style={{ zIndex: 0, marginTop: '25px' }}>
							<Carousel autoPlay infiniteLoop stopOnHover showThumbs={false}>
								{dataSlide?.map((item: any) => {
									return (
										<div
											style={{ cursor: 'pointer' }}
											onClick={() => {
												history.push(
													`/product_detail/${toURL(item.name_product)}-${item?.id_product}.html`
												);
											}}
										>
											<img src={`http://localhost:8000${item.image}`} />
										</div>
									);
								})}
							</Carousel>
						</Grid>
					)}
					{dataProductFsale.length > 0 && (
						<Grid item xs={12} style={{ marginTop: '30px', backgroundColor: '#fff' }}>
							<Box
								style={{ border: `3px solid ${theme.palette.primary.main}` }}
								pl={3}
								pr={3}
								pb={3}
							>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										marginTop: '30px',
										marginBottom: '13px',
									}}
								>
									<Typography
										variant="h4"
										component="span"
										style={{
											color: `${theme.palette.primary.main}`,
											fontStyle: 'italic',
											fontWeight: 'bold',
										}}
									>
										FLASH SALE
									</Typography>
									&nbsp;&nbsp;
									<img src={sale} />
									&nbsp;&nbsp;
									<Typography
										variant="h4"
										component="span"
										style={{
											color: `${theme.palette.primary.main}`,
											fontStyle: 'italic',
											fontWeight: 'bold',
										}}
									>
										HÔM NAY
									</Typography>
								</Box>

								<Slider {...settings}>
									{/* <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
						<Grid item xs={6}>
							<ProductSale />
						</Grid>
					</Grid> */}
									{dataProductFsale?.map((item: any) => {
										return (
											<ProductSale
												unit_price={item[0].unit_price}
												name={item[0].name}
												id={item[0].id}
												promotion_price={item[0].promotion_price}
												link={item.image}
												avg={item.avg}
												promotion={item.promotion}
												rate_number={item.rate_number}
												storeQuantity={item[0].quantity}
												timeout="29 Sep, 2022 20:35:00"
											/>
										);
									})}
									{/* <ProductSale /> */}
								</Slider>
							</Box>
						</Grid>
					)}
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<img width="100%" src={ad1_1} />
							</Grid>
							<Grid item xs={6}>
								<img width="100%" src={ad1_2} />
							</Grid>
						</Grid>
					</Grid>
					{dataProductRecommend.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12} className={classes.borderTitle}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={4}>
											<Link to={AppURL.RECOMMEND} className={classes.titles}>
												SẢN PHẨM GỢI Ý<div className={classes.title}></div>
											</Link>
										</Grid>
										<Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
									return (
										<Link
											to={`/views/${toURL(item.name)}-${item.id}`}
											className={classes.stylePhoneBrand}
										>
											<ListItem
												style={{
													padding: 0,
													fontWeight: 'bold',
													paddingRight: '10px',
													paddingLeft: '10px',
												}}
											>
												<Typography variant="body1" style={{ fontWeight: 500 }}>
													{item.name}
												</Typography>
											</ListItem>
										</Link>
									);
								})} */}
												<Link to={AppURL.RECOMMEND} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressProductRecommend ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseiveProductMobile ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductRecommend?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<Product
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductRecommend?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
					{dataTopProduct.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12} className={classes.borderTitle}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={4}>
											<Link to={AppURL.TOP_PRODUCT} className={classes.titles}>
												SẢN PHẨM ĐÁNH GIÁ CAO NHẤT<div className={classes.title}></div>
											</Link>
										</Grid>
										<Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
									return (
										<Link
											to={`/views/${toURL(item.name)}-${item.id}`}
											className={classes.stylePhoneBrand}
										>
											<ListItem
												style={{
													padding: 0,
													fontWeight: 'bold',
													paddingRight: '10px',
													paddingLeft: '10px',
												}}
											>
												<Typography variant="body1" style={{ fontWeight: 500 }}>
													{item.name}
												</Typography>
											</ListItem>
										</Link>
									);
								})} */}
												<Link to={AppURL.TOP_PRODUCT} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressTopProduct ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseiveProductMobile ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataTopProduct?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<Product
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataTopProduct?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
					{dataProductNew.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12} className={classes.borderTitle}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={4}>
											<Link to={AppURL.NEW_PRODUCT} className={classes.titles}>
												SẢN PHẨM MỚI NHẤT<div className={classes.title}></div>
											</Link>
										</Grid>
										<Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
									return (
										<Link
											to={`/views/${toURL(item.name)}-${item.id}`}
											className={classes.stylePhoneBrand}
										>
											<ListItem
												style={{
													padding: 0,
													fontWeight: 'bold',
													paddingRight: '10px',
													paddingLeft: '10px',
												}}
											>
												<Typography variant="body1" style={{ fontWeight: 500 }}>
													{item.name}
												</Typography>
											</ListItem>
										</Link>
									);
								})} */}
												<Link to={AppURL.NEW_PRODUCT} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressProductNew ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseiveProductMobile ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductNew?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<Product
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductNew?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
					{dataProductSell.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12} className={classes.borderTitle}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={4}>
											<Link to={AppURL.SELL_PRODUCT} className={classes.titles}>
												SẢN PHẨM BÁN CHẠY NHẤT<div className={classes.title}></div>
											</Link>
										</Grid>
										<Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
									return (
										<Link
											to={`/views/${toURL(item.name)}-${item.id}`}
											className={classes.stylePhoneBrand}
										>
											<ListItem
												style={{
													padding: 0,
													fontWeight: 'bold',
													paddingRight: '10px',
													paddingLeft: '10px',
												}}
											>
												<Typography variant="body1" style={{ fontWeight: 500 }}>
													{item.name}
												</Typography>
											</ListItem>
										</Link>
									);
								})} */}
												<Link to={AppURL.SELL_PRODUCT} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressProductSell ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseiveProductMobile ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductSell?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<Product
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductSell?.map((item: any) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}

					{/* <Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container>
							<Grid item xs={12} className={classes.borderTitle}>
								<Grid container style={{ alignItems: 'baseline' }}>
									<Grid item xs={4}>
										<Link to={AppURL.NEW_PHONE} className={classes.titles}>
											DIEN THOAI MOI NHAT<div className={classes.title}></div>
										</Link>
									</Grid>
									<Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
										<List style={{ display: 'flex' }}>
											{dataPhoneBrand?.listData?.map((item: any, index: number) => {
												return (
													<Link
														to={`/views/dien-thoai/${toURL(item.name)}-${item.id}`}
														className={classes.stylePhoneBrand}
													>
														<ListItem
															style={{
																padding: 0,
																fontWeight: 'bold',
																paddingRight: '10px',
																paddingLeft: '10px',
															}}
														>
															<Typography variant="body1" style={{ fontWeight: 500 }}>
																{item.name}
															</Typography>
														</ListItem>
													</Link>
												);
											})}
											<Link to={AppURL.NEW_PHONE} className={classes.styleViewAll}>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														Xem tất cả
													</Typography>
												</ListItem>
											</Link>
										</List>
									</Grid>
								</Grid>
							</Grid>
							{progressProductNew ? (
								<Grid
									item
									xs={12}
									style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
								>
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', left: '50%' }}
									/>
								</Grid>
							) : isResponseiveProductMobile ? (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataProductNew?.map((item: any) => {
										return (
											<Grid item md={4} lg={3} xl={3}>
												<Product
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataProductNew?.map((item: any) => {
										return (
											<Grid item md={4} lg={3} xl={3}>
												<ProductMobile
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid> */}

					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container>
							<Grid item xs={12} className={classes.borderTitle}>
								<Grid container style={{ alignItems: 'baseline' }}>
									<Grid item xs={4}>
										<Link to={AppURL.SELL_PHONE} className={classes.titles}>
											ĐIỆN THOẠI BÁN CHẠY NHẤT<div className={classes.title}></div>
										</Link>
									</Grid>
									<Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
										<List style={{ display: 'flex' }}>
											{dataPhoneBrand?.listData?.map((item: any, index: number) => {
												return (
													<Link
														to={`/views/dien-thoai/${toURL(item.name)}-${item.id}`}
														className={classes.stylePhoneBrand}
													>
														<ListItem
															style={{
																padding: 0,
																fontWeight: 'bold',
																paddingRight: '10px',
																paddingLeft: '10px',
															}}
														>
															<Typography variant="body1" style={{ fontWeight: 500 }}>
																{item.name}
															</Typography>
														</ListItem>
													</Link>
												);
											})}
											<Link to={AppURL.SELL_PHONE} className={classes.styleViewAll}>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														Xem tất cả
													</Typography>
												</ListItem>
											</Link>
										</List>
									</Grid>
								</Grid>
							</Grid>

							{progressPhoneSell ? (
								<Grid
									item
									xs={12}
									style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
								>
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', left: '50%' }}
									/>
								</Grid>
							) : isResponseiveProductMobile ? (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataPhoneSell?.map((item: any) => {
										return (
											<Grid item md={4} lg={3} xl={3}>
												<Product
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataPhoneSell?.map((item: any) => {
										return (
											<Grid item md={4} lg={3} xl={3}>
												<ProductMobile
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<img width="100%" src={ad2_1} />
					</Grid>
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container>
							<Grid item xs={12} className={classes.borderTitle}>
								<Grid container style={{ alignItems: 'baseline' }}>
									<Grid item xs={4}>
										<Link
											to={AppURL.NEWS}
											className={classes.titles}
											onClick={() => {
												window.scrollTo(0, 0);
											}}
										>
											24H CÔNG NGHỆ<div className={classes.title}></div>
										</Link>
									</Grid>
									<Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
										<List style={{ display: 'flex' }}>
											<Link
												to={AppURL.NEWS}
												className={classes.styleViewAll}
												onClick={() => {
													window.scrollTo(0, 0);
												}}
											>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														Xem tất cả
													</Typography>
												</ListItem>
											</Link>
										</List>
									</Grid>
								</Grid>
							</Grid>
							{progressNews ? (
								<Grid
									item
									xs={12}
									style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
								>
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', left: '50%' }}
									/>
								</Grid>
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataNews.listData?.map((item: any) => {
										return (
											<Grid item xs={4}>
												<NewsSmall
													title={item.title}
													image={item.image}
													id={item.id}
													created_at={item.created_at}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid>

					<Box style={{ position: 'fixed', left: 0, top: '40%' }}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<a title="Link youtube">
										<Avatar
											style={{
												backgroundColor: '#fff',
												border: '1px solid red',
												cursor: 'pointer',
											}}
										>
											<i className="fa fa-youtube" aria-hidden="true" style={{ color: 'red' }}></i>
										</Avatar>
									</a>
								</ListItemAvatar>
							</ListItem>
							<ListItem>
								<ListItemAvatar>
									<a title="Lick facebook">
										<Avatar
											style={{
												backgroundColor: '#fff',
												border: '1px solid #0278ad',
												cursor: 'pointer',
											}}
										>
											<i
												className="fa fa-facebook"
												aria-hidden="true"
												style={{ color: '#0278ad' }}
											></i>
										</Avatar>
									</a>
								</ListItemAvatar>
							</ListItem>
						</List>
					</Box>
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
						<React.Fragment>
							<Grid item xs={9} style={{ zIndex: 0 }}>
								<Carousel autoPlay infiniteLoop stopOnHover showThumbs={false}>
									{dataSlide?.map((item: any) => {
										return (
											<div
												style={{ cursor: 'pointer' }}
												onClick={() => {
													history.push(
														`/product_detail/${toURL(item.name_product)}-${item?.id_product}.html`
													);
												}}
											>
												<img src={`http://localhost:8000${item.image}`} />
											</div>
										);
									})}
								</Carousel>
							</Grid>
							<Grid item xs={3} style={{ paddingLeft: '8px' }}>
								<div>
									<img width="100%" src={img4} />
								</div>
								<div>
									<img width="100%" src={img5} />
								</div>
							</Grid>
						</React.Fragment>
					) : (
						<Grid item xs={12} style={{ zIndex: 0, marginTop: '25px' }}>
							<Carousel autoPlay infiniteLoop stopOnHover showThumbs={false}>
								{dataSlide?.map((item: any) => {
									return (
										<div
											style={{ cursor: 'pointer' }}
											onClick={() => {
												history.push(
													`/product_detail/${toURL(item.name_product)}-${item?.id_product}.html`
												);
											}}
										>
											<img src={`http://localhost:8000${item.image}`} />
										</div>
									);
								})}
							</Carousel>
						</Grid>
					)}
					{dataProductFsale.length > 0 && (
						<Grid item xs={12} style={{ marginTop: '30px', backgroundColor: '#fff' }}>
							<Box
								style={{ border: `3px solid ${theme.palette.primary.main}` }}
								pl={3}
								pr={3}
								pb={3}
							>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										marginTop: '30px',
										marginBottom: '13px',
									}}
								>
									<Typography
										variant="h4"
										component="span"
										style={{
											color: `${theme.palette.primary.main}`,
											fontStyle: 'italic',
											fontWeight: 'bold',
										}}
									>
										FLASH SALE
									</Typography>
									&nbsp;&nbsp;
									<img src={sale} />
									&nbsp;&nbsp;
									<Typography
										variant="h4"
										component="span"
										style={{
											color: `${theme.palette.primary.main}`,
											fontStyle: 'italic',
											fontWeight: 'bold',
										}}
									>
										HÔM NAY
									</Typography>
								</Box>

								<Slider {...settings}>
									{/* <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
							<Grid item xs={6}>
								<ProductSale />
							</Grid>
						</Grid> */}
									{dataProductFsale?.map((item: any) => {
										return (
											<ProductSale
												unit_price={item[0].unit_price}
												name={item[0].name}
												id={item[0].id}
												promotion_price={item[0].promotion_price}
												link={item.image}
												avg={item.avg}
												promotion={item.promotion}
												rate_number={item.rate_number}
												storeQuantity={item[0].quantity}
												timeout="29 Sep, 2021 20:35:00"
											/>
										);
									})}
									{/* <ProductSale /> */}
								</Slider>
							</Box>
						</Grid>
					)}
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<img width="100%" src={ad1_1} />
							</Grid>
							<Grid item xs={6}>
								<img width="100%" src={ad1_2} />
							</Grid>
						</Grid>
					</Grid>
					{dataProductRecommend.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={12} style={{ display: 'inline-grid', textAlign: 'center' }}>
											<Link to={AppURL.RECOMMEND} className={classes.titles}>
												SẢN PHẨM GỢI Ý
											</Link>
										</Grid>
										<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
										return (
											<Link
												to={`/views/${toURL(item.name)}-${item.id}`}
												className={classes.stylePhoneBrand}
											>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														{item.name}
													</Typography>
												</ListItem>
											</Link>
										);
									})} */}
												<Link to={AppURL.RECOMMEND} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressProductRecommend ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseivePhone ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductRecommend?.map((item: any) => {
											return isResponseiveProduct1Mobile ? (
												<Grid item xs={6} md={3} sm={4}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											) : (
												<Grid item xs={6} sm={6}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductRecommend?.map((item: any) => {
											return (
												<Grid item xs={6}>
													<ProductPhone
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
					{dataTopProduct.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={12} style={{ display: 'inline-grid', textAlign: 'center' }}>
											<Link to={AppURL.TOP_PRODUCT} className={classes.titles}>
												SẢN PHẨM ĐÁNH GIÁ CAO NHẤT
											</Link>
										</Grid>
										<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
										return (
											<Link
												to={`/views/${toURL(item.name)}-${item.id}`}
												className={classes.stylePhoneBrand}
											>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														{item.name}
													</Typography>
												</ListItem>
											</Link>
										);
									})} */}
												<Link to={AppURL.TOP_PRODUCT} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressTopProduct ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseivePhone ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataTopProduct?.map((item: any) => {
											return isResponseiveProduct1Mobile ? (
												<Grid item xs={6} md={3} sm={4}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											) : (
												<Grid item xs={6} sm={6}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataTopProduct?.map((item: any) => {
											return (
												<Grid item xs={6}>
													<ProductPhone
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
					{dataProductNew.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={12} style={{ display: 'inline-grid', textAlign: 'center' }}>
											<Link to={AppURL.NEW_PRODUCT} className={classes.titles}>
												SẢN PHẨM MỚI NHẤT
											</Link>
										</Grid>
										<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
										return (
											<Link
												to={`/views/${toURL(item.name)}-${item.id}`}
												className={classes.stylePhoneBrand}
											>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														{item.name}
													</Typography>
												</ListItem>
											</Link>
										);
									})} */}
												<Link to={AppURL.NEW_PRODUCT} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressProductNew ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseivePhone ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductNew?.map((item: any) => {
											return isResponseiveProduct1Mobile ? (
												<Grid item xs={6} md={3} sm={4}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											) : (
												<Grid item xs={6} sm={6}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductNew?.map((item: any) => {
											return (
												<Grid item xs={6}>
													<ProductPhone
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
					{dataProductSell.length > 0 && (
						<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
							<Grid container>
								<Grid item xs={12}>
									<Grid container style={{ alignItems: 'baseline' }}>
										<Grid item xs={12} style={{ display: 'inline-grid', textAlign: 'center' }}>
											<Link to={AppURL.SELL_PRODUCT} className={classes.titles}>
												SẢN PHẨM BÁN CHẠY NHẤT
											</Link>
										</Grid>
										<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<List style={{ display: 'flex' }}>
												{/* {dataPhoneBrand?.listData?.map((item: any, index: number) => {
										return (
											<Link
												to={`/views/${toURL(item.name)}-${item.id}`}
												className={classes.stylePhoneBrand}
											>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														{item.name}
													</Typography>
												</ListItem>
											</Link>
										);
									})} */}
												<Link to={AppURL.SELL_PRODUCT} className={classes.styleViewAll}>
													<ListItem
														style={{
															padding: 0,
															fontWeight: 'bold',
															paddingRight: '10px',
															paddingLeft: '10px',
														}}
													>
														<Typography variant="body1" style={{ fontWeight: 500 }}>
															Xem tất cả
														</Typography>
													</ListItem>
												</Link>
											</List>
										</Grid>
									</Grid>
								</Grid>
								{progressProductSell ? (
									<Grid
										item
										xs={12}
										style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
									>
										<CircularProgress
											color="secondary"
											style={{ position: 'absolute', left: '50%' }}
										/>
									</Grid>
								) : isResponseivePhone ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductSell?.map((item: any) => {
											return isResponseiveProduct1Mobile ? (
												<Grid item xs={6} md={3} sm={4}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											) : (
												<Grid item xs={6} sm={6}>
													<ProductMobile
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								) : (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataProductSell?.map((item: any) => {
											return (
												<Grid item xs={6}>
													<ProductPhone
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
							</Grid>
						</Grid>
					)}
					{/* <Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container>
							<Grid item xs={12}>
								<Grid container style={{ alignItems: 'baseline' }}>
									<Grid item xs={12} style={{ display: 'inline-grid', textAlign: 'center' }}>
										<Link to={AppURL.NEW_PHONE} className={classes.titles}>
											DIEN THOAI MOI NHAT
										</Link>
									</Grid>
									<Grid item xs={12} style={{ display: 'inline-grid', overflowY: 'hidden' }}>
										<List style={{ display: 'flex', width: 'max-content' }}>
											{dataPhoneBrand?.listData?.map((item: any, index: number) => {
												return (
													<Link
														to={`/views/dien-thoai/${toURL(item.name)}-${item.id}`}
														className={classes.stylePhoneBrand}
													>
														<ListItem
															style={{
																padding: 0,
																fontWeight: 'bold',
																paddingRight: '10px',
																paddingLeft: '10px',
															}}
														>
															<Typography variant="body1" style={{ fontWeight: 500 }}>
																{item.name}
															</Typography>
														</ListItem>
													</Link>
												);
											})}
											<Link to={AppURL.NEW_PHONE} className={classes.styleViewAll}>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														Xem tất cả
													</Typography>
												</ListItem>
											</Link>
										</List>
									</Grid>
								</Grid>
							</Grid>
							{progressProductNew ? (
								<Grid
									item
									xs={12}
									style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
								>
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', left: '50%' }}
									/>
								</Grid>
							) : isResponseivePhone ? (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataProductNew?.map((item: any) => {
										return isResponseiveProduct1Mobile ? (
											<Grid item xs={6} md={3} sm={4}>
												<ProductMobile
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										) : (
											<Grid item xs={6} sm={6}>
												<ProductMobile
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataProductNew?.map((item: any) => {
										return (
											<Grid item xs={6}>
												<ProductPhone
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid> */}
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container>
							<Grid item xs={12}>
								<Grid container style={{ alignItems: 'baseline' }}>
									<Grid item xs={12} style={{ display: 'inline-grid', textAlign: 'center' }}>
										<Link to={AppURL.SELL_PHONE} className={classes.titles}>
											ĐIỆN THOẠI BÁN CHẠY
										</Link>
									</Grid>
									<Grid item xs={12} style={{ display: 'inline-grid', overflowY: 'hidden' }}>
										<List style={{ display: 'flex', width: 'max-content' }}>
											{dataPhoneBrand?.listData?.map((item: any, index: number) => {
												return (
													<Link
														to={`/views/dien-thoai/${toURL(item.name)}-${item.id}`}
														className={classes.stylePhoneBrand}
													>
														<ListItem
															style={{
																padding: 0,
																fontWeight: 'bold',
																paddingRight: '10px',
																paddingLeft: '10px',
															}}
														>
															<Typography variant="body1" style={{ fontWeight: 500 }}>
																{item.name}
															</Typography>
														</ListItem>
													</Link>
												);
											})}
											<Link to={AppURL.SELL_PHONE} className={classes.styleViewAll}>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														Xem tất cả
													</Typography>
												</ListItem>
											</Link>
										</List>
									</Grid>
								</Grid>
							</Grid>
							{progressProductSell ? (
								<Grid
									item
									xs={12}
									style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
								>
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', left: '50%' }}
									/>
								</Grid>
							) : isResponseivePhone ? (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataProductSell?.map((item: any) => {
										return isResponseiveProduct1Mobile ? (
											<Grid item xs={6} md={3} sm={4}>
												<ProductMobile
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										) : (
											<Grid item xs={6} sm={6}>
												<ProductMobile
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataProductSell?.map((item: any) => {
										return (
											<Grid item xs={6}>
												<ProductPhone
													unit_price={item[0].unit_price}
													name={item[0].name}
													id={item[0].id}
													promotion_price={item[0].promotion_price}
													link={item.image}
													avg={item.avg}
													promotion={item.promotion}
													rate_number={item.rate_number}
													storeQuantity={item[0].quantity}
													addToCart={addToCart}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<img width="100%" src={ad2_1} />
					</Grid>
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginTop: '30px' }}>
						<Grid container>
							<Grid item xs={12}>
								<Grid container style={{ alignItems: 'baseline' }}>
									<Grid item xs={12} style={{ display: 'inline-grid', textAlign: 'center' }}>
										<Link
											to={AppURL.NEWS}
											className={classes.titles}
											onClick={() => {
												window.scrollTo(0, 0);
											}}
										>
											24H CÔNG NGHỆ
										</Link>
									</Grid>
									<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
										<List style={{ display: 'flex' }}>
											<Link
												to={AppURL.NEWS}
												className={classes.styleViewAll}
												onClick={() => {
													window.scrollTo(0, 0);
												}}
											>
												<ListItem
													style={{
														padding: 0,
														fontWeight: 'bold',
														paddingRight: '10px',
														paddingLeft: '10px',
													}}
												>
													<Typography variant="body1" style={{ fontWeight: 500 }}>
														Xem tất cả
													</Typography>
												</ListItem>
											</Link>
										</List>
									</Grid>
								</Grid>
							</Grid>
							{progressNews ? (
								<Grid
									item
									xs={12}
									style={{ position: 'relative', marginBottom: '50px', marginTop: '40px' }}
								>
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', left: '50%' }}
									/>
								</Grid>
							) : isResponseivePhone ? (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataNews.listData?.map((item: any) => {
										return (
											<Grid item xs={6} sm={6} md={4} lg={4}>
												<NewsSmall
													title={item.title}
													image={item.image}
													id={item.id}
													created_at={item.created_at}
												/>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataNews.listData?.map((item: any) => {
										return (
											<Grid item xs={12}>
												<NewsSmall
													title={item.title}
													image={item.image}
													id={item.id}
													created_at={item.created_at}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid>

					{isResponseiveMobile && (
						<Box style={{ position: 'fixed', left: 0, top: '40%' }}>
							<List>
								<ListItem>
									<ListItemAvatar>
										<a title="Link youtube">
											<Avatar
												style={{
													backgroundColor: '#fff',
													border: '1px solid red',
													cursor: 'pointer',
												}}
											>
												<i
													className="fa fa-youtube"
													aria-hidden="true"
													style={{ color: 'red' }}
												></i>
											</Avatar>
										</a>
									</ListItemAvatar>
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<a title="Lick facebook">
											<Avatar
												style={{
													backgroundColor: '#fff',
													border: '1px solid #0278ad',
													cursor: 'pointer',
												}}
											>
												<i
													className="fa fa-facebook"
													aria-hidden="true"
													style={{ color: '#0278ad' }}
												></i>
											</Avatar>
										</a>
									</ListItemAvatar>
								</ListItem>
							</List>
						</Box>
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
			)}
		</React.Fragment>
	);
};
export default Content;
