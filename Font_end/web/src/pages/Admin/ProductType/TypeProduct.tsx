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
} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import SearchBar from 'material-ui-search-bar';
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
import { Link, NavLink, Redirect, useHistory } from 'react-router-dom';
import {
	DeleteProductTypeGet,
	ProductTypeGet,
	SearchTypeProductGet,
} from '../../../api/Admin/Product';
import TypeProductEdit from './TypeProductEdit';
import jwtDecode from 'jwt-decode';

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
interface TypeProductProps {
	idCategory?: (result: any) => void;
}
const TypeProduct: React.FC<TypeProductProps> = (props) => {
	const classes = useStyles();
	const [dataEdit, setDataEdit] = React.useState<any>({ id: 0, name: '' });
	const [progressData, setProgressData] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(0);
	const [showTable, setShowTable] = useState(true);
	const [t] = useTranslation();
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Search: '',
		Page: 0,
		type: 'all',
		PageSize: 5,
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
			label: 'Ten',
			options: {
				sort: false,
			},
		},
		{
			name: 'created_at',
			label: 'Ngay tao',
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
			name: 'id',
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
								onClick={() => {
									setDataEdit({
										name: data[index].name,
										id: data[index].id,
									});
									setTitleDialog('Cap nhat thong tin loai san pham');
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
	const handleCheckIsadmin = () => {
		const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
		if (tokenAdmin) {
			const checkToken: any = jwtDecode(tokenAdmin);
			if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'manager') {
				Swal.fire({
					icon: 'error',
					title: 'Ban khong co quyen xem loai san pham',
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
	if (window.location.pathname.indexOf('type_product') !== -1) {
		props.idCategory?.(2);
	}
	useEffect(() => {
		const fetchProductType = async () => {
			setProgressData(true);
			setTotalDoc(0);
			setData([]);
			const result = await SearchTypeProductGet({
				page: filterSearch.Page + 1,
				pageSize: filterSearch.PageSize,
				search: filterSearch.Search,
			});
			if (result?.data?.listData) {
				const dataNew = result.data.listData?.map((item: any, index: number) => {
					return {
						id: item.id,
						stt: index + 1,
						name: item.name,
						created_at: item.created_at,
						updated_at: item.updated_at,
					};
				});

				setData(dataNew);
				setProgressData(false);
			}
			if (result?.data?.totalCount) {
				setTotalDoc(result?.data?.totalCount);
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
							Loai san pham
						</Link>
						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>

				<Grid item xs={12}>
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
								<Tooltip title="Tao moi" placement="top">
									<IconButton
										onClick={() => {
											setTitleDialog('Tao moi loai san pham');
											setDataEdit({ id: 0, name: '' });
											setOpen(true);
										}}
									>
										<AddIcon style={{ color: '#757575', fontSize: '24px' }} />
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
										children="DELETE"
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
														const response = await DeleteProductTypeGet(data[item.index].id);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire('Deleted!', `Da xoa thanh cong ${count} user`, 'success');

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
										children="DELETE"
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
														const response = await DeleteProductTypeGet(data[item.index].id);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire('Deleted!', `Da xoa thanh cong ${count} user`, 'success');

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
				<TypeProductEdit
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
export default TypeProduct;
