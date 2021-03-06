import React, { useState } from 'react';
import {
	Box,
	Breadcrumbs,
	Button,
	CircularProgress,
	Collapse,
	Container,
	Dialog,
	DialogActions,
	DialogTitle,
	Grid,
	IconButton,
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
	ListTypeProductGet,
	ProductTypeGet,
	SearchBrandProductGet,
} from '../../../api/Admin/Product';
import jwtDecode from 'jwt-decode';
import EditProductPromotion from './EditProductPromotion';
import { DeletePromotionDelete, ListPromotionGet } from '../../../api/Admin/Promotion';

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

const ProductPromotion: React.FC = () => {
	const classes = useStyles();
	const [dataEdit, setDataEdit] = React.useState<any>({
		id: 0,
		create: true,
		name: '',
		id_type: '',
		name_type: 0,
		startDate: '',
		finishDate: '',
		minDate: '',
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
		value: 'Danh s??ch khuy???n m??i c??n th???i h???n',
	});
	const { idProduct } = useParams<{ idProduct?: string }>();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Search: '',
		Page: 0,
		type: 1,
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
			name: 'name',
			label: 'T??n',
			options: {
				sort: false,
			},
		},
		{
			name: 'code',
			label: 'M?? code',
			options: {
				sort: false,
			},
		},
		{
			name: 'value',
			label: 'Gi???m gi??',
			options: {
				sort: false,
				customBodyRender: (value: number) => {
					return (
						<Typography variant="body1">
							{Intl.NumberFormat('en-US').format(Number(value))}??
						</Typography>
					);
				},
			},
		},
		{
			name: 'start',
			label: 'Ng??y b???t ?????u',
			options: {
				sort: false,
			},
		},
		{
			name: 'finish',
			label: 'Ng??y k???t th??c',
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
			name: 'id',
			label: 'H??nh ?????ng',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (index: number) => {
					return (
						<React.Fragment>
							<i
								className="fa fa-pencil-square-o"
								aria-hidden="true"
								style={{ fontSize: '30px', cursor: 'pointer' }}
								onClick={async () => {
									let arrStart = [];
									arrStart = new Date(data[index].start).toLocaleDateString('en-GB').split('/');
									let arrFinish = [];
									arrFinish = new Date(data[index].finish).toLocaleDateString('en-GB').split('/');

									setDataEdit({
										name: data[index].name,
										create: false,
										id: data[index].id,
										code: data[index].code,
										value: data[index].value,
										id_product: data[index].id_product,
										minDate:
											`${arrStart[2]}-${arrStart[1]}-${arrStart[0]}` +
											' ' +
											new Date().getHours() +
											':' +
											new Date().getMinutes(),
										startDate:
											`${arrStart[2]}-${arrStart[1]}-${arrStart[0]}` +
											' ' +
											new Date(data[index].start).getHours() +
											':' +
											new Date(data[index].start).getMinutes(),
										finishDate:
											`${arrFinish[2]}-${arrFinish[1]}-${arrFinish[0]}` +
											' ' +
											new Date(data[index].finish).getHours() +
											':' +
											new Date(data[index].finish).getMinutes(),
									});
									setTitleDialog('C???p nh???t th??ng tin khuy???n m??i');
									setOpen(true);
								}}
							></i>
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
			const result = await ListPromotionGet({
				page: filterSearch.Page + 1,
				pageSize: filterSearch.PageSize,
				search: filterSearch.Search,
				type: filterSearch.type,
				id_product: filterSearch.id_product,
			});
			console.log(result);
			if (result) {
				if (result.errorCode === null) {
					const dataNew = result.data?.map((item: any, index: number) => {
						return {
							id: item.id,
							name: item.name,
							code: item.code,
							id_product: item.id_product,
							stt: index + 1,
							value: item.value,
							start: item.start,
							finish: item.finish,
							created_at: item.created_at,
							updated_at: item.updated_at,
						};
					});

					setData(dataNew);
					setProgressData(false);
					setTotalDoc(result?.totalCount);
				}
			}
		};
		fetchProductType();
	}, [filterSearch, flag, refresh]);
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
	const [progressListTypeProduct, setProgressListTypeProduct] = useState(false);

	return (
		<Container style={{ backgroundColor: '#f4f4f4', padding: 0 }}>
			{handleCheckToken()}
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to={AppURL.ADMIN_HOME} className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang ch???
						</Link>
						<Link to="/" className={classes.link}>
							S???n ph???m
						</Link>
						<Link to="/" className={classes.link}>
							Khuy???n m??i
						</Link>
						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm V??ng Ch??nh H??ng Ch??a K??ch Tr??i BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>

				<Grid item xs={12}>
					{progressListTypeProduct && (
						<CircularProgress
							color="secondary"
							style={{ position: 'fixed', top: '38%', left: '50%' }}
						/>
					)}
					<Box>
						<Collapse in={!showBoxSearch} timeout="auto" unmountOnExit>
							<Box style={{ textAlign: 'end' }}>
								<Tooltip title="Tim kiem" placement="top">
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
											setTitleDialog('T???o m???i khuy???n m??i');
											let arrStart = [];
											arrStart = new Date().toLocaleDateString('en-GB').split('/');
											setDataEdit({
												id_product: idProduct,
												name: '',
												create: true,
												code: '',
												value: '',
												minDate:
													`${arrStart[2]}-${arrStart[1]}-${arrStart[0]}` +
													' ' +
													new Date().getHours() +
													':' +
													new Date().getMinutes(),
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
									placeholder="Nh???p m?? code"
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
									setValueActive({ id: 0, value: 'Danh s??ch khuy???n m??i c??n th???i h???n' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										type: 1,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 0 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh s??ch khuy???n m??i c??n th???i h???n&nbsp;
									</Typography>
								) : (
									<Typography variant="body1">Danh s??ch khuy???n m??i c??n th???i h???n</Typography>
								)}

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
									setValueActive({ id: 1, value: 'Danh s??ch khuy???n m??i ???? h???t h???n' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										type: 2,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 1 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh s??ch khuy???n m??i ???? h???t h???n
									</Typography>
								) : (
									<Typography variant="body1">Danh s??ch khuy???n m??i ???? h???t h???n</Typography>
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
							<MenuItem
								onClick={() => {
									setAnchorElActive(null);
									setValueActive({ id: 2, value: 'Danh s??ch khuy???n m??i s???p ?????n' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										type: 3,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 2 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh s??ch khuy???n m??i s???p ?????n
									</Typography>
								) : (
									<Typography variant="body1">Danh s??ch khuy???n m??i s???p ?????n</Typography>
								)}
								&nbsp;
								{valueActive.id === 2 && (
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
										children="X??a"
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
														const response = await DeletePromotionDelete(data[item.index].id);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire(
																'Deleted!',
																`???? x??a th??nh c??ng ${count} m?? khuy???n m??i`,
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
										children="X??a"
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
														const response = await DeletePromotionDelete(data[item.index].id);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire(
																'Deleted!',
																`???? x??a th??nh c??ng ${count} m?? khuy???n m??i`,
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
			>
				<EditProductPromotion
					dataEdit={dataEdit}
					cancel={cancel}
					create={create}
					titleDialog={titleDialog}
				/>
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
export default ProductPromotion;
