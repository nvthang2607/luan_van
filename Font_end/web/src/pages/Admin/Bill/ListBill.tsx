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
import { DeletePromotionDelete, ListPromotionGet } from '../../../api/Admin/Promotion';
import BillDetail from './BillDetail';
import {
	ApproveBillPost,
	CancelBillPost,
	DeleteProductBillPost,
	ListBillGet,
} from '../../../api/Admin/Bill';

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

const ListBill: React.FC = () => {
	const classes = useStyles();
	const [dataEdit, setDataEdit] = React.useState<any>({
		id_bill: 0,
		name_customer: '',
		email_customer: '',
		phone_customer: 0,
		total: 0,
		payment: '',
		status: 0,
		address_customer: '',
		gender_customer: '',
		bill_detail: [],
		bill_status: [],
		note: '',
		created_at: '',
	});
	const [dataProduct, setDataProduct] = React.useState<any>([
		{
			id_detail: 0,
			id_product: 0,
			image: '',
			price: 0,
			quantity: 0,
			name_product: '',
			stt: 0,
		},
	]);
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
		value: 'Danh sach tat ca don hang',
	});
	const { idProduct } = useParams<{ idProduct?: string }>();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Search: '',
		Page: 0,
		status: 0,
		PageSize: 5,
	});
	const [valChange, setValChange] = React.useState<any>('');
	const [data, setData] = React.useState<any[]>([]);
	const [flag, setFlag] = React.useState(false);
	const [progressBill, setProgressBill] = React.useState(false);
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
			name: 'id_bill',
			label: 'Ma don hang',
			options: {
				sort: false,
			},
		},
		{
			name: 'name_customer',
			label: 'Ten khach hang',
			options: {
				sort: false,
			},
		},

		{
			name: 'phone_customer',
			label: 'So dien thoai',
			options: {
				sort: false,
			},
		},

		{
			name: 'total',
			label: 'Tong gia tri don hang',
			options: {
				sort: false,
				customBodyRender: (total: number) => {
					return (
						<Typography variant="body1">
							{Intl.NumberFormat('en-US').format(Number(total))}đ
						</Typography>
					);
				},
			},
		},
		{
			name: 'status',
			label: 'Trang thai',
			options: {
				sort: false,
				customBodyRender: (status: number) => {
					if (status == 1) {
						return <Typography variant="body1">Don hang dang cho duyet</Typography>;
					} else if (status == 2) {
						return <Typography variant="body1">Don hang da duyet</Typography>;
					} else if (status == 3) {
						return <Typography variant="body1">Don hang dang van chuyen</Typography>;
					} else if (status == 4) {
						return <Typography variant="body1">Don hang da hoan thanh</Typography>;
					} else if (status == 5) {
						return <Typography variant="body1">Don hang da huy</Typography>;
					} else {
						return <Typography variant="body1">Dang cap nhat</Typography>;
					}
				},
			},
		},
		{
			name: 'created_at',
			label: 'Ngay mua hang',
			options: {
				sort: false,
			},
		},
		{
			name: 'updated_at',
			label: 'Ngay cap nhat',
			options: {
				sort: false,
			},
		},

		{
			name: 'id_bill',
			label: 'Hanh dong',
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
									const newData = data[index].bill_detail?.map((item: any, index: number) => {
										return {
											id_detail: item.id_detail,
											id_product: item.id_product,
											image: item.image.image,
											price: item.price,
											quantity: item.quantity,
											stt: index + 1,
											name_product: item.name_product,
										};
									});
									setDataProduct(newData);
									console.log('newData', newData);

									setDataEdit({
										id_bill: data[index].id_bill,
										name_customer: data[index].name_customer,
										email_customer: data[index].email_customer,
										phone_customer: data[index].phone_customer,
										total: data[index].total,
										payment: data[index].payment,
										address_customer: data[index].address_customer,
										gender_customer: data[index].gender_customer,
										bill_detail: data[index].bill_detail,
										bill_status: data[index].bill_status,
										status: data[index].status,
										note: data[index].note,
										created_at: data[index].created_at,
									});
									let result = '';
									if (data[index].status == 1) {
										result = 'Don hang dang cho duyet';
									} else if (data[index].status == 2) {
										result = 'Don hang da duyet';
									} else if (data[index].status == 3) {
										result = 'Don hang dang van chuyen';
									} else if (data[index].status == 4) {
										result = 'Don hang da hoan thanh';
									} else if (data[index].status == 5) {
										result = 'Don hang da huy';
									} else {
										result = 'Dang cap nhat';
									}
									setTitleDialog('Chi tiet don hang ' + `#${data[index].id_bill} - ${result} `);
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
			const result = await ListBillGet({
				page: filterSearch.Page + 1,
				pageSize: filterSearch.PageSize,
				search: filterSearch.Search,
				status: filterSearch.status,
			});
			console.log(result);
			if (result) {
				if (result.errorCode === null) {
					const statusValue = (item: any) => {
						let total = 0;
						if (item.bill_status.length > 0) {
							total = item.bill_status[item.bill_status.length - 1].status;
						} else {
							total = 1;
						}
						return total;
					};
					const dataNew = result.data.listData?.map((item: any, index: number) => {
						return {
							id_bill: item.id_bill,
							name_customer: item.name_customer,
							email_customer: item.email_customer,
							stt: index + 1,
							phone_customer: item.phone_customer,
							total: item.total,
							payment: item.payment,
							address_customer: item.address_customer,
							gender_customer: item.gender_customer,
							bill_detail: item.bill_detail,
							bill_status: item.bill_status,
							note: item.not,
							status: statusValue(item),
							created_at: item.created_at,
							updated_at: item.updated_at,
						};
					});

					setData(dataNew);
					setProgressData(false);
					setTotalDoc(result.data?.totalCount);
				}
			}
		};
		fetchProductType();
	}, [filterSearch, flag, refresh]);
	const create: (result: boolean, action: string, id_bill: any) => void = async (
		result,
		action,
		id_bill
	) => {
		if (result) {
			setOpen(false);
			if (action === 'duyet') {
				Swal.fire({
					title: 'Ban co chac muon duyet don hang nay khong?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					reverseButtons: true,
				}).then(async (result) => {
					if (result.isConfirmed) {
						setProgressBill(true);
						const response = await ApproveBillPost({ id_bill: id_bill });

						if (response) {
							if (response.errorCode === null) {
								Swal.fire({
									icon: 'success',
									title: 'Duyet don hang thanh cong',
								});
								setProgressBill(false);
								setFlag(!flag);
							} else if (response.errorCode === 4) {
								Swal.fire({
									icon: 'error',
									title: 'Khong du so luong',
									footer: response.data?.map((item: any) => {
										return `'<p>${item.name} hien con ${item.quantity} san pham</p>'`;
									}),
								});

								setProgressBill(false);
							} else {
								toast.error('Co loi xay ra');
								setOpen(true);
								setProgressBill(false);
							}
						}
					} else {
						setOpen(true);
					}
				});
				//setFlag(!flag);
			} else if (action === 'huy') {
				Swal.fire({
					title: 'Ban co chac muon huy don hang nay khong?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					reverseButtons: true,
				}).then(async (result) => {
					if (result.isConfirmed) {
						setProgressBill(true);
						const response = await CancelBillPost({ id_bill: id_bill });

						if (response) {
							if (response.errorCode === null) {
								Swal.fire({
									icon: 'success',
									title: 'Huy don hang thanh cong',
								});
								setProgressBill(false);
								setFlag(!flag);
							} else {
								toast.error('Co loi xay ra');
								setOpen(true);
								setProgressBill(false);
							}
						}
					} else {
						setOpen(true);
					}
				});
				//setFlag(!flag);
			} else if (action === 'delete') {
				Swal.fire({
					title: 'Ban co chac muon xoa san pham nay khong?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					reverseButtons: true,
				}).then(async (result) => {
					if (result.isConfirmed) {
						setProgressBill(true);
						const response = await DeleteProductBillPost({
							id_bill: dataEdit.id_bill,
							bill_detail: id_bill,
						});

						if (response) {
							if (response.errorCode === null) {
								Swal.fire({
									icon: 'success',
									title: 'Xoa san pham thanh cong',
								});
								setProgressBill(false);
								setFlag(!flag);
								//setOpen(true);
							} else {
								toast.error('Co loi xay ra');
								setOpen(true);
								setProgressBill(false);
							}
						}
					} else {
						setOpen(true);
					}
				});
				//setFlag(!flag);
			}
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
							Trang chu
						</Link>
						<Link to="/" className={classes.link}>
							San pham
						</Link>
						<Link to="/" className={classes.link}>
							Khuyen mai
						</Link>
						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>

				<Grid item xs={12}>
					{progressBill && (
						<CircularProgress
							color="secondary"
							style={{ position: 'fixed', top: '50%', left: '50%' }}
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
									setValueActive({ id: 0, value: 'Danh sach tat ca don hang' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										status: 0,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 0 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach tat ca don hang
									</Typography>
								) : (
									<Typography variant="body1">Danh sach tat ca don hang</Typography>
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
									setValueActive({ id: 1, value: 'Danh sach don hang dang cho duyet' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										status: 1,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 1 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach don hang dang cho duyet
									</Typography>
								) : (
									<Typography variant="body1">Danh sach don hang dang cho duyet</Typography>
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
									setValueActive({
										id: 2,
										value: 'Danh sach don hang da duyet va dang cho giao hang',
									});
									setFilterSearch({
										...filterSearch,
										Page: 0,
										status: 2,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 2 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach don hang da duyet va dang cho giao hang
									</Typography>
								) : (
									<Typography variant="body1">
										Danh sach don hang da duyet va dang cho giao hang
									</Typography>
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
							<MenuItem
								onClick={() => {
									setAnchorElActive(null);
									setValueActive({
										id: 3,
										value: 'Danh sach don hang dang cho thanh toan',
									});
									setFilterSearch({
										...filterSearch,
										Page: 0,
										status: 3,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 3 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach don hang dang cho thanh toan
									</Typography>
								) : (
									<Typography variant="body1">Danh sach don hang dang cho thanh toan</Typography>
								)}
								&nbsp;
								{valueActive.id === 3 && (
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
									setValueActive({
										id: 4,
										value: 'Danh sach don hang da hoan thanh',
									});
									setFilterSearch({
										...filterSearch,
										Page: 0,
										status: 4,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 4 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach don hang da hoan thanh
									</Typography>
								) : (
									<Typography variant="body1">Danh sach don hang da hoan thanh</Typography>
								)}
								&nbsp;
								{valueActive.id === 4 && (
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
									setValueActive({
										id: 5,
										value: 'Danh sach don hang da huy',
									});
									setFilterSearch({
										...filterSearch,
										Page: 0,
										status: 5,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 5 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach don hang da huy
									</Typography>
								) : (
									<Typography variant="body1">Danh sach don hang da huy</Typography>
								)}
								&nbsp;
								{valueActive.id === 5 && (
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
			<Dialog
				//disableBackdropClick
				//disableEscapeKeyDown
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="lg"
				scroll="body"
			>
				<BillDetail
					dataEdit={dataEdit}
					dataProduct={dataProduct}
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
export default ListBill;
