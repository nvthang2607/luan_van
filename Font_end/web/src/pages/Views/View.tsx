import {
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Popover,
	Typography,
} from '@material-ui/core';
import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import Product from '../../Components/Product/Product';
import {
	FilterPost,
	ProductNewPost,
	ProductSellPost,
	RecommendPost,
	SearchPhoneGet,
} from '../../api/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getValueRefreshPage } from '../../features/refresh/RefreshPageSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import { getDataFilter, updateDataFilter } from './FilterSlice';
import { ShowChart } from '@material-ui/icons';
import { AppURL } from '../../utils/const';
import jwtDecode from 'jwt-decode';
import { useMediaQuery } from 'react-responsive';
import ProductMobile from '../../Components/Product/ProductMobile';
import ProductPhone from '../../Components/Product/ProductPhone';
interface ViewProps {
	name?: string;
}
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),

		marginTop: '20px',
		// marginBottom: '10px',
	},
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	showBox: {
		display: 'block !important',
	},
	stylePriceAbout: {
		border: '1px solid red',
	},
	bgHeaderMobile: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		backgroundColor: '#f4f4f4',
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
const View: React.FC<ViewProps> = (props) => {
	const classes = useStyles();
	const [anchorElSort, setAnchorElSort] = React.useState<HTMLButtonElement | null>(null);

	const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElSort(event.currentTarget);
	};

	const handleCloseSort = () => {
		setAnchorElSort(null);
	};

	const openSort = Boolean(anchorElSort);
	const idSort = openSort ? 'simple-popover' : undefined;
	const [anchorElPrice, setAnchorElPrice] = React.useState<HTMLButtonElement | null>(null);

	const handleClickPrice = (event: any) => {
		setAnchorElPrice(event.currentTarget);
	};

	const handleClosePrice = () => {
		setAnchorElPrice(null);
	};

	const openPrice = Boolean(anchorElPrice);
	const idPrice = openPrice ? 'simple-popover' : undefined;
	const history = useHistory();

	const [typeSearch, setTypeSearch] = React.useState('product');
	const searchParams = new URLSearchParams(window.location.search);
	const dispatch = useAppDispatch();
	const [dataSearch, setDataSearch] = React.useState<any>({});

	const valueRefreshPage = useAppSelector(getValueRefreshPage);
	const [page, setPage] = React.useState(1);
	const [progress, setProgress] = React.useState(false);
	const [dataFilter, setDataFilter] = React.useState<any>({});
	const [priceAbout1_3, setPriceAbout1_3] = React.useState(false);
	const [priceAbout3_5, setPriceAbout3_5] = React.useState(false);
	const [priceAbout5_7, setPriceAbout5_7] = React.useState(false);
	const [priceAboutTren7, setPriceAboutTren7] = React.useState(false);
	const [redirect, setRedirect] = React.useState(false);
	const { phoneBrandId } = useParams<{ phoneBrandId?: string }>();
	React.useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has('filter')) {
			if (searchParams.get('filter')?.indexOf('1000000-3000000') !== -1) {
				setPriceAbout1_3(true);
			}
			if (searchParams.get('filter')?.indexOf('3000000-5000000') !== -1) {
				setPriceAbout3_5(true);
			}
			if (searchParams.get('filter')?.indexOf('5000000-7000000') !== -1) {
				setPriceAbout5_7(true);
			}
			if (searchParams.get('filter')?.indexOf('tren7trieu') !== -1) {
				setPriceAboutTren7(true);
			}
		}
	}, []);

	// const getValueFilter = () => {
	// 	if (priceAbout1_3) {
	// 		valueFilter.push('1000000-3000000');
	// 	}
	// 	if (priceAbout3_5) {
	// 		valueFilter.push('3000000-5000000');
	// 	}
	// 	if (priceAbout5_7) {
	// 		valueFilter.push('5000000-7000000');
	// 	}
	// 	if (priceAboutTren7) {
	// 		valueFilter.push('>7000000');
	// 	}
	// };
	// getValueFilter();

	const [option, setOpion] = React.useState(searchParams.get('sortBy'));
	console.log(window.location.pathname);

	React.useEffect(() => {
		setProgress(true);
		window.scrollTo(0, 0);
		const searchParams = new URLSearchParams(window.location.search);

		if (searchParams.has('type')) {
			searchParams.get('type') === 'news' ? setTypeSearch('news') : setTypeSearch('product');
			//console.log(searchParams.get('type'));
		}
		if (searchParams.has('page')) {
			setPage(Number(searchParams?.get('page')));
		} else {
			setPage(1);
		}
		// const fetchSearch = async () => {
		// 	const searchParams = new URLSearchParams(window.location.search);
		// 	//console.log('page', );

		// 	const getSearch = await SearchPhoneGet({
		// 		page: page,
		// 		pageSize: 24,
		// 		search: 'điện thoại',
		// 		type: 'product',
		// 	});
		// 	if (getSearch) {
		// 		if (getSearch.errorCode === null) {
		// 			console.log(getSearch);

		// 			setDataSearch(getSearch.data);
		// 			setProgress(false);
		// 		}
		// 	}
		// };
		// fetchSearch();
		const valueFilter: Array<any> = [];
		if (priceAbout1_3) {
			valueFilter.push('1000000-3000000');
		}
		if (priceAbout3_5) {
			valueFilter.push('3000000-5000000');
		}
		if (priceAbout5_7) {
			valueFilter.push('5000000-7000000');
		}
		if (priceAboutTren7) {
			valueFilter.push('>7000000');
		}
		if (props.name === AppURL.RECOMMEND) {
			const token: any = window.localStorage.getItem('token');
			const date = Date.now();
			if (window.localStorage.getItem('token')) {
				const checkToken: any = jwtDecode(token);
				if (checkToken.exp < date / 1000) {
					localStorage.removeItem('token');
					setRedirect(true);
				} else {
					const fetchRecommend = async () => {
						const getDataRecommend = await RecommendPost({
							page: page,
							pageSize: 24,
						});
						if (getDataRecommend) {
							if (getDataRecommend.errorCode === null) {
								console.log(getDataRecommend);
								setDataFilter(getDataRecommend.data);
								setProgress(false);
							}
						}
					};
					fetchRecommend();
				}
			} else {
				setRedirect(true);
			}
		} else if (props.name === AppURL.NEW_PHONE) {
			const fetchSellPhone = async () => {
				const getDataSellPhone = await ProductNewPost({
					page: page,
					pageSize: 24,
					type: 'new',
				});
				if (getDataSellPhone) {
					if (getDataSellPhone.errorCode === null) {
						console.log(getDataSellPhone);
						setDataFilter(getDataSellPhone.data);
						//dispatch(updateDataFilter(getDataFilter.data));
						setProgress(false);
					}
				}
			};
			fetchSellPhone();
		} else if (props.name === AppURL.SELL_PHONE) {
			const fetchSellPhone = async () => {
				const getDataSellPhone = await ProductSellPost({
					page: page,
					pageSize: 24,
					type: 'sell',
				});
				if (getDataSellPhone) {
					if (getDataSellPhone.errorCode === null) {
						console.log(getDataSellPhone);
						setDataFilter(getDataSellPhone.data);
						//dispatch(updateDataFilter(getDataFilter.data));
						setProgress(false);
					}
				}
			};
			fetchSellPhone();
		} else {
			const fetchFilter = async () => {
				const getDataFilter = await FilterPost({
					page: page,
					pageSize: 24,
					type: 'brand',
					id: phoneBrandId,
					piceAbout: valueFilter,
				});
				if (getDataFilter) {
					if (getDataFilter.errorCode === null) {
						console.log(getDataFilter);
						setDataFilter(getDataFilter.data);
						//dispatch(updateDataFilter(getDataFilter.data));
						setProgress(false);
					}
				}
			};
			fetchFilter();
		}
	}, [
		valueRefreshPage.value,
		page,
		phoneBrandId,
		priceAbout1_3,
		priceAbout3_5,
		priceAbout5_7,
		priceAboutTren7,
		props.name,
	]);

	const handleSortBy = (name: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		if (name === 'nameASC') {
			dataFilter.listData.sort((a: any, b: any) => {
				if (a[0].name > b[0].name) return -1;
				else if (a[0].name < b[0].name) return 1;
				else return 0;
			});
		} else if (name === 'nameDESC') {
			dataFilter.listData.sort((a: any, b: any) => {
				if (a[0].name > b[0].name) return 1;
				else if (a[0].name < b[0].name) return -1;
				else return 0;
			});
		} else if (name === 'priceASC') {
			dataFilter.listData.sort((a: any, b: any) => {
				if (a[0].promotion_price > b[0].promotion_price) return -1;
				else if (a[0].promotion_price < b[0].promotion_price) return 1;
				else return 0;
			});
		} else if (name === 'priceDESC') {
			dataFilter.listData.sort((a: any, b: any) => {
				if (a[0].promotion_price > b[0].promotion_price) return 1;
				else if (a[0].promotion_price < b[0].promotion_price) return -1;
				else return 0;
			});
		}
		let pathName = `sortBy=${name}`;
		if (searchParams.has('page')) {
			const valuePage = searchParams.get('page');
			pathName = `page=${valuePage}&sortBy=${name}`;
		}
		if (searchParams.has('filter')) {
			const valueFilter = searchParams.get('filter');
			pathName = `sortBy=${name}&filter=${valueFilter}`;
		}
		if (searchParams.has('page') && searchParams.has('filter')) {
			const valuePage = searchParams.get('page');
			const valueFilter = searchParams.get('filter');
			pathName = `page=${valuePage}&sortBy=${name}&filter=${valueFilter}`;
		}
		setOpion(name);
		setAnchorElSort(null);

		history.replace({
			pathname: window.location.pathname,
			search: pathName,
		});
	};

	const handlePriceAbout = (value: string, name: string) => {
		setAnchorElPrice(null);
		const searchParams = new URLSearchParams(window.location.search);

		let nameFilter = '';
		let pathName = `filter=${nameFilter}`;
		if (searchParams.has('filter')) {
			if (window.location.search.indexOf(name) !== -1) {
				const string = `${searchParams.get('filter')}`;
				let string1 = string.slice(0, string.indexOf(name));
				if (string1.lastIndexOf('or') === string1.length - 2) {
					string1 = string1.slice(0, string1.length - 2);
				}
				if (string1.indexOf('or') === 0) {
					string1 = string1.slice(2, string1.length);
				}

				let string2 = string.slice(string.indexOf(name) + name.length, string.length);

				if (string2.lastIndexOf('or') === string2.length - 2) {
					string2 = string2.slice(0, string2.length - 2);
				}

				if (string2.indexOf('or') === 0) {
					string2 = string2.slice(2, string2.length);
				}
				if (string1.length > 0 && string2.length > 0) {
					nameFilter = string1 + 'or' + string2;
					pathName = `filter=${nameFilter}`;
					//console.log(string1 + 'or' + string2);
				} else {
					nameFilter = string1 + string2;
					pathName = `filter=${nameFilter}`;
				}
			} else {
				nameFilter = `${searchParams.get('filter')}or${name}`;
				pathName = `filter=${nameFilter}`;
			}
		} else {
			nameFilter = `${name}`;
			pathName = `filter=${nameFilter}`;
		}

		// if (searchParams.has('page')) {
		// 	pathName = `page=${searchParams.get('page')}&filter=${nameFilter}`;
		// }
		if (searchParams.has('sortBy')) {
			pathName = `sortBy=${searchParams.get('sortBy')}&filter=${nameFilter}`;
		}
		// if (searchParams.has('page') && searchParams.has('sortBy')) {
		// 	pathName = `page=${searchParams.get('page')}&sortBy=${searchParams.get(
		// 		'sortBy'
		// 	)}&filter=${nameFilter}`;
		// }

		if (value === '1_3') {
			if (priceAbout1_3) {
				setPriceAbout1_3(false);
			} else {
				setPriceAbout1_3(true);
			}
		} else if (value === '3_5') {
			if (priceAbout3_5) {
				setPriceAbout3_5(false);
			} else {
				setPriceAbout3_5(true);
			}
		} else if (value === '5_7') {
			if (priceAbout5_7) {
				setPriceAbout5_7(false);
			} else {
				setPriceAbout5_7(true);
			}
		} else if (value === '7_') {
			if (priceAboutTren7) {
				setPriceAboutTren7(false);
			} else {
				setPriceAboutTren7(true);
			}
		}
		history.replace({
			pathname: window.location.pathname,
			search: pathName,
		});
	};
	const addToCart: (result: boolean) => void = (result) => {
		if (result) {
			toast.success('Da them san pham vao gio hang');
		} else {
			toast.error('ko du so luong');
		}
	};
	const ShowFilter = (element: any) => {
		if (props.name === AppURL.VIEWS_PHONE) return element;
		else
			return (
				<Grid item xs={12} style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
					<Box>
						<List>
							<ListItem style={{ display: 'contents' }}>
								{!progress && (
									<Box style={{ float: 'left', marginLeft: '16px' }}>
										{/* <Typography variant="body1" style={{ fontWeight: 'bold' }}>
							 san pham duoc tim thay
						</Typography> */}
										<Typography variant="h6" style={{ display: 'contents' }}>
											<Typography variant="h6" style={{ fontWeight: 'bold', display: 'contents' }}>
												{dataFilter.totalCount}
											</Typography>
											&nbsp;san pham duoc tim thay
										</Typography>
									</Box>
								)}
							</ListItem>
						</List>
					</Box>
				</Grid>
			);
	};
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseiveProductMobile = useMediaQuery({ query: '(min-width: 1098px)' });
	const isResponseiveProduct1Mobile = useMediaQuery({ query: '(min-width: 780px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	return isResponseiveMobile ? (
		<Grid container className={classes.bgHeader}>
			{redirect && <Redirect to={AppURL.ACCOUNT} />}
			<React.Fragment>
				{isResponseive ? (
					<Grid item xs={9} style={{ position: 'absolute', top: '93px', left: '362px' }}>
						<Breadcrumbs aria-label="breadcrumb">
							<Link to="/" className={classes.link}>
								<HomeIcon className={classes.icon} />
								Trang chu
							</Link>
							<Link to="/" className={classes.link}>
								Ket qua tim kiem
							</Link>
						</Breadcrumbs>
					</Grid>
				) : (
					<Grid item xs={12} style={{ marginTop: '20px' }}>
						<Breadcrumbs aria-label="breadcrumb">
							<Link to="/" className={classes.link}>
								<HomeIcon className={classes.icon} />
								Trang chu
							</Link>
							<Link to="/" className={classes.link}>
								Ket qua tim kiem
							</Link>
						</Breadcrumbs>
					</Grid>
				)}
				{(priceAbout1_3 || priceAbout3_5 || priceAbout5_7 || priceAboutTren7) && (
					<Grid item xs={12} style={{ display: 'inline-grid', overflowY: 'hidden' }}>
						<Box boxShadow={1} mt={2}>
							<List style={{ width: 'max-content' }}>
								<ListItem>
									{priceAbout1_3 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#0099e5',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('1_3', '1000000-3000000')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;1.000.000d -
											3.000.000d
										</Button>
									)}
									{priceAbout3_5 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#34bf49',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('3_5', '3000000-5000000')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;3.000.000d -
											5.000.000d
										</Button>
									)}
									{priceAbout5_7 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#fbb034',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('5_7', '5000000-7000000')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;5.000.000d -
											7.000.000d
										</Button>
									)}
									{priceAboutTren7 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#da1884',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('7_', 'tren7trieu')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Tren 7 trieu
										</Button>
									)}

									<Button
										variant="contained"
										style={{
											backgroundColor: '#ff0000',
											color: '#fff',
											textTransform: 'inherit',
										}}
										onClick={() => {
											setPriceAbout1_3(false);
											setPriceAbout3_5(false);
											setPriceAbout5_7(false);
											setPriceAboutTren7(false);
											history.replace({
												pathname: (window.location.pathname + window.location.search).slice(
													0,
													(window.location.pathname + window.location.search).lastIndexOf('filter')
												),
											});
										}}
									>
										<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Bo het
									</Button>
								</ListItem>
							</List>
						</Box>
					</Grid>
				)}
				{ShowFilter(
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
						<Box>
							<List>
								<ListItem>
									<Card
										variant="outlined"
										style={{
											padding: '10px',
											display: 'flex',
											cursor: 'pointer',
											alignItems: 'center',
										}}
									>
										<i className="fa fa-filter" aria-hidden="true"></i>&nbsp;
										<Typography variant="body1">Bo loc</Typography>
									</Card>
									&nbsp;&nbsp;
									<Card
										variant="outlined"
										style={{ padding: '10px', display: 'flex', cursor: 'pointer' }}
										onClick={handleClickPrice}
									>
										<Typography variant="body1">Gia san pham</Typography>

										<ArrowDropDownIcon />
									</Card>
									<Popover
										id={idPrice}
										open={openPrice}
										anchorEl={anchorElPrice}
										onClose={handleClosePrice}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
									>
										<List>
											<ListItem>
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('1_3', '1000000-3000000')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAbout1_3,
													})}
												>
													1.000.000d - 3.000.000d
												</Button>
												&nbsp;&nbsp;
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('3_5', '3000000-5000000')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAbout3_5,
													})}
												>
													3.000.000d - 5.000.000d
												</Button>
											</ListItem>
											<ListItem>
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('5_7', '5000000-7000000')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAbout5_7,
													})}
												>
													5.000.000d - 7.000.000d
												</Button>
												&nbsp;&nbsp;
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('7_', 'tren7trieu')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAboutTren7,
													})}
												>
													Tren 7 trieu
												</Button>
											</ListItem>
										</List>
									</Popover>
								</ListItem>
								<ListItem style={{ display: 'contents' }}>
									{!progress && (
										<Box style={{ float: 'left', marginLeft: '16px' }}>
											{/* <Typography variant="body1" style={{ fontWeight: 'bold' }}>
										 san pham duoc tim thay
									</Typography> */}
											<Typography variant="h6" style={{ display: 'contents' }}>
												<Typography
													variant="h6"
													style={{ fontWeight: 'bold', display: 'contents' }}
												>
													{dataFilter.totalCount}
												</Typography>
												&nbsp;san pham duoc tim thay
											</Typography>
										</Box>
									)}
									<Box
										style={{
											float: 'right',
											display: 'flex',
											alignItems: 'center',
											cursor: 'pointer',
											paddingRight: '20px',
										}}
										aria-describedby={idSort}
										onClick={handleClickSort}
									>
										<i className="fa fa-sort-alpha-desc" aria-hidden="true"></i>
										&nbsp;
										<Typography variant="body1">Xep theo</Typography>
									</Box>
									<Popover
										id={idSort}
										open={openSort}
										anchorEl={anchorElSort}
										onClose={handleCloseSort}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
									>
										<List>
											<ListItem button divider onClick={() => handleSortBy('nameASC')}>
												<Typography variant="body1">Ten A-Z</Typography>
												{option === 'nameASC' && <i className="fa fa-check" aria-hidden="true"></i>}
											</ListItem>
											<ListItem button divider>
												<Typography variant="body1" onClick={() => handleSortBy('nameDESC')}>
													Ten Z-A
												</Typography>
												{option === 'nameDESC' && (
													<i className="fa fa-check" aria-hidden="true"></i>
												)}
											</ListItem>
											<ListItem button divider onClick={() => handleSortBy('priceDESC')}>
												<Typography variant="body1">Gia thap den cao</Typography>
												{option === 'priceDESC' && (
													<i className="fa fa-check" aria-hidden="true"></i>
												)}
											</ListItem>
											<ListItem button onClick={() => handleSortBy('priceASC')}>
												<Typography variant="body1">Gia cao xuong thap</Typography>
												{option === 'priceASC' && (
													<i className="fa fa-check" aria-hidden="true"></i>
												)}
											</ListItem>
										</List>
									</Popover>
								</ListItem>
							</List>
						</Box>
					</Grid>
				)}

				<Grid item xs={12} style={{ backgroundColor: '#fff' }}>
					<Grid container>
						{progress ? (
							<CircularProgress
								color="secondary"
								style={{ position: 'fixed', top: '110px', left: '50%' }}
							/>
						) : (
							<React.Fragment>
								{isResponseiveProductMobile ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataFilter?.listData?.map((item: any, index: number) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<Product
														key={index}
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
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
										{dataFilter?.listData?.map((item: any, index: number) => {
											return (
												<Grid item md={4} lg={3} xl={3}>
													<ProductMobile
														key={index}
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
								{dataFilter.totalCount > 24 && (
									<Grid
										item
										xs={12}
										style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}
									>
										<Pagination
											count={Math.ceil(dataFilter.totalCount / 24)}
											color="primary"
											size="large"
											defaultPage={page}
											onChange={(event: object, page: number) => {
												//console.log(event, page);
												const searchParams = new URLSearchParams(window.location.search);
												let pathName = `page=${page}`;
												if (searchParams.has('sortBy')) {
													const valueSortBy = searchParams.get('sortBy');
													pathName = `page=${page}&sortBy=${valueSortBy}`;
												}
												if (searchParams.has('filter')) {
													const valueFilter = searchParams.get('filter');
													pathName = `page=${page}&filter=${valueFilter}`;
												}
												if (searchParams.has('sortBy') && searchParams.has('filter')) {
													const valueSortBy = searchParams.get('sortBy');
													const valueFilter = searchParams.get('filter');
													pathName = `page=${page}&sortBy=${valueSortBy}&filter=${valueFilter}`;
												}
												history.replace({
													pathname: window.location.pathname,
													search: pathName,
												});
												setPage(page);
											}}
										/>
									</Grid>
								)}
							</React.Fragment>
						)}
					</Grid>
				</Grid>
			</React.Fragment>

			{/* <Button onClick={onClick}>Click me</Button> */}
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
			{redirect && <Redirect to={AppURL.ACCOUNT} />}
			<React.Fragment>
				<Grid item xs={12} style={{ marginTop: '40px' }}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to="/" className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang chu
						</Link>
						<Link to="/" className={classes.link}>
							Ket qua tim kiem
						</Link>
					</Breadcrumbs>
				</Grid>
				{(priceAbout1_3 || priceAbout3_5 || priceAbout5_7 || priceAboutTren7) && (
					<Grid item xs={12} style={{ display: 'inline-grid', overflowY: 'hidden' }}>
						<Box boxShadow={1} mt={2}>
							<List style={{ width: 'max-content' }}>
								<ListItem>
									{priceAbout1_3 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#0099e5',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('1_3', '1000000-3000000')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;1.000.000d -
											3.000.000d
										</Button>
									)}
									{priceAbout3_5 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#34bf49',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('3_5', '3000000-5000000')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;3.000.000d -
											5.000.000d
										</Button>
									)}
									{priceAbout5_7 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#fbb034',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('5_7', '5000000-7000000')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;5.000.000d -
											7.000.000d
										</Button>
									)}
									{priceAboutTren7 && (
										<Button
											variant="contained"
											style={{
												backgroundColor: '#da1884',
												color: '#fff',
												textTransform: 'inherit',
												marginRight: '9px',
											}}
											onClick={() => handlePriceAbout('7_', 'tren7trieu')}
										>
											<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Tren 7 trieu
										</Button>
									)}

									<Button
										variant="contained"
										style={{
											backgroundColor: '#ff0000',
											color: '#fff',
											textTransform: 'inherit',
										}}
										onClick={() => {
											setPriceAbout1_3(false);
											setPriceAbout3_5(false);
											setPriceAbout5_7(false);
											setPriceAboutTren7(false);
											history.replace({
												pathname: (window.location.pathname + window.location.search).slice(
													0,
													(window.location.pathname + window.location.search).lastIndexOf('filter')
												),
											});
										}}
									>
										<i className="fa fa-times" aria-hidden="true"></i>&nbsp;&nbsp;Bo het
									</Button>
								</ListItem>
							</List>
						</Box>
					</Grid>
				)}
				{ShowFilter(
					<Grid item xs={12} style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
						<Box>
							<List>
								<ListItem>
									<Card
										variant="outlined"
										style={{
											padding: '10px',
											display: 'flex',
											cursor: 'pointer',
											alignItems: 'center',
										}}
									>
										<i className="fa fa-filter" aria-hidden="true"></i>&nbsp;
										<Typography variant="body1">Bo loc</Typography>
									</Card>
									&nbsp;&nbsp;
									<Card
										variant="outlined"
										style={{ padding: '10px', display: 'flex', cursor: 'pointer' }}
										onClick={handleClickPrice}
									>
										<Typography variant="body1">Gia san pham</Typography>

										<ArrowDropDownIcon />
									</Card>
									<Popover
										id={idPrice}
										open={openPrice}
										anchorEl={anchorElPrice}
										onClose={handleClosePrice}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
									>
										<List>
											<ListItem>
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('1_3', '1000000-3000000')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAbout1_3,
													})}
												>
													1.000.000d - 3.000.000d
												</Button>
												&nbsp;&nbsp;
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('3_5', '3000000-5000000')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAbout3_5,
													})}
												>
													3.000.000d - 5.000.000d
												</Button>
											</ListItem>
											<ListItem>
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('5_7', '5000000-7000000')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAbout5_7,
													})}
												>
													5.000.000d - 7.000.000d
												</Button>
												&nbsp;&nbsp;
												<Button
													variant="outlined"
													style={{ textTransform: 'inherit' }}
													onClick={() => handlePriceAbout('7_', 'tren7trieu')}
													className={clsx(classes.button, {
														[classes.stylePriceAbout]: priceAboutTren7,
													})}
												>
													Tren 7 trieu
												</Button>
											</ListItem>
										</List>
									</Popover>
								</ListItem>
								<ListItem style={{ display: 'contents' }}>
									{!progress && (
										<Box style={{ float: 'left', marginLeft: '16px' }}>
											{/* <Typography variant="body1" style={{ fontWeight: 'bold' }}>
											 san pham duoc tim thay
										</Typography> */}
											<Typography variant="h6" style={{ display: 'contents' }}>
												<Typography
													variant="h6"
													style={{ fontWeight: 'bold', display: 'contents' }}
												>
													{dataFilter.totalCount}
												</Typography>
												&nbsp;san pham duoc tim thay
											</Typography>
										</Box>
									)}
									<Box
										style={{
											float: 'right',
											display: 'flex',
											alignItems: 'center',
											cursor: 'pointer',
											paddingRight: '20px',
										}}
										aria-describedby={idSort}
										onClick={handleClickSort}
									>
										<i className="fa fa-sort-alpha-desc" aria-hidden="true"></i>
										&nbsp;
										<Typography variant="body1">Xep theo</Typography>
									</Box>
									<Popover
										id={idSort}
										open={openSort}
										anchorEl={anchorElSort}
										onClose={handleCloseSort}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
									>
										<List>
											<ListItem button divider onClick={() => handleSortBy('nameASC')}>
												<Typography variant="body1">Ten A-Z</Typography>
												{option === 'nameASC' && <i className="fa fa-check" aria-hidden="true"></i>}
											</ListItem>
											<ListItem button divider>
												<Typography variant="body1" onClick={() => handleSortBy('nameDESC')}>
													Ten Z-A
												</Typography>
												{option === 'nameDESC' && (
													<i className="fa fa-check" aria-hidden="true"></i>
												)}
											</ListItem>
											<ListItem button divider onClick={() => handleSortBy('priceDESC')}>
												<Typography variant="body1">Gia thap den cao</Typography>
												{option === 'priceDESC' && (
													<i className="fa fa-check" aria-hidden="true"></i>
												)}
											</ListItem>
											<ListItem button onClick={() => handleSortBy('priceASC')}>
												<Typography variant="body1">Gia cao xuong thap</Typography>
												{option === 'priceASC' && (
													<i className="fa fa-check" aria-hidden="true"></i>
												)}
											</ListItem>
										</List>
									</Popover>
								</ListItem>
							</List>
						</Box>
					</Grid>
				)}

				<Grid item xs={12} style={{ backgroundColor: '#fff' }}>
					<Grid container>
						{progress ? (
							<CircularProgress
								color="secondary"
								style={{ position: 'fixed', top: '250px', left: '50%' }}
							/>
						) : (
							<React.Fragment>
								{isResponseivePhone ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataFilter?.listData?.map((item: any, index: number) => {
											return isResponseiveProduct1Mobile ? (
												<Grid item xs={6}>
													<ProductMobile
														key={index}
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											) : (
												<Grid item xs={6} sm={6}>
													<ProductMobile
														key={index}
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
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
										{dataFilter?.listData?.map((item: any, index: number) => {
											return (
												<Grid item xs={6}>
													<ProductPhone
														key={index}
														unit_price={item[0].unit_price}
														name={item[0].name}
														id={item[0].id}
														promotion_price={item[0].promotion_price}
														link={item.image}
														avg={item.avg}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)}
								{dataFilter.totalCount > 24 && (
									<Grid
										item
										xs={12}
										style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}
									>
										<Pagination
											count={Math.ceil(dataFilter.totalCount / 24)}
											color="primary"
											size="large"
											defaultPage={page}
											onChange={(event: object, page: number) => {
												//console.log(event, page);
												const searchParams = new URLSearchParams(window.location.search);
												let pathName = `page=${page}`;
												if (searchParams.has('sortBy')) {
													const valueSortBy = searchParams.get('sortBy');
													pathName = `page=${page}&sortBy=${valueSortBy}`;
												}
												if (searchParams.has('filter')) {
													const valueFilter = searchParams.get('filter');
													pathName = `page=${page}&filter=${valueFilter}`;
												}
												if (searchParams.has('sortBy') && searchParams.has('filter')) {
													const valueSortBy = searchParams.get('sortBy');
													const valueFilter = searchParams.get('filter');
													pathName = `page=${page}&sortBy=${valueSortBy}&filter=${valueFilter}`;
												}
												history.replace({
													pathname: window.location.pathname,
													search: pathName,
												});
												setPage(page);
											}}
										/>
									</Grid>
								)}
							</React.Fragment>
						)}
					</Grid>
				</Grid>
			</React.Fragment>

			{/* <Button onClick={onClick}>Click me</Button> */}
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
export default View;
