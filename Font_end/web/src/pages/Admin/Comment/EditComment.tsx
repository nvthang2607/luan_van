import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Collapse,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputBaseComponentProps,
	LinearProgress,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
	Typography,
} from '@material-ui/core';
import {
	EditorState,
	convertToRaw,
	convertFromHTML,
	ContentState,
	DraftBlockRenderMap,
	ContentBlock,
	CompositeDecorator,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDropzone } from 'react-dropzone';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sp1 from './../../public/images/10047676-dien-thoai-vsmart-aris-8gb-128gb-xam-nhat-thuc-1.jpg';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { toast, ToastContainer } from 'react-toastify';
import { Close } from '@material-ui/icons';
import theme from '../../../utils/theme';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import Swal from 'sweetalert2';
import { CityGet, CommunePost, DistrictPost } from '../../../api/Address';
import { UpdateUserPost } from '../../../api/Admin/User';
import {
	CreateImagePost,
	CreateInformationPost,
	CreateProductPost,
	CreateProductTypePost,
	DeleteImageDelete,
	DeleteInformationDelete,
	EditProductTypePost,
	UpdateDescriptionPatch,
	UpdateImagePost,
	UpdateInformationPatch,
} from '../../../api/Admin/Product';
import CloseIcon from '@mui/icons-material/Close';
import { Menu, MenuItem, Pagination, Select } from '@mui/material';
import clsx from 'clsx';
import NumberFormat from 'react-number-format';
import { display } from '@mui/system';
import { CreateNewsPost, UpdateNewsPost } from '../../../api/Admin/News';
import { CreateSlidePost, UpdateSlidePost } from '../../../api/Admin/Slide';
import { CreateFeedbackPost, ListFeedbackGet } from '../../../api/Admin/Comment';
import { ListCommentPost } from '../../../api/Comment';
interface ProfileInfoProps {
	dataEdit?: any;
	dataEditImage?: any;
	cancel?: (result: boolean) => void;
	create?: (result: boolean) => void;
	titleDialog?: string;
	id_comment?: any;
}
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	discount_percent: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
	},
	reply: { color: 'blue', cursor: 'pointer', display: 'contents', '&:hover': { color: 'grey' } },
	errorContent: { border: '2px solid red' },
	titleInput: {
		fontWeight: 'bold',
		'&::after': {
			content: '"*"',
			display: 'inline-block',
			marginLeft: '5px',
			position: 'relative',
			bottom: '5px',
			color: theme.palette.secondary.main,
		},
	},
	displayDeleteImage: {
		display: 'block !important',
	},
	displayDeleteInformation: {
		display: 'block !important',
	},
	test: {
		display: 'none !important',
	},
	titleText: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		paddingLeft: '10px',
		marginBottom: '33px',
	},
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
	button: {},
	activeTagLi: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		color: `${theme.palette.primary.main} !important`,
	},
	tagLi: {
		paddingLeft: '35px',
	},
}));
interface NumberFormatCustomProps {
	inputRef: (instance: NumberFormat | null) => void;
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
	prefix: any;
}
function NumberFormatCustom(props: NumberFormatCustomProps) {
	const { inputRef, onChange, prefix, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			prefix={prefix}
		/>
	);
}
const EditComment: React.FC<ProfileInfoProps> = (props) => {
	const textToConvert = props?.dataEdit?.content || '';
	const blocksFromHTML = htmlToDraft(textToConvert);

	// const decorator = new CompositeDecorator([
	// 	{
	// 		strategy: findLinkEntities,
	// 		component: Link,
	// 	},
	// 	{
	// 		strategy: findImageEntities,
	// 		component: Image,
	// 	},
	// ]);
	const [editorState, setEditorState] = React.useState<any>(
		EditorState.createWithContent(
			ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
		)
	);

	const classes = useStyles();
	const [valueFilter, setValueFilter] = React.useState({
		id: 0,
		value: 'Tat ca san pham',
		type: 'all',
	});
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const openFilter = Boolean(anchorEl);
	const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseFilter = () => {
		setAnchorEl(null);
	};

	const [data, setData] = React.useState<any>([]);
	const [valueCmt, setValueCmt] = React.useState<any>('');
	const [progressCmt, setProgressCmt] = React.useState(false);
	const [refreshCmt, setRefreshCmt] = React.useState(0);
	const [idCmt, setIdCmt] = React.useState(0);
	const [pageCmt, setPageCmt] = React.useState(1);
	const [collapseReply, setCollapseReply] = React.useState(false);
	const [total, setTotal] = React.useState(0);
	React.useEffect(() => {
		const fetchFeedback = async () => {
			setProgressCmt(true);
			setData([]);
			const response = await ListCommentPost({
				id: props?.dataEdit.id_product,
				page: pageCmt,
				pageSize: 10,
			});
			if (response) {
				if (response?.errorCode === null) {
					setData(response?.data?.listdata);
					setProgressCmt(false);
					setTotal(response.data.total);
				}
			}
		};
		fetchFeedback();
	}, [props?.dataEdit.id_product, refreshCmt, pageCmt]);
	console.log('data', data);
	return (
		<React.Fragment>
			<IconButton
				className={classes.closeButton}
				onClick={() => {
					props.cancel?.(false);
				}}
			>
				<Close />
			</IconButton>

			<DialogTitle>
				<Typography variant="h5">Noi dung binh luan</Typography>
			</DialogTitle>
			<DialogContent dividers style={{ minHeight: '201px' }}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography
							variant="h5"
							className={classes.titleText}
							gutterBottom
							style={{ marginTop: '10px' }}
						>
							Hoi & Dap{' '}
							<Typography component="span" className={classes.discount_percent}>
								co {total} binh luan
							</Typography>
							<Button
								variant="text"
								className={classes.discount_percent}
								onClick={() => {
									setRefreshCmt(refreshCmt + 1);
								}}
								style={{
									marginLeft: '10px',
									backgroundColor: '#d32f2f',
									textTransform: 'inherit',
									padding: '0',
								}}
							>
								Tai lai
							</Button>
						</Typography>
					</Grid>
					<Grid item xs={12}>
						{progressCmt ? (
							<CircularProgress
								color="secondary"
								style={{ position: 'absolute', top: '50%', left: '50%' }}
							/>
						) : (
							data?.map((item: any) => {
								return (
									<Box>
										<Box style={{ display: 'flex', alignItems: 'center' }}>
											<Avatar>{item?.email_comment?.charAt(0)}</Avatar> &nbsp;&nbsp;
											<Typography variant="h6" style={{ fontWeight: 'bold' }}>
												{item?.email_comment.slice(0, item?.email_comment.indexOf('@'))}
											</Typography>
											&nbsp;&nbsp;
											<Typography color="textSecondary">vao ngay {item?.date}</Typography>
										</Box>
										<Box style={{ marginLeft: '39px', marginBottom: '10px' }}>
											<Typography>{item?.comment_comment}</Typography>
											<Typography
												className={classes.reply}
												onClick={() => {
													setCollapseReply(!collapseReply);
													if (idCmt === item.id_comment) {
														setIdCmt(0);
													} else {
														setIdCmt(item.id_comment);
														setValueCmt('');
													}
												}}
											>
												Tra loi
											</Typography>
										</Box>
										{item?.feedback?.map((itemFeedback: any) => {
											return (
												<Box
													style={{
														marginLeft: '60px',
														borderLeft: '5px solid #dee2e6',
														paddingLeft: '10px',
														marginBottom: '10px',
													}}
												>
													<Typography style={{ display: 'flex', alignItems: 'center' }}>
														<Typography variant="h6">
															{itemFeedback.email_feedback.slice(
																0,
																itemFeedback.email_feedback.indexOf('@')
															)}
														</Typography>
														&nbsp;&nbsp;
														{itemFeedback.isadmin === 'admin' && (
															<Typography
																component="span"
																className={classes.discount_percent}
																style={{ fontSize: '11px', marginRight: '10px' }}
															>
																Quan tri vien
															</Typography>
														)}
														<Typography color="textSecondary">
															vao ngay {itemFeedback.date}
														</Typography>
													</Typography>
													<Typography>{itemFeedback.comment_feedback}</Typography>
												</Box>
											);
										})}
										<Box
											style={{
												marginLeft: '60px',

												paddingLeft: '10px',
												marginBottom: '10px',
											}}
										>
											<Collapse
												in={idCmt === item.id_comment ? true : false}
												timeout="auto"
												unmountOnExit
											>
												<Box style={{ display: 'contents' }}>
													<Box style={{ display: 'inline-block', width: '100%' }}>
														<TextField
															id="comment"
															value={valueCmt}
															multiline
															name="comment"
															rows={3}
															placeholder="Nhập noi dung tra loi"
															variant="outlined"
															fullWidth
															onChange={(e) => {
																setValueCmt(e.target.value);
															}}
															style={{ marginBottom: '10px' }}
														/>
														<Button
															variant="contained"
															color="primary"
															disabled={progressCmt}
															onClick={async () => {
																if (valueCmt === '') {
																	Swal.fire({
																		icon: 'error',
																		title: 'Noi dung khong de trong',
																	});
																} else {
																	setProgressCmt(true);
																	const response = await CreateFeedbackPost({
																		comment: valueCmt,
																		id_comment: item.id_comment,
																	});
																	if (response) {
																		if (response.errorCode === null) {
																			toast.success('Gui cau tra loi thanh cong');
																			setRefreshCmt(refreshCmt + 1);
																			setProgressCmt(false);
																			setValueCmt('');
																		} else {
																			toast.error('Co loi xay ra');
																			setProgressCmt(false);
																		}
																	}
																}
															}}
														>
															gui cau tra loi
														</Button>
													</Box>
												</Box>
											</Collapse>
										</Box>
									</Box>
								);
							})
						)}
						{total > 10 && (
							<Box
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									marginTop: ' 30px',
								}}
							>
								<Pagination
									count={Math.ceil(total / 10)}
									variant="outlined"
									color="primary"
									defaultPage={pageCmt}
									onChange={(event: object, page: number) => {
										setPageCmt(page);
									}}
								/>
							</Box>
						)}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="secondary"
						//disabled={true}
						style={{ position: 'relative', textTransform: 'inherit' }}
						onClick={() => {
							props.cancel?.(false);
						}}
					>
						Dong
						{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
					</Button>
				</Grid>
			</DialogActions>

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
		</React.Fragment>
	);
};
export default EditComment;
