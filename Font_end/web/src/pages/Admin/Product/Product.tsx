import React, { useState } from 'react';
import {
	Box,
	Breadcrumbs,
	CircularProgress,
	Collapse,
	Container,
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	Fade,
	Grid,
	IconButton,
	makeStyles,
	TextField,
	Tooltip,
	Menu as MenuMui,
	MenuItem as MenuItemMui,
	Typography,
} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchBar from 'material-ui-search-bar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { AppURL } from './../../../utils/const';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import MUIDataTableComponent from '../../../Components/Table/MUIDataTableComponent';
import { DeleteUserGet, SearchUserGet, UserPost } from '../../../api/Admin/User';
import Swal from 'sweetalert2';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import {
	DeleteBrandProductDelete,
	DeleteProductDelete,
	DeleteProductTypeGet,
	GetImageGet,
	ListProductGet,
	ListTypeProductGet,
	ProductTypeGet,
	SearchBrandProductGet,
} from '../../../api/Admin/Product';
import jwtDecode from 'jwt-decode';
import { Autocomplete } from '@material-ui/lab';
import Card from '@mui/material/Card/Card';
import { TypeBrand } from '../../../api/Product';
import { type } from 'os';
import UpdateQuantity from './UpdateQuantity';
import { boolean } from 'yup/lib/locale';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import ProductDetail from './ProductDetail';

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
	hoverRate: {
		color: 'blue',
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline',
			color: '#ff6600',
		},
	},
	inputSearch: {
		fontSize: '20px',
	},
	link: {
		display: 'flex',
		textDecoration: 'none',
		color: 'black',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
}));

const Product: React.FC = () => {
	const classes = useStyles();
	const [dataEdit, setDataEdit] = React.useState<any>({});
	const [dataListTypeProduct, setDataListTypeProduct] = React.useState<any>([]);
	const [showDialog, setShowDialog] = React.useState(0);
	const [progressData, setProgressData] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(0);
	const [showTable, setShowTable] = useState(true);
	const [t] = useTranslation();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Search: '',
		Page: 0,
		type: 'type',
		PageSize: 5,
		id: '',
		active: 'active',
	});
	const [valChange, setValChange] = React.useState<any>('');
	const [idProduct, setIdProduct] = React.useState<any>(0);
	const [idBrandDef, setIdBrandDef] = React.useState<any>(0);
	const [data, setData] = React.useState<any[]>([]);
	const [flag, setFlag] = React.useState(false);
	const [totalDoc, setTotalDoc] = useState<number>(0);
	const [pageTB, setPageTB] = useState<number>(0);
	const [rowPage, setRowPage] = useState<number>(5);
	const history = useHistory();
	const column = [
		{
			name: 'stt',
			label: 'STT',
			options: {
				sort: false,
			},
		},
		{
			name: 'mainImg',
			label: 'H??nh ???nh',
			options: {
				sort: false,
				customBodyRender: (mainImg: any) => {
					return <img width="104px" src={`http://localhost:8000${mainImg}`} />;
				},
			},
		},
		{
			name: 'name',
			label: 'T??n',
			options: {
				sort: false,
			},
		},
		{
			name: 'name_type',
			label: 'Lo???i s???n ph???m',
			options: {
				sort: false,
			},
		},
		{
			name: 'name_brand',
			label: 'Th????ng hi???u',
			options: {
				sort: false,
			},
		},
		{
			name: 'unit_price',
			label: 'Gi?? g???c',
			options: {
				sort: false,
				customBodyRender: (unit_price: number) => {
					return (
						<Typography variant="body1">
							{Intl.NumberFormat('en-US').format(Number(unit_price))}??
						</Typography>
					);
				},
			},
		},
		{
			name: 'quantity',
			label: 'S??? l?????ng',
			options: {
				sort: false,
			},
		},
		{
			name: 'rate_number',
			label: '????nh gi??',
			options: {
				sort: false,
			},
		},
		{
			name: 'created_at',
			label: 'Ng??y t???o',
			options: {
				sort: false,
			},
		},
		{
			name: 'updated_at',
			label: 'Ng??y c???p nh???t',
			options: {
				sort: false,
			},
		},

		{
			name: 'id_product',
			label: 'H??nh ?????ng',
			options: {
				sort: false,
				customBodyRenderLite: (index: any) => {
					return (
						<React.Fragment>
							<MoreHorizIcon
								style={{ cursor: 'pointer', color: 'blue' }}
								onClick={(event: any) => {
									handleClickProduct(event, index);
								}}
							/>

							<MenuMui
								id="basic-menu"
								anchorEl={anchorElProduct}
								open={Boolean(data[index].id_product === idProduct ? anchorElProduct : null)}
								onClose={handleCloseProduct}
								keepMounted
							>
								{/* <MenuItem>Xem chi tiet</MenuItem> */}
								<MenuItemMui
									onClick={() => {
										setAnchorElProduct(null);
										setDataEdit(data[index]);
										setTitleDialog('Chi ti???t s???n ph???m');
										setShowDialog(3);
										setOpen(true);
									}}
								>
									Xem chi ti???t
								</MenuItemMui>
								<MenuItemMui
									onClick={() => {
										setAnchorElProduct(null);

										const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
										if (tokenAdmin) {
											const checkToken: any = jwtDecode(tokenAdmin);
											if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'warehouse') {
												Swal.fire({
													icon: 'error',
													title: 'B???n kh??ng c?? quy???n c???p nh???t s??? l?????ng',
												});
											} else {
												setDataEditQuantity({
													id: data[index].id_product,
													name: data[index].quantity,
												});
												setTitleDialog('C???p nh???t s??? l?????ng');
												setShowDialog(0);
												setOpen(true);
											}
										}
									}}
								>
									C???p nh???t s??? l?????ng
								</MenuItemMui>
								<MenuItemMui
									onClick={async () => {
										setAnchorElProduct(null);

										const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
										if (tokenAdmin) {
											const checkToken: any = jwtDecode(tokenAdmin);
											if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'manager') {
												Swal.fire({
													icon: 'error',
													title: 'B???n kh??ng c?? quy???n c???p nh???t s??? l?????ng',
												});
											} else {
												setProgressListTypeProduct(true);
												setDataEdit(data[index]);
												setTitleDialog('C???p nh???t th??ng tin');
												setShowDialog(2);

												const response = await GetImageGet(data[index].id_product);
												if (response)
													if (response.errorCode === null) {
														setProgressListTypeProduct(false);

														const data = response.data.listData?.map((item: any) => {
															return {
																id: item.id,
																id_product: item.id_product,
																image: item.image,
																delete: false,
															};
														});
														setDataEditImage(data);
														setOpen(true);
													}
											}
										}
									}}
								>
									C???p nh???t th??ng tin
								</MenuItemMui>
								<MenuItemMui
									onClick={() => {
										const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
										if (tokenAdmin) {
											const checkToken: any = jwtDecode(tokenAdmin);
											if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'manager') {
												setAnchorElProduct(null);
												Swal.fire({
													icon: 'error',
													title: 'B???n kh??ng c?? quy???n xem danh s??ch khuy???n m??i',
												});
											} else {
												history.push(`/admin/product_promotion/${data[index].id_product}`);
											}
										}
									}}
								>
									Xem danh s??ch khuy???n m??i
								</MenuItemMui>
								<MenuItemMui
									onClick={() => {
										const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
										if (tokenAdmin) {
											const checkToken: any = jwtDecode(tokenAdmin);
											if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'manager') {
												setAnchorElProduct(null);
												Swal.fire({
													icon: 'error',
													title: 'B???n kh??ng c?? quy???n xem danh s??ch ????nh gi??',
												});
											} else {
												history.push(`/admin/rating/${data[index].id_product}`);
											}
										}
									}}
								>
									Xem danh s??ch ????nh gi??
								</MenuItemMui>
							</MenuMui>
						</React.Fragment>
					);
				},
			},
		},
	];
	const textTable = {
		pagination: {
			rowsPerPage: t('document.rows_per_page'),
			displayRows: t('document.display_rows'),
			jumpToPage: t('document.jump_to_page'),
		},
		body: {
			noMatch: progressData ? <CircularProgress color="secondary" /> : t('tenant.no_match'),
		},
		selectedRows: {
			text: 'File(s) ???? ???????c ch???n',
			delete: 'Delete',
			deleteAria: 'Deleted Selected Row(s)',
		},
	};
	const [titleDialog, setTitleDialog] = React.useState<string>('');
	const handleClickOpen = () => {
		setOpen(true);
		setTitleDialog('add_user');
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValChange(e.target.value);
	};
	const handleClickClear = () => {
		setFilterSearch({
			...filterSearch,
			Search: '',
		});
		setValChange('');
	};
	const handleClick = () => {
		setFilterSearch({
			...filterSearch,
			Search: valChange,
		});
	};
	const handleCheckIsadmin = () => {
		const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
		if (tokenAdmin) {
			const checkToken: any = jwtDecode(tokenAdmin);
			if (
				checkToken.isAdmin !== 'admin' &&
				checkToken.isAdmin !== 'manager' &&
				checkToken.isAdmin !== 'warehouse'
			) {
				Swal.fire({
					icon: 'error',
					title: 'B???n kh??ng c?? quy???n xem s???n ph???m',
				});
				return <Redirect to={AppURL.ADMIN_HOME} />;
			}
		}
	};
	const handleCheckToken = () => {
		const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
		const date = Date.now();
		if (tokenAdmin) {
			const checkToken: any = jwtDecode(tokenAdmin);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('tokenAdmin');
				return <Redirect to={AppURL.LOGIN} />;
			}
		}
	};

	useEffect(() => {
		const fetchProductType = async () => {
			setProgressData(true);
			setTotalDoc(0);
			setData([]);
			const result = await ListProductGet({
				page: filterSearch.Page + 1,
				pageSize: filterSearch.PageSize,
				search: filterSearch.Search,
				type: filterSearch.type,
				id: filterSearch.id,
				active: filterSearch.active,
			});
			const getTypeBrand = await TypeBrand();
			if (getTypeBrand) {
				if (getTypeBrand.errorCode === null) {
					let id = 0;
					setDataListTypeProduct(getTypeBrand);
					getTypeBrand.data?.map((item: any) => {
						if (item.brand?.length > 0) {
							if (id === 0) {
								item.brand?.map((itemChildren: any) => {
									id = itemChildren.id;
								});
							}
						}
					});
					setIdBrandDef(id);
				}
			}
			if (result?.data?.listData) {
				const dataNew = result.data.listData?.map((item: any, index: number) => {
					return {
						id_product: item.id,
						id_type: item.id_type,
						id_brand: item.id_brand,
						name_type: item.name_type,
						avg: item.avg,
						images: item.images,
						informations: item.informations,
						name_brand: item.name_brand,
						promotion_price: item.promotionprice,
						promotions: item.promotions,
						quantity: item.quantity,
						rate: item.rate,
						rate_number: item.rate_number,
						stt: index + 1,
						name: item.name,
						description: item.description,
						unit_price: item.unitprice,
						mainImg: item.images[0].image,
						created_at: item.created_at,
						updated_at: item.updated_at,
					};
				});
				console.log(result?.data);

				setData(dataNew);
				setProgressData(false);
			}
			if (result?.data?.totalCount) {
				setTotalDoc(result?.data?.totalCount);
			}
		};
		fetchProductType();
	}, [filterSearch, flag, refresh]);
	const [dataEditQuantity, setDataEditQuantity] = React.useState({ id: 0, name: '' });
	const [dataEditImage, setDataEditImage] = React.useState<any>([]);
	const create: (result: boolean) => void = async (result) => {
		if (result) {
			setOpen(false);
			setFlag(!flag);
		} else {
			setOpen(false);
		}
	};
	const cancel: (result: boolean) => void = (result) => {
		setOpen(result);
	};
	const [showBoxSearch, setShowBoxSearch] = useState(false);
	const [valueFilter, setValueFilter] = useState({ id: 0, value: 'T???t c??? s???n ph???m', type: 'all' });
	const [progressListTypeProduct, setProgressListTypeProduct] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openFilter = Boolean(anchorEl);
	const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseFilter = () => {
		setAnchorEl(null);
	};
	const [valueActive, setValueActive] = useState({
		id: 0,
		value: 'Danh s??ch s???n ph???m ??ang ???????c k??ch ho???t',
	});
	const [anchorElActive, setAnchorElActive] = React.useState<null | HTMLElement>(null);
	const openActive = Boolean(anchorElActive);
	const handleClickActive = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElActive(event.currentTarget);
	};
	const handleCloseActive = () => {
		setAnchorElActive(null);
	};
	const [anchorElProduct, setAnchorElProduct] = React.useState<null | HTMLElement>(null);
	const openProduct = Boolean(anchorElProduct);
	const handleClickProduct = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
		setAnchorElProduct(event.currentTarget);
		setIdProduct(data[index].id_product);
	};
	const handleCloseProduct = () => {
		setAnchorElProduct(null);
	};
	const handleShowDialog = () => {
		if (showDialog === 0) {
			return (
				<UpdateQuantity
					dataEdit={dataEditQuantity}
					cancel={cancel}
					create={create}
					titleDialog={titleDialog}
				/>
			);
		} else if (showDialog === 1) {
			return (
				<CreateProduct
					dataEdit={dataEdit}
					cancel={cancel}
					create={create}
					titleDialog={titleDialog}
					dataBrand={dataListTypeProduct}
				/>
			);
		} else if (showDialog === 2) {
			return (
				<EditProduct
					dataEdit={dataEdit}
					cancel={cancel}
					create={create}
					titleDialog={titleDialog}
					dataBrand={dataListTypeProduct}
					dataEditImage={dataEditImage}
				/>
			);
		} else if (showDialog === 3) {
			return (
				<ProductDetail
					dataEdit={dataEdit}
					cancel={cancel}
					create={create}
					titleDialog={titleDialog}
				/>
			);
		}
	};
	return (
		<Container style={{ backgroundColor: '#f4f4f4', padding: 0 }}>
			{handleCheckToken()}
			{handleCheckIsadmin()}
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to={AppURL.ADMIN_HOME} className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang ch???
						</Link>
						<Link to={AppURL.ADMIN_TYPE_PRODUCT} className={classes.link}>
							Qu???n l?? danh m???c
						</Link>
						<Link to={AppURL.ADMIN_PRODUCT} className={classes.link}>
							S???n ph???m
						</Link>
						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm V??ng Ch??nh H??ng Ch??a K??ch Tr??i BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>

				<Grid item xs={12} style={{ paddingBottom: 0 }}>
					<div>
						<Button
							id="basic-button"
							aria-controls="basic-menu"
							aria-haspopup="true"
							aria-expanded={openFilter ? 'true' : undefined}
							onClick={handleClickFilter}
							style={{
								border: '1px solid',
								padding: '2px',
								paddingRight: 0,
								paddingLeft: '7px',
								textTransform: 'inherit',
							}}
						>
							{valueFilter.value}
							<ArrowDropDownIcon />
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={openFilter}
							onClose={handleCloseFilter}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem
								onClick={() => {
									setAnchorEl(null);
									setValueFilter({ id: 0, value: 'T???t c??? s???n ph???m', type: 'all' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										type: 'type',
										id: '',
									});
									setPageTB(0);
								}}
								style={{ fontWeight: 'bold' }}
							>
								T???t c??? s???n ph???m
								{valueFilter.id === 0 && (
									<i
										className="fa fa-check"
										aria-hidden="true"
										style={{ marginLeft: '14px', color: 'red' }}
									></i>
								)}
							</MenuItem>
							{dataListTypeProduct.data?.map((item: any) => {
								return (
									<React.Fragment>
										<MenuItem
											onClick={() => {
												setAnchorEl(null);
												setValueFilter({ id: item.id, value: item.name, type: 'type' });
												setFilterSearch({
													...filterSearch,
													Page: 0,
													type: 'type',

													id: item.id,
												});
												setPageTB(0);
											}}
											style={{ fontWeight: 'bold' }}
										>
											{item.name}
											{valueFilter.id === item.id && valueFilter.type === 'type' && (
												<i
													className="fa fa-check"
													aria-hidden="true"
													style={{ marginLeft: '14px', color: 'red' }}
												></i>
											)}
										</MenuItem>
										{item.brand?.map((itemChildren: any) => {
											return (
												<MenuItem
													onClick={() => {
														setAnchorEl(null);
														setValueFilter({
															id: itemChildren.id,
															value: itemChildren.name,
															type: 'brand',
														});
														setFilterSearch({
															...filterSearch,
															Page: 0,
															type: 'brand',

															id: itemChildren.id,
														});
														setPageTB(0);
													}}
													style={{ paddingLeft: '35px' }}
												>
													{itemChildren.name}
													{valueFilter.id === itemChildren.id && valueFilter.type === 'brand' && (
														<i
															className="fa fa-check"
															aria-hidden="true"
															style={{ marginLeft: '14px', color: 'red' }}
														></i>
													)}
												</MenuItem>
											);
										})}
									</React.Fragment>
								);
							})}
						</Menu>
					</div>
				</Grid>
				<Grid item xs={12} style={{ paddingBottom: 0 }}>
					<div>
						<Button
							id="basic-button"
							aria-controls="basic-menu"
							aria-haspopup="true"
							aria-expanded={openActive ? 'true' : undefined}
							onClick={handleClickActive}
							style={{
								border: '1px solid',
								padding: '2px',
								paddingRight: 0,
								paddingLeft: '7px',
								textTransform: 'inherit',
							}}
						>
							{valueActive.value}
							<ArrowDropDownIcon />
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorElActive}
							open={openActive}
							onClose={handleCloseActive}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem
								onClick={() => {
									setAnchorElActive(null);
									setValueActive({ id: 0, value: 'Danh s??ch s???n ph???m ??ang ???????c k??ch ho???t' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										active: 'active',
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 0 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh s??ch s???n ph???m ??ang ???????c k??ch ho???t
									</Typography>
								) : (
									<Typography variant="body1">Danh s??ch s???n ph???m ??ang ???????c k??ch ho???t</Typography>
								)}
								&nbsp;
								{valueActive.id === 0 && (
									<i
										className="fa fa-check"
										aria-hidden="true"
										style={{ marginLeft: '14px', color: 'red' }}
									></i>
								)}
							</MenuItem>
							<MenuItem
								onClick={() => {
									setAnchorElActive(null);
									setValueActive({ id: 1, value: 'Danh s??ch s???n ph???m ??ang ???????c t???m kh??a' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										active: 'noactive',
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 1 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh s??ch s???n ph???m ??ang ???????c t???m kh??a
									</Typography>
								) : (
									<Typography variant="body1">Danh s??ch s???n ph???m ??ang ???????c t???m kh??a</Typography>
								)}
								&nbsp;
								{valueActive.id === 1 && (
									<i
										className="fa fa-check"
										aria-hidden="true"
										style={{ marginLeft: '14px', color: 'red' }}
									></i>
								)}
							</MenuItem>
						</Menu>
					</div>
				</Grid>

				<Grid item xs={12} style={{ paddingTop: 0 }}>
					{progressListTypeProduct && (
						<CircularProgress
							color="secondary"
							style={{ position: 'fixed', top: '38%', left: '50%' }}
						/>
					)}
					<Box>
						<Collapse in={!showBoxSearch} timeout="auto" unmountOnExit>
							<Box style={{ textAlign: 'end' }}>
								<Tooltip title="T??m ki???m" placement="top">
									<IconButton
										onClick={() => {
											setShowBoxSearch(true);
										}}
									>
										<SearchIcon style={{ color: '#757575', fontSize: '24px' }} />
									</IconButton>
								</Tooltip>
								<Tooltip title="T???o m???i" placement="top">
									<IconButton
										onClick={async () => {
											const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
											if (tokenAdmin) {
												const checkToken: any = jwtDecode(tokenAdmin);
												if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'manager') {
													Swal.fire({
														icon: 'error',
														title: 'B???n kh??ng c?? quy???n xem danh s??ch khuy???n m??i',
													});
												} else {
													setTitleDialog('T???o m???i s???n ph???m');
													setDataEdit({
														id: 0,
														name: '',
														quantity: 0,
														id_brand: idBrandDef,
														unit_price: 0,
														promotion_price: 0,
														description: '',
													});

													setOpen(true);
													setShowDialog(1);
												}
											}
										}}
									>
										<AddIcon style={{ color: '#757575', fontSize: '24px' }} />
									</IconButton>
								</Tooltip>
								<Tooltip title="T???i l???i" placement="top">
									<IconButton onClick={() => setFlag(!flag)}>
										<RefreshIcon style={{ color: '#757575', fontSize: '24px' }} />
									</IconButton>
								</Tooltip>
							</Box>
						</Collapse>

						<Collapse in={showBoxSearch} timeout="auto" unmountOnExit>
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									marginLeft: '24px',
									marginRight: '24px',
								}}
							>
								<IconButton onClick={() => handleClick()}>
									<SearchIcon style={{ color: '#757575', fontSize: '24px' }} />
								</IconButton>
								<TextField
									id="standard-basic"
									placeholder="Nh???p t??n s???n ph???m"
									variant="standard"
									fullWidth
									size="medium"
									value={valChange}
									onChange={handleChangeSearch}
									autoFocus
									InputProps={{
										className: classes.inputSearch,
									}}
									onKeyDown={(e) => {
										if (e.keyCode == 13) {
											handleClick();
										}
									}}
								/>
								<IconButton
									onClick={() => {
										setShowBoxSearch(false);
										handleClickClear();
									}}
								>
									<CloseIcon style={{ color: '#757575', fontSize: '24px' }} />
								</IconButton>
							</Box>
						</Collapse>
					</Box>
				</Grid>
			</Grid>
			<Box mt={3}>
				{showTable ? (
					<MUIDataTableComponent
						columns={column}
						data={data}
						options={{
							rowsPerPageOption: [5, 10, 20],
							rowsPerPage: rowPage,
							count: totalDoc,
							page: pageTB,
							pagination: true,
							jumpToPage: true,
							download: false,
							filter: false,
							responsive: 'vertical',
							viewColumns: false,
							print: false,
							search: false,
							textLabels: textTable,

							customToolbarSelect: (selectedRows: any, setSelectedRows: any) => (
								<Box mr={3}>
									<Button
										variant="contained"
										color="primary"
										children={valueActive.id === 1 ? 'Kh??i ph???c' : 'X??a'}
										onClick={() => {
											Swal.fire({
												title: 'Are you sure?',
												text: "You won't be able to revert this!",
												icon: 'warning',
												showCancelButton: true,
												confirmButtonColor: '#3085d6',
												cancelButtonColor: '#d33',
												confirmButtonText: 'Yes',
												reverseButtons: true,
											}).then((result) => {
												if (result.isConfirmed) {
													let count = 0;
													selectedRows.data?.map(async (item: any) => {
														const response = await DeleteProductDelete(data[item.index].id_product);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire(
																'???? x??a!',
																`???? x??a th??nh c??ng ${count} s???n ph???m`,
																'success'
															);

															selectedRows.data = [];
															selectedRows.lookup = {};
															setSelectedRows = [];
															setFlag(!flag);
															setShowTable(false);
														}
													});
												}
											});
										}}
									></Button>
								</Box>
							),
							onChangePage: (currentPage: number) => {
								setFilterSearch({
									...filterSearch,
									PageSize: currentPage * rowPage + rowPage,
								});

								setPageTB(currentPage);
							},
							onChangeRowsPerPage: (numberOfRows: number) => {
								setFilterSearch({
									...filterSearch,
									PageSize: numberOfRows,
								});
								setRowPage(numberOfRows);
								setPageTB(0);
							},
						}}
					></MUIDataTableComponent>
				) : (
					<MUIDataTableComponent
						columns={column}
						data={data}
						options={{
							rowsPerPageOption: [5, 10, 20],
							rowsPerPage: rowPage,
							count: totalDoc,
							page: pageTB,
							pagination: true,
							jumpToPage: true,
							download: false,
							filter: false,
							responsive: 'vertical',
							viewColumns: false,
							print: false,
							search: false,
							textLabels: textTable,

							customToolbarSelect: (selectedRows: any, setSelectedRows: any) => (
								<Box mr={3}>
									<Button
										variant="contained"
										color="primary"
										children={valueActive.id === 1 ? 'Kh??i ph???c' : 'X??a'}
										onClick={() => {
											Swal.fire({
												title: 'Are you sure?',
												text: "You won't be able to revert this!",
												icon: 'warning',
												showCancelButton: true,
												confirmButtonColor: '#3085d6',
												cancelButtonColor: '#d33',
												confirmButtonText: 'Yes',
												reverseButtons: true,
											}).then((result) => {
												if (result.isConfirmed) {
													let count = 0;
													selectedRows.data?.map(async (item: any) => {
														const response = await DeleteProductDelete(data[item.index].id_product);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire(
																'???? x??a!',
																`???? x??a th??nh c??ng ${count} s???n ph???m`,
																'success'
															);

															selectedRows.data = [];
															selectedRows.lookup = {};
															setSelectedRows = [];
															setFlag(!flag);
															setShowTable(true);
														}
													});
												}
											});
										}}
									></Button>
								</Box>
							),
							onChangePage: (currentPage: number) => {
								setFilterSearch({
									...filterSearch,
									PageSize: currentPage * rowPage + rowPage,
								});

								setPageTB(currentPage);
							},
							onChangeRowsPerPage: (numberOfRows: number) => {
								setFilterSearch({
									...filterSearch,
									PageSize: numberOfRows,
								});
								setRowPage(numberOfRows);
								setPageTB(0);
							},
						}}
					></MUIDataTableComponent>
				)}
			</Box>
			<Dialog
				//disableBackdropClick
				//disableEscapeKeyDown
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth={showDialog === 0 ? 'sm' : 'lg'}
			>
				{/* <BrandProductEdit
					dataEdit={dataEdit}
					cancel={cancel}
					create={create}
					titleDialog={titleDialog}
					dataListTypeProduct={dataListTypeProduct}

				/> */}
				{handleShowDialog()}
			</Dialog>
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
		</Container>
	);
};
export default Product;
