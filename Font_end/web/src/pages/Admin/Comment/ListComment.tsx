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
import Swal from 'sweetalert2';
import HomeIcon from '@material-ui/icons/Home';
import { Link, NavLink, Redirect } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DeleteNewsGet, ListNewsGet } from '../../../api/Admin/News';
import EditComment from './EditComment';
import { DeleteSlideDelete, ListSlideGet } from '../../../api/Admin/Slide';
import { CheckContactPost, ListContactGet } from '../../../api/Admin/Contact';
import { ListCommentGet, ListFeedbackGet } from '../../../api/Admin/Comment';
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

const ListComment: React.FC = () => {
	const classes = useStyles();
	const [dataEdit, setDataEdit] = React.useState<any>({});
	const [progressData, setProgressData] = useState(false);
	const [progressCheck, setProgressCheck] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [refresh, setRefresh] = React.useState(0);
	const [t] = useTranslation();
	const [valueActive, setValueActive] = useState({
		id: 3,
		value: 'Danh sach tat ca lien he',
	});
	const [filterSearch, setFilterSearch] = React.useState<any>({
		Search: '',
		Page: 0,
		PageSize: 5,
		check: '',
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
			name: 'id_product',
			label: 'Id san pham',
			options: {
				sort: false,
			},
		},
		{
			name: 'name_product',
			label: 'Ten san pham',
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
							<Button
								variant="text"
								color="secondary"
								style={{ textTransform: 'inherit' }}
								onClick={async () => {
									//setProgressCheck(true);
									setDataEdit(data[index]);

									setOpen(true);
									// const response = await ListFeedbackGet({
									// 	id_comment: data[index].id_comment,
									// 	page: 1,
									// 	pageSize: 10,
									// });

									// if (response) {
									// 	if (response.errorCode === null) {
									// 		setProgressCheck(false);
									// 		//setFlag(!flag);
									// 		// let dataNew: any = [];
									// 		// dataNew = data;
									// 		// dataNew[index].check = 1;
									// 		setOpen(true);
									// 	} else {
									// 		Swal.fire({
									// 			icon: 'error',
									// 			title: 'Co loi xay ra',
									// 		});
									// 	}
									// }
								}}
								disabled={progressCheck}
							>
								Xem
							</Button>
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

	useEffect(() => {
		const fetchUser = async () => {
			setProgressData(true);
			setTotalDoc(0);
			setData([]);
			const result = await ListCommentGet({
				page: filterSearch.Page + 1,
				pageSize: filterSearch.PageSize,
				search: filterSearch.Search,
				//check: filterSearch.check,
			});
			if (result?.data?.listdata) {
				const dataNew = result?.data?.listdata?.map((item: any, index: number) => {
					return {
						name_product: item.name_product,
						stt: index + 1,
						name: item.name,
						email: item.email,
						id_product: item.id_product,
						comment: item.comment,
						id_comment: item.id_comment,
						created_at: item.created_at,
						updated_at: item.updated_at,
					};
				});

				setData(dataNew);
				setProgressData(false);
				console.log('comment', result);
			}
			if (result?.data?.total) {
				setTotalDoc(result?.data?.total);
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
	const [dataEditImage, setDataEditImage] = React.useState<any>([]);
	const [anchorElActive, setAnchorElActive] = React.useState<null | HTMLElement>(null);
	const openActive = Boolean(anchorElActive);
	const handleClickActive = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElActive(event.currentTarget);
	};
	const handleCloseActive = () => {
		setAnchorElActive(null);
	};
	const [idComment, setIdComment] = React.useState(0);
	const handleCheckIsadmin = () => {
		const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
		if (tokenAdmin) {
			const checkToken: any = jwtDecode(tokenAdmin);
			if (checkToken.isAdmin !== 'admin' && checkToken.isAdmin !== 'manager') {
				Swal.fire({
					icon: 'error',
					title: 'Ban khong co quyen xem danh sach binh luan',
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
			{handleCheckIsadmin()}
			{handleCheckToken()}
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Breadcrumbs aria-label="breadcrumb">
						<Link to={AppURL.ADMIN_HOME} className={classes.link}>
							<HomeIcon className={classes.icon} />
							Trang chu
						</Link>
						<Link to="/" className={classes.link}>
							Quan tri binh luan
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
				{progressCheck && (
					<CircularProgress
						color="secondary"
						style={{ position: 'fixed', top: '50%', left: '50%' }}
					/>
				)}

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
									setValueActive({ id: 3, value: 'Danh sach tat ca lien he' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										check: '',
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 3 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach tat ca lien he
									</Typography>
								) : (
									<Typography variant="body1">Danh sach tat ca lien he</Typography>
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
									setValueActive({ id: 0, value: 'Danh sach lien he chua xem' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										check: 0,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 0 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach lien he chua xem
									</Typography>
								) : (
									<Typography variant="body1">Danh sach lien he chua xem</Typography>
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
									setValueActive({ id: 1, value: 'Danh sach lien he da xem' });
									setFilterSearch({
										...filterSearch,
										Page: 0,
										check: 1,
									});
									setPageTB(0);
								}}
							>
								{valueActive.id === 1 ? (
									<Typography variant="body1" style={{ fontWeight: 'bold' }}>
										Danh sach lien he da xem
									</Typography>
								) : (
									<Typography variant="body1">Danh sach lien he da xem</Typography>
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
				maxWidth="md"
			>
				<EditComment dataEdit={dataEdit} cancel={cancel} create={create} id_comment={idComment} />
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
export default ListComment;
