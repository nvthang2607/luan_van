import React, { useState } from 'react';
import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	CircularProgress,
	Collapse,
	Container,
	Dialog,
	DialogActions,
	DialogTitle,
	Grid,
	IconButton,
	LinearProgress,
	makeStyles,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import SearchBar from 'material-ui-search-bar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { AppURL } from '../../../utils/const';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import MUIDataTableComponent from '../../../Components/Table/MUIDataTableComponent';
import { DeleteUserGet, SearchUserGet, UserPost } from '../../../api/Admin/User';
import Swal from 'sweetalert2';
import HomeIcon from '@material-ui/icons/Home';
import { Link, NavLink, Redirect, useParams } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import {
	DeleteBrandProductDelete,
	DeleteProductTypeGet,
	ListRatingGet,
	ListTypeProductGet,
	ProductTypeGet,
	SearchBrandProductGet,
} from '../../../api/Admin/Product';
import jwtDecode from 'jwt-decode';
import { DeletePromotionDelete, ListPromotionGet } from '../../../api/Admin/Promotion';
import Rating from '@material-ui/lab/Rating';
import { ProductIdGet, RatingPost } from '../../../api/Product';

const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
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

const ListRating: React.FC = () => {
	const classes = useStyles();
	const [dataEdit, setDataEdit] = React.useState<any>({
		id: 0,
		create: true,
		name: '',
		id_type: '',
		name_type: 0,
		startDate: '',
		finishDate: '',
	});
	const [anchorElActive, setAnchorElActive] = React.useState<null | HTMLElement>(null);
	const openActive = Boolean(anchorElActive);
	const handleClickActive = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElActive(event.currentTarget);
	};
	const handleCloseActive = () => {
		setAnchorElActive(null);
	};
	const [dataListTypeProduct, setDataListTypeProduct] = React.useState<any>([]);
	const [progressData, setProgressData] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(0);
	const [showTable, setShowTable] = useState(true);
	const [t] = useTranslation();
	const [valueActive, setValueActive] = useState({
		id: 0,
		value: 'Danh sach khuyen mai con thoi han',
	});
	const { idProduct } = useParams<{ idProduct?: string }>();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Page: 0,
		PageSize: 5,
		id_product: idProduct,
	});
	const [valChange, setValChange] = React.useState<any>('');
	const [data, setData] = React.useState<any[]>([]);
	const [flag, setFlag] = React.useState(false);
	const [totalDoc, setTotalDoc] = useState<number>(0);
	const [pageTB, setPageTB] = useState<number>(0);
	const [rowPage, setRowPage] = useState<number>(5);
	const column = [
		{
			name: 'stt',
			label: 'STT',
			options: {
				sort: false,
			},
		},
		{
			name: 'email',
			label: 'Email',
			options: {
				sort: false,
			},
		},
		{
			name: 'rating',
			label: 'Danh gia',
			options: {
				sort: false,
			},
		},
		{
			name: 'comment',
			label: 'Noi dung danh gia',
			options: {
				sort: false,
			},
		},
		{
			name: 'date',
			label: 'Ngay danh gia',
			options: {
				sort: false,
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
			text: 'File(s) selected',
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
			if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'manager') {
				Swal.fire({
					icon: 'error',
					title: 'Ban khong co quyen xem danh sach danh gia',
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
	const [rate, setRate] = React.useState({
		idRate: 0,
		value: 0,
	});
	const [dataProduct, setDataProduct] = React.useState<any>({});
	const [progressRating, setProgressRating] = React.useState(false);
	useEffect(() => {
		const fetchProductType = async () => {
			setProgressData(true);
			setTotalDoc(0);
			setData([]);
			setProgressRating(true);
			const getProductId = await ProductIdGet(idProduct);
			if (getProductId) {
				if (getProductId.errorCode === null) {
					setDataProduct(getProductId.data);
					setProgressRating(false);
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
		fetchProductType();
	}, [flag, refresh, idProduct]);
	React.useEffect(() => {
		const fetchRating = async () => {
			setProgressData(true);
			const fetchRatingList = await RatingPost({
				id: idProduct,
				page: filterSearch.Page + 1,
				pageSize: filterSearch.PageSize,
			});
			if (fetchRatingList) {
				if (fetchRatingList.errorCode === null) {
					console.log('fetchRatingList', fetchRatingList);
					setProgressData(false);
					setTotalDoc(fetchRatingList.data.total);

					const dataNew = fetchRatingList?.data?.listdata?.map((item: any, index: number) => {
						return {
							id: item.id,
							stt: index + 1,
							email: item.email_user,
							rating: item.rating,
							comment: item.comment,
							date: item.date,
						};
					});

					setData(dataNew);
				}
			}
		};
		fetchRating();
	}, [filterSearch, flag, refresh, idProduct]);
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

	return (
		<Container style={{ backgroundColor: '#f4f4f4', padding: 0 }}>
			{handleCheckToken()}
			{handleCheckIsadmin()}
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to={AppURL.ADMIN_HOME} className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang chu
						</Link>
						<Link to="/" className={classes.link}>
							San pham
						</Link>
						<Link to="/" className={classes.link}>
							Danh gia
						</Link>
						<Link to="/" className={classes.link}>
							{dataProduct?.item?.name}
						</Link>

						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>
				{progressRating ? (
					<Grid item xs={12} style={{ position: 'relative', marginBottom: '51px' }}>
						<CircularProgress
							color="secondary"
							style={{ position: 'absolute', top: '38%', left: '50%' }}
						/>
					</Grid>
				) : (
					<React.Fragment>
						<Grid item xs={8}>
							<Card variant="outlined" style={{ padding: '10px' }}>
								<Box>
									<Typography
										variant="h6"
										style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
									>
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
																Number((dataProduct?.rate?.rate5 / dataProduct.rate_number) * 100)
														  ) + Number(rate.idRate === 5 ? rate.value : 0)
												}
												//style={{ color: '#ffb400 !important' }}
											/>
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1" style={{ color: '#4c70ba', fontWeight: 'bold' }}>
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
																Number((dataProduct?.rate?.rate4 / dataProduct.rate_number) * 100)
														  ) + Number(rate.idRate === 4 ? rate.value : 0)
												}
											/>
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1" style={{ color: '#4c70ba', fontWeight: 'bold' }}>
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
																Number((dataProduct?.rate?.rate3 / dataProduct.rate_number) * 100)
														  ) + Number(rate.idRate === 3 ? rate.value : 0)
												}
											/>
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1" style={{ color: '#4c70ba', fontWeight: 'bold' }}>
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
																Number((dataProduct?.rate?.rate2 / dataProduct.rate_number) * 100)
														  ) + Number(rate.idRate === 2 ? rate.value : 0)
												}
											/>
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1" style={{ color: '#4c70ba', fontWeight: 'bold' }}>
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
																Number((dataProduct?.rate?.rate1 / dataProduct.rate_number) * 100)
														  ) + Number(rate.idRate === 1 ? rate.value : 0)
												}
											/>
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1" style={{ color: '#4c70ba', fontWeight: 'bold' }}>
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
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Box>
								<Collapse in={!showBoxSearch} timeout="auto" unmountOnExit>
									<Box style={{ textAlign: 'start' }}>
										{/* <Tooltip title="Tim kiem" placement="top">
                                <IconButton
                                    onClick={() => {
                                        setShowBoxSearch(true);
                                    }}
                                >
                                    <SearchIcon style={{ color: '#757575', fontSize: '24px' }} />
                                </IconButton>
                            </Tooltip> */}
										{/* <Tooltip title="Tao moi" placement="top">
                                <IconButton
                                    onClick={async () => {
                                        setTitleDialog('Tao moi khuyen mai');
                                        let arrStart = [];
                                        arrStart = new Date().toLocaleDateString('en-GB').split('/');
                                        setDataEdit({
                                            id_product: idProduct,
                                            name: '',
                                            create: true,
                                            code: '',
                                            value: '',
                                            startDate:
                                                `${arrStart[2]}-${arrStart[1]}-${arrStart[0]}` +
                                                ' ' +
                                                new Date().getHours() +
                                                ':' +
                                                new Date().getMinutes(),
                                            finishDate:
                                                `${arrStart[2]}-${arrStart[1]}-${arrStart[0]}` +
                                                ' ' +
                                                new Date().getHours() +
                                                ':' +
                                                new Date().getMinutes(),
                                        });
                                        setOpen(true);
                                    }}
                                >
                                    <AddIcon style={{ color: '#757575', fontSize: '24px' }} />
                                </IconButton>
                            </Tooltip> */}
										<Tooltip title="Tai lai" placement="top">
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
											placeholder="Nhap ten hoac id nguoi dung"
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
					</React.Fragment>
				)}
			</Grid>
			<Box mt={3}>
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
						selectableRows: 'none',

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
		</Container>
	);
};
export default ListRating;
