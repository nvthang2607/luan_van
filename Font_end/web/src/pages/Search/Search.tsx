import {
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	CircularProgress,
	FormControlLabel,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Popover,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import { Link, useHistory } from 'react-router-dom';
import Product from '../../Components/Product/Product';
import { Controller } from 'react-hook-form';
import { AppURL } from '../../utils/const';
import { SearchPhoneGet } from '../../api/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	getValueRefreshPage,
	updateValueRefreshPage,
} from '../../features/refresh/RefreshPageSlice';
import img from 'http://localhost:8000source/image/product/test.png';
import Pagination from '@material-ui/lab/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import News from '../../Components/News/News';
import { useMediaQuery } from 'react-responsive';
import ProductMobile from '../../Components/Product/ProductMobile';
import ProductPhone from '../../Components/Product/ProductPhone';
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
	bgHeaderMobile: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		backgroundColor: '#f4f4f4',
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
const Search: React.FC = () => {
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
	const addToCart: (result: boolean) => void = (result) => {
		if (result) {
			toast.success('Da them san pham vao gio hang');
		} else {
			toast.error('ko du so luong');
		}
	};
	const [typeSearch, setTypeSearch] = React.useState('product');
	const searchParams = new URLSearchParams(window.location.search);
	const dispatch = useAppDispatch();
	const handleClickOption = (name: string) => {
		setDataSearch({});
		dispatch(updateValueRefreshPage(true));
		if (searchParams.has('query')) {
			history.replace({
				pathname: window.location.pathname,
				search: 'query=' + searchParams.get('query')?.toString() + '&type=' + name,
			});
		}
	};
	const [dataSearch, setDataSearch] = React.useState<any>({});

	const valueRefreshPage = useAppSelector(getValueRefreshPage);
	const [page, setPage] = React.useState(1);
	const [progress, setProgress] = React.useState(false);
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
		const fetchSearch = async () => {
			const searchParams = new URLSearchParams(window.location.search);
			if (searchParams.has('query')) {
				const getSearch = await SearchPhoneGet({
					page: page,
					pageSize: 24,
					search: searchParams.get('query'),
					type: searchParams.get('type'),
				});
				if (getSearch) {
					if (getSearch.errorCode === null) {
						console.log(getSearch);

						setDataSearch(getSearch.data);
						setProgress(false);
					}
				}
			}
		};
		fetchSearch();
	}, [valueRefreshPage.value, page]);
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseiveProductMobile = useMediaQuery({ query: '(min-width: 1098px)' });
	const isResponseiveProduct1Mobile = useMediaQuery({ query: '(min-width: 780px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	return isResponseiveMobile ? (
		<Grid container className={classes.bgHeader}>
			{/* <Button onClick={onClick}>Click me</Button> */}
			{/* <img src="http://localhost:8000source/image/product/test.png" /> */}
			{progress ? (
				<CircularProgress
					color="secondary"
					style={{ position: 'fixed', top: '110px', left: '50%' }}
				/>
			) : (
				<React.Fragment>
					{isResponseive ? (
						<Grid item xs={9} style={{ position: 'absolute', top: '93px', left: '362px' }}>
							<Breadcrumbs aria-label="breadcrumb">
								<Link to="/" className={classes.link}>
									<HomeIcon className={classes.icon} />
									Trang chủ
								</Link>
								<Link to="/" className={classes.link}>
									Kết quả tìm kiếm
								</Link>
							</Breadcrumbs>
						</Grid>
					) : (
						<Grid item xs={12} style={{ marginTop: '20px' }}>
							<Breadcrumbs aria-label="breadcrumb">
								<Link to="/" className={classes.link}>
									<HomeIcon className={classes.icon} />
									Trang chủ
								</Link>
								<Link to="/" className={classes.link}>
									Kết quả tìm kiếm
								</Link>
							</Breadcrumbs>
						</Grid>
					)}
					<Grid item xs={12} style={{ backgroundColor: '#fff', paddingLeft: '20px' }}>
						<RadioGroup
							name="optionSearch"
							value={typeSearch}
							row
							onChange={(e) => {
								setTypeSearch(e.target.value);
							}}
						>
							<FormControlLabel
								value="product"
								control={<Radio color="primary" onClick={() => handleClickOption('product')} />}
								label="San pham"
							/>
							<FormControlLabel
								value="news"
								control={<Radio color="primary" />}
								label="Tin tuc"
								onClick={() => handleClickOption('news')}
							/>
						</RadioGroup>
					</Grid>
					<Grid
						item
						xs={12}
						style={{ backgroundColor: '#fff', marginBottom: '20px', paddingLeft: '20px' }}
					>
						<Typography variant="h5" style={{ display: 'contents' }}>
							Tìm thấy&nbsp;
							<Typography variant="h5" style={{ fontWeight: 'bold', display: 'contents' }}>
								{dataSearch.totalCount}
							</Typography>
							&nbsp;kết quả với từ khóa&nbsp;
							<Typography variant="h5" style={{ fontWeight: 'bold', display: 'contents' }}>
								{`"${searchParams.get('query')}"`}
							</Typography>
						</Typography>
					</Grid>
					<Grid item xs={12} style={{ backgroundColor: '#fff' }}>
						<Grid container>
							{typeSearch === 'product' ? (
								isResponseiveProductMobile ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataSearch?.listData?.map((item: any, index: number) => {
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
										{dataSearch?.listData?.map((item: any, index: number) => {
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
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataSearch?.listData?.map((item: any, index: number) => {
										return (
											<Grid item xs={4}>
												<News
													key={index}
													title={item.title}
													id={item.id}
													link={item.image}
													content={item.content}
													date={item.created_at}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}{' '}
						</Grid>
					</Grid>

					{dataSearch.totalCount > 24 && (
						<Grid
							item
							xs={12}
							style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}
						>
							<Pagination
								count={Math.ceil(dataSearch.totalCount / 24)}
								color="primary"
								size="large"
								defaultPage={page}
								onChange={(event: object, page: number) => {
									//console.log(event, page);
									const searchParams = new URLSearchParams(window.location.search);
									history.replace({
										pathname: window.location.pathname,
										search:
											'query=' +
											searchParams.get('query')?.toString() +
											'&type=' +
											searchParams.get('type')?.toString() +
											'&page=' +
											page,
									});
									setPage(page);
								}}
							/>
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
			{/* <Button onClick={onClick}>Click me</Button> */}
			{/* <img src="http://localhost:8000source/image/product/test.png" /> */}
			{progress ? (
				<Box style={{ marginTop: '60px' }}>
					<CircularProgress
						color="secondary"
						style={{ position: 'fixed', top: '110px', left: '50%' }}
					/>
				</Box>
			) : (
				<React.Fragment>
					<Grid item xs={12} style={{ marginTop: '40px' }}>
						<Breadcrumbs aria-label="breadcrumb">
							<Link to="/" className={classes.link}>
								<HomeIcon className={classes.icon} />
								Trang chủ
							</Link>
							<Link to="/" className={classes.link}>
								Kết quả tìm kiếm
							</Link>
						</Breadcrumbs>
					</Grid>

					<Grid item xs={12} style={{ backgroundColor: '#fff', paddingLeft: '20px' }}>
						<RadioGroup
							name="optionSearch"
							value={typeSearch}
							row
							onChange={(e) => {
								setTypeSearch(e.target.value);
							}}
						>
							<FormControlLabel
								value="product"
								control={<Radio color="primary" onClick={() => handleClickOption('product')} />}
								label="San pham"
							/>
							<FormControlLabel
								value="news"
								control={<Radio color="primary" />}
								label="Tin tuc"
								onClick={() => handleClickOption('news')}
							/>
						</RadioGroup>
					</Grid>
					<Grid
						item
						xs={12}
						style={{ backgroundColor: '#fff', marginBottom: '20px', paddingLeft: '20px' }}
					>
						<Typography variant="h5" style={{ display: 'contents' }}>
							Tìm thấy&nbsp;
							<Typography variant="h5" style={{ fontWeight: 'bold', display: 'contents' }}>
								{dataSearch.totalCount}
							</Typography>
							&nbsp;kết quả với từ khóa&nbsp;
							<Typography variant="h5" style={{ fontWeight: 'bold', display: 'contents' }}>
								{`"${searchParams.get('query')}"`}
							</Typography>
						</Typography>
					</Grid>
					<Grid item xs={12} style={{ backgroundColor: '#fff' }}>
						<Grid container>
							{typeSearch === 'product' ? (
								isResponseivePhone ? (
									<Grid container spacing={3} style={{ marginTop: '10px' }}>
										{dataSearch?.listData?.map((item: any, index: number) => {
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
														promotion={item.promotion}
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
										{dataSearch?.listData?.map((item: any, index: number) => {
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
														promotion={item.promotion}
														rate_number={item.rate_number}
														storeQuantity={item[0].quantity}
														addToCart={addToCart}
													/>
												</Grid>
											);
										})}
									</Grid>
								)
							) : (
								<Grid container spacing={3} style={{ marginTop: '10px' }}>
									{dataSearch?.listData?.map((item: any, index: number) => {
										return isResponseivePhone ? (
											<Grid item lg={4} md={4} sm={6}>
												<News
													key={index}
													title={item.title}
													id={item.id}
													link={item.image}
													content={item.content}
													date={item.created_at}
												/>
											</Grid>
										) : (
											<Grid item xs={12}>
												<News
													key={index}
													title={item.title}
													id={item.id}
													link={item.image}
													content={item.content}
													date={item.created_at}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid>

					{dataSearch.totalCount > 24 && (
						<Grid
							item
							xs={12}
							style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}
						>
							<Pagination
								count={Math.ceil(dataSearch.totalCount / 24)}
								color="primary"
								size="large"
								defaultPage={page}
								onChange={(event: object, page: number) => {
									//console.log(event, page);
									const searchParams = new URLSearchParams(window.location.search);
									history.replace({
										pathname: window.location.pathname,
										search:
											'query=' +
											searchParams.get('query')?.toString() +
											'&type=' +
											searchParams.get('type')?.toString() +
											'&page=' +
											page,
									});
									setPage(page);
								}}
							/>
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
export default Search;
