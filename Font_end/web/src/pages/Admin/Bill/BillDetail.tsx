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
	LinearProgress,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core';
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
import {
	KeyboardDatePicker,
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Close } from '@material-ui/icons';
import theme from '../../../utils/theme';
import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import Swal from 'sweetalert2';
import { CityGet, CommunePost, DistrictPost } from '../../../api/Address';
import { UpdateUserPost } from '../../../api/Admin/User';
import {
	CreateBrandProductPost,
	CreateProductTypePost,
	EditBrandProductPatch,
	EditProductTypePost,
} from '../../../api/Admin/Product';
import NumberFormat from 'react-number-format';
import { CreatePromotionPost, UpdatePromotionPatch } from '../../../api/Admin/Promotion';
import MUIDataTableComponent from '../../../Components/Table/MUIDataTableComponent';
interface ProfileInfoProps {
	dataEdit?: any;
	dataProduct?: any;
	cancel?: (result: boolean) => void;
	create?: (result: boolean, action: string, id_bill: any) => void;
	titleDialog?: string;
}
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	titleInput: {
		'&::after': {
			content: '"*"',
			display: 'inline-block',
			marginLeft: '5px',
			position: 'relative',
			bottom: '5px',
			color: theme.palette.secondary.main,
		},
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
		textDecoration: 'none',
		cursor: 'pointer',
		color: 'black',
		padding: '8px',
		display: 'block',
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
const BillDetail: React.FC<ProfileInfoProps> = (props) => {
	const classes = useStyles();
	const [valueEdit, setValueEdit] = React.useState<any>(props.dataEdit);
	const [showBoxHistory, setShowBoxHistory] = React.useState(false);

	const column = [
		{
			name: 'stt',
			label: 'STT',
			options: {
				sort: false,
			},
		},

		{
			name: 'image',
			label: 'H??nh ???nh',
			options: {
				sort: false,
				customBodyRender: (image: any) => {
					return <img width="104px" src={`http://localhost:8000${image}`} />;
				},
			},
		},
		{
			name: 'name_product',
			label: 'T??n s???n ph???m',
			options: {
				sort: false,
			},
		},

		{
			name: 'price',
			label: 'Gi??',
			options: {
				sort: false,
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
			name: 'id_detail',
			label: 'H??nh ?????ng',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (index: number) => {
					return (
						<React.Fragment>
							<Button
								onClick={async () => {
									props.create?.(true, 'delete', props.dataProduct[index].id_detail);
								}}
								disabled={props.dataEdit?.status == 1 ? false : true}
							>
								<IconButton>
									<i
										className="fa fa-trash"
										aria-hidden="true"
										style={{ fontSize: '30px', cursor: 'pointer' }}
									></i>
								</IconButton>
							</Button>
						</React.Fragment>
					);
				},
			},
		},
	];
	const textTable = {
		body: {
			noMatch: 'Kh??ng c?? s???n ph???m',
		},
	};
	const schema = yup.object().shape({
		name: yup.string().required('T??n kh??ng ????? tr???ng'),
		code: yup.string().required('code kh??ng ????? tr???ng'),
		value: yup
			.number()
			.typeError('Price must specify a number')
			.min(0, 'price_must_be_greater_than_or_equal_to_0'),
	});

	const {
		register,
		control,
		handleSubmit,
		reset,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: valueEdit,
	});

	console.log('props.dataEdit', props.dataEdit);
	const statusValue = (item: any) => {
		let result = '';
		if (item.status == 1) {
			result = '????n h??ng ??ang ch??? duy???t';
		} else if (item.status == 2) {
			result = '????n h??ng ???? duy???t';
		} else if (item.status == 3) {
			result = '????n h??ng ??ang v???n chuy???n';
		} else if (item.status == 4) {
			result = '????n h??ng ???? ho??n th??nh';
		} else if (item.status == 5) {
			result = '????n h??ng ???? h???y';
		} else {
			result = '??ang c???p nh???t';
		}
		return result;
	};
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
				<Typography variant="h5">{props.titleDialog}</Typography>
			</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography component="span" style={{ fontWeight: 'bold' }}>
							Ng??y ?????t h??ng:{' '}
						</Typography>
						<Typography component="span">{props.dataEdit.created_at}</Typography>
					</Grid>
					{props.dataEdit.bill_status?.length > 0 && (
						<Grid item xs={12}>
							<Button
								variant="text"
								style={{ fontWeight: 'bold', color: 'red', textTransform: 'inherit' }}
								onClick={() => setShowBoxHistory(!showBoxHistory)}
							>
								Xem l???ch s??? duy???t ????n h??ng
							</Button>
							<Collapse in={showBoxHistory} timeout="auto" unmountOnExit>
								<Box>
									<TableContainer style={{ backgroundColor: '#fff' }}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>
														<Typography style={{ fontWeight: 'bold' }} variant="body1">
															Tr???ng th??i
														</Typography>
													</TableCell>
													<TableCell>
														<Typography style={{ fontWeight: 'bold' }} variant="body1">
															Ng?????i duy???t
														</Typography>
													</TableCell>
													<TableCell>
														<Typography style={{ fontWeight: 'bold' }} variant="body1">
															Ng??y duy???t
														</Typography>
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{props.dataEdit.bill_status?.map((item: any) => {
													return (
														<TableRow>
															<TableCell style={{ paddingRight: 0 }}>
																<Typography variant="body1">{statusValue(item)}</Typography>
															</TableCell>
															<TableCell style={{ paddingRight: 0 }}>
																<Typography variant="body1">{item.user}</Typography>
															</TableCell>
															<TableCell style={{ paddingRight: 0 }}>
																<Typography variant="body1">{item.created_at}</Typography>
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</TableContainer>
								</Box>
							</Collapse>
						</Grid>
					)}
					<Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
						<Typography
							variant="body1"
							gutterBottom
							style={{ fontWeight: 'bold', marginBottom: '10px' }}
						>
							?????A CH??? NG?????I NH???N
						</Typography>
						<Box style={{ paddingLeft: '10px' }}>
							<Typography gutterBottom>
								<Typography component="span" style={{ fontWeight: 'bold' }}>
									H??? t??n:&nbsp;
								</Typography>
								<Typography component="span">{props.dataEdit.name_customer}</Typography>
							</Typography>
							<Typography gutterBottom>
								<Typography component="span" style={{ fontWeight: 'bold' }}>
									Gi???i t??nh:&nbsp;
								</Typography>
								<Typography component="span">{props.dataEdit.gender_customer}</Typography>
							</Typography>
							<Typography gutterBottom>
								<Typography component="span" style={{ fontWeight: 'bold' }}>
									S??? ??i???n tho???i:&nbsp;
								</Typography>
								<Typography component="span">{props.dataEdit.phone_customer}</Typography>
							</Typography>
							<Typography gutterBottom>
								<Typography component="span" style={{ fontWeight: 'bold' }}>
									?????a ch???:&nbsp;
								</Typography>
								<Typography component="span">{props.dataEdit.address_customer}</Typography>
							</Typography>
							<Typography gutterBottom>
								<Typography component="span" style={{ fontWeight: 'bold' }}>
									Ghi ch??: &nbsp;
								</Typography>
								<Typography component="span">{props.dataEdit.note}</Typography>
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} xl={6} lg={6}>
						<Typography
							variant="body1"
							gutterBottom
							style={{ fontWeight: 'bold', marginBottom: '10px' }}
						>
							H??NH TH???C GIAO H??NG
						</Typography>
						<Box style={{ paddingLeft: '10px' }}>
							<Typography gutterBottom>
								<Typography component="span">
									{props.dataEdit.cod === 'cod'
										? 'Thanh to??n khi nh???n h??ng'
										: 'Chuy???n kho???n ng??n h??ng'}
								</Typography>
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body1" style={{ fontWeight: 'bold' }}>
							Danh s??ch s???n ph???m
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<MUIDataTableComponent
							columns={column}
							data={props.dataProduct}
							options={{
								pagination: false,
								jumpToPage: false,
								download: false,
								filter: false,
								responsive: 'vertical',
								viewColumns: false,
								print: false,
								search: false,
								textLabels: textTable,
								selectableRows: 'none',
								customTableBodyFooterRender: () => {
									return (
										<Typography style={{ padding: '10px' }}>
											<Typography component="span" style={{ fontWeight: 'bold' }}>
												T???ng c???ng:{' '}
											</Typography>
											<Typography component="span">
												{Intl.NumberFormat('en-US').format(Number(props.dataEdit.total))}??
											</Typography>
										</Typography>
									);
								},
							}}
						></MUIDataTableComponent>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Grid item xs={12}>
					{props.dataEdit.status != 4 && props.dataEdit.status != 5 && (
						<Button
							variant="contained"
							type="submit"
							disabled={isSubmitting}
							style={{
								position: 'relative',
								backgroundColor: theme.palette.info.light,
								marginRight: '5px',
							}}
							onClick={() => {
								props.create?.(true, 'duyet', props.dataEdit.id_bill);
							}}
						>
							Duy???t ????n h??ng
							{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
						</Button>
					)}
					{props.dataEdit.status != 4 && props.dataEdit.status != 5 && (
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={isSubmitting}
							onClick={() => {
								props.create?.(true, 'huy', props.dataEdit.id_bill);
							}}
							style={{
								position: 'relative',
								backgroundColor: theme.palette.warning.light,
								marginRight: '5px',
							}}
						>
							H???y ????n h??ng
							{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
						</Button>
					)}

					<Button
						variant="contained"
						color="secondary"
						//disabled={true}
						style={{ position: 'relative', marginRight: '5px' }}
						onClick={() => {
							props.cancel?.(false);
						}}
					>
						????ng
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
export default BillDetail;
