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
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Close } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { AppURL } from './../../../utils/const';
import DeleteIcon from '@material-ui/icons/Delete';

import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import MUIDataTableComponent from '../../../Components/Table/MUIDataTableComponent';
import { ActiveUserGet, DeleteUserGet, SearchUserGet, UserPost } from '../../../api/Admin/User';
import AddIcon from '@mui/icons-material/Add';
import EditEmployee from './EditEmployee';
import Swal from 'sweetalert2';
import HomeIcon from '@material-ui/icons/Home';
import { Link, NavLink, Redirect } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Menu, MenuItem } from '@mui/material';
import { DeleteEmployeeGet, SearchEmployeeGet } from '../../../api/Admin/Employee';
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

const ListEmployee: React.FC = () => {
	const classes = useStyles();
	const [profileInfo, setProfileInfo] = React.useState<any>({});
	const [progressData, setProgressData] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(0);
	const [t] = useTranslation();
	const [valueActive, setValueActive] = useState({
		id: 0,
		value: 'Danh s??ch nh??n vi??n ??ang ???????c k??ch ho???t',
	});
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Search: '',
		Page: 0,
		PageSize: 5,
		type: 'active',
	});
	const [valChange, setValChange] = React.useState<any>('');
	const [data, setData] = React.useState<any[]>([]);
	const [flag, setFlag] = React.useState(false);
	const [totalDoc, setTotalDoc] = useState<number>(0);
	const [pageTB, setPageTB] = useState<number>(0);
	const [rowPage, setRowPage] = useState<number>(5);
	const nameManager = (isadmin: string) => {
		let name = '';
		if (isadmin === 'admin') {
			name = 'Admin';
		} else if (isadmin === 'manager') {
			name = 'Qu???n l??';
		} else if (isadmin === 'warehouse') {
			name = 'Qu???n l?? kho';
		} else if (isadmin === 'merchandiser') {
			name = 'Qu???n l?? ????n h??ng';
		}
		return name;
	};
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
			name: 'gender',
			label: 'Gi???i t??nh',
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
			name: 'phone',
			label: 'S??? ??i???n tho???i',
			options: {
				sort: false,
			},
		},
		{
			name: 'address',
			label: '?????a ch???',
			options: {
				sort: false,
			},
		},
		{
			name: 'isadmin',
			label: 'Ch???c v???',
			options: {
				sort: false,
				customBodyRender: (isadmin: string) => {
					return <Typography variant="body1">{nameManager(isadmin)}</Typography>;
				},
			},
		},
		{
			name: 'created_at',
			label: 'Ng??y ????ng k??',
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
								onClick={() => {
									console.log(data[index]);
									setTitleDialog('C???p nh???t th??ng tin nh??n vi??n');
									setProfileInfo({
										phone: data[index].phone,
										name: data[index].name,
										gender: data[index].gender,
										idCity: data[index].idCity,
										idDistrict: data[index].idDistrict,
										idCommune: data[index].idCommune,
										email: data[index].email,
										nameCity: data[index].nameCity,
										nameDistrict: data[index].nameDistrict,
										nameCommune: data[index].nameCommune,
										id: data[index].id,
										password: '12345678',
										retypePassword: '12345678',
										isadmin: data[index].isadmin,
									});
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
	const [dataEdit, setDataEdit] = React.useState<any>({});
	useEffect(() => {
		const fetchUser = async () => {
			setProgressData(true);
			setTotalDoc(0);
			setData([]);
			const result = await SearchEmployeeGet({
				page: filterSearch.Page + 1,
				pageSize: filterSearch.PageSize,
				search: filterSearch.Search,
				type: filterSearch.type,
			});
			if (result?.data?.listData) {
				const dataNew = result.data.listData?.map((item: any, index: number) => {
					return {
						id: item.id,
						stt: index + 1,
						name: item.name,
						gender: item.gender,
						email: item.email,
						phone: item.phone,
						address: item.nameCommune + ' ' + item.nameDistrict + ' ' + item.nameCity,
						created_at: item.created_at,
						updated_at: item.updated_at,
						idCity: item.idCity,
						idDistrict: item.idDistrict,
						idCommune: item.idCommune,
						nameCommune: item.nameCommune,
						nameDistrict: item.nameDistrict,
						nameCity: item.nameCity,
						isadmin: item.isadmin,
					};
				});

				setData(dataNew);
				setProgressData(false);
			}
			if (result?.data?.totalCount) {
				setTotalDoc(result?.data?.totalCount);
			}
		};
		fetchUser();
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
	const [showTable, setShowTable] = useState(true);
	const [anchorElActive, setAnchorElActive] = React.useState<null | HTMLElement>(null);
	const openActive = Boolean(anchorElActive);
	const handleClickActive = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElActive(event.currentTarget);
	};
	const handleCloseActive = () => {
		setAnchorElActive(null);
	};
	const handleCheckIsadmin = () => {
		const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
		if (tokenAdmin) {
			const checkToken: any = jwtDecode(tokenAdmin);
			if (checkToken.isAdmin !== 'admin') {
				Swal.fire({
					icon: 'error',
					title: 'B???n kh??ng c?? quy???n xem danh s??ch nh??n vi??n',
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
						<Link to="/" className={classes.link}>
							Qu???n tr??? nh??n vi??n
						</Link>
						{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm V??ng Ch??nh H??ng Ch??a K??ch Tr??i BH Apple Watch SE GPS 40mm
					</Link> */}
					</Breadcrumbs>
				</Grid>

				<Grid item xs={12}>
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
											setTitleDialog('T???o m???i nh??n vi??n');
											setProfileInfo({
												phone: '',
												name: '',
												gender: 'Nam',
												idCity: '',
												idDistrict: '',
												idCommune: '',
												email: '',
												nameCity: '',
												nameDistrict: '',
												nameCommune: '',
												password: '',
												retypePassword: '',
												id: 0,
												isadmin: 'manager',
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
									placeholder="Nh???p t??n nh??n vi??n"
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
									setValueActive({ id: 0, value: 'Danh s??ch nh??n vi??n ??ang ???????c k??ch ho???t' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										type: 'active',
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 0 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh s??ch nh??n vi??n ??ang ???????c k??ch ho???t
									</Typography>
								) : (
									<Typography variant="body1">Danh s??ch nh??n vi??n ??ang ???????c k??ch ho???t</Typography>
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
									setValueActive({ id: 1, value: 'Danh s??ch nh??n vi??n ??ang t???m kh??a' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										type: 'noactive',
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 1 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh s??ch nh??n vi??n ??ang t???m kh??a
									</Typography>
								) : (
									<Typography variant="body1">Danh s??ch nh??n vi??n ??ang t???m kh??a</Typography>
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
										children={valueActive.id === 0 ? 'X??a' : 'Kh??i ph???c'}
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
														const response = await DeleteEmployeeGet(data[item.index].id);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire(
																'Deleted!',
																`???? x??a th??nh c??ng ${count} nh??n vi??n`,
																'success'
															);

															selectedRows.data = [];
															selectedRows.lookup = {};
															setSelectedRows = [];
															setFlag(!flag);
															setShowTable(false);
														}
													});
													// selectedRows.data = [];
													// selectedRows.lookup = {};
													// setFlag(!flag);
													// setSelectedRows = [];
													// setShowTable(false);
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
										children={valueActive.id === 0 ? 'X??a' : 'Kh??i ph???c'}
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
														const response = await DeleteEmployeeGet(data[item.index].id);
														if (response) {
															if (response.errorCode === null) {
																count++;
															}
														}
														if (count === selectedRows.data?.length) {
															Swal.fire(
																'Deleted!',
																`???? x??a th??nh c??ng ${count} nh??n vi??n`,
																'success'
															);

															selectedRows.data = [];
															selectedRows.lookup = {};
															setSelectedRows = [];
															setFlag(!flag);
															setShowTable(true);
														}
													});
													// selectedRows.data = [];
													// selectedRows.lookup = {};
													// setFlag(!flag);
													// setShowTable(true);
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
				maxWidth="md"
			>
				<EditEmployee
					profileInfo={profileInfo}
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
export default ListEmployee;
