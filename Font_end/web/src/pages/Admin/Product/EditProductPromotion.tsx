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
interface ProfileInfoProps {
	dataEdit?: any;
	cancel?: (result: boolean) => void;
	create?: (result: boolean) => void;
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
const EditProductPromotion: React.FC<ProfileInfoProps> = (props) => {
	const classes = useStyles();
	const [valueEdit, setValueEdit] = React.useState<any>(props.dataEdit);
	const schema = yup.object().shape({
		name: yup.string().required('Name không để trống'),
		code: yup.string().required('code không để trống'),
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
	const [idType, setIdType] = React.useState(props.dataEdit.id_type);

	const onSubmit = async (data: any) => {
		// if (props.dataEdit.id === 0) {
		// 	const response = await CreateBrandProductPost({ name: data.name, id_type: idType });
		// 	if (response) {
		// 		if (response.errorCode === null) {
		// 			Swal.fire({
		// 				icon: 'success',
		// 				title: 'Tao moi thanh cong',
		// 			});
		// 			props.create?.(true);
		// 		} else {
		// 			Swal.fire({
		// 				icon: 'error',
		// 				title: 'Co loi xay ra',
		// 			});
		// 			props.create?.(false);
		// 		}
		// 	}
		// } else {
		// 	let dataReq: any = {};
		// 	let flag = false;
		// 	if (idType !== props.dataEdit.id_type && data.name === props.dataEdit.name) {
		// 		dataReq = { id: props.dataEdit.id, id_type: idType };
		// 		flag = true;
		// 	} else if (idType === props.dataEdit.id_type && data.name !== props.dataEdit.name) {
		// 		dataReq = { id: props.dataEdit.id, name: data.name };
		// 		flag = true;
		// 	} else if (idType !== props.dataEdit.id_type && data.name !== props.dataEdit.name) {
		// 		dataReq = { id: props.dataEdit.id, name: data.name, id_type: idType };
		// 		flag = true;
		// 	}
		// 	if (flag) {
		// 		const response = await EditBrandProductPatch(dataReq);
		// 		if (response) {
		// 			if (response.errorCode === null) {
		// 				Swal.fire({
		// 					icon: 'success',
		// 					title: 'Cap nhat thong tin thanh cong',
		// 				});
		// 				props.create?.(true);
		// 			} else {
		// 				Swal.fire({
		// 					icon: 'error',
		// 					title: 'Co loi xay ra',
		// 				});
		// 				props.create?.(true);
		// 			}
		// 		}
		// 		console.log(dataReq);
		// 	} else {
		// 		Swal.fire({
		// 			icon: 'success',
		// 			title: 'Cap nhat thong tin thanh cong',
		// 		});
		// 		props.create?.(true);
		// 	}
		// }
		// console.log(new Date(data.startDate).toLocaleDateString('en-GB'));

		// console.log(new Date(data.startDate).getHours());
		// console.log(new Date(data.startDate).getMinutes());

		let arrStart = [];
		arrStart = new Date(valueEdit.startDate).toLocaleDateString('en-GB').split('/');
		let arrFinish = [];
		arrFinish = new Date(valueEdit.finishDate).toLocaleDateString('en-GB').split('/');

		const createData = {
			name: valueEdit.name,
			id: props.dataEdit.create ? '' : props.dataEdit.id,
			code: valueEdit.code,
			id_product: props.dataEdit.id_product,
			value: valueEdit.value,
			start:
				`${arrStart[2]}/${arrStart[1]}/${arrStart[0]}` +
				' ' +
				new Date(data.startDate).getHours() +
				':' +
				new Date(data.startDate).getMinutes() +
				':' +
				'00',
			finish:
				`${arrFinish[2]}/${arrFinish[1]}/${arrFinish[0]}` +
				' ' +
				new Date(data.finishDate).getHours() +
				':' +
				new Date(data.finishDate).getMinutes() +
				':' +
				'00',
		};
		if (props.dataEdit.create) {
			const response = await CreatePromotionPost(createData);
			if (response) {
				if (response.errorCode === null) {
					Swal.fire({
						icon: 'success',
						title: 'Tao moi thanh cong',
					});
					props.create?.(true);
				} else if (response.errorCode === 1) {
					toast.error('Ngay ket thuc phai lon hon ngay bat dau');
				} else {
					toast.error('Co loi xay ra');
				}
			}
		} else {
			const response = await UpdatePromotionPatch(createData);
			if (response) {
				if (response.errorCode === null) {
					Swal.fire({
						icon: 'success',
						title: 'Cap nhat thanh cong',
					});
					props.create?.(true);
				} else if (response.errorCode === 1) {
					toast.error('Ngay ket thuc phai lon hon ngay bat dau');
				} else {
					toast.error('Co loi xay ra');
				}
			}
		}
		console.log(createData);
		console.log(props.dataEdit.id_product);
	};

	return (
		<React.Fragment>
			{isSubmitting && (
				<CircularProgress
					color="secondary"
					style={{ position: 'absolute', top: '50%', left: '50%' }}
				/>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
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
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Ten khuyen mai
							</Typography>
							<Controller
								control={control}
								name="name"
								defaultValue={valueEdit.name}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										fullWidth
										name="name"
										focused
										size="small"
										defaultValue={valueEdit.name}
										id="name"
										error={errors.name ? true : false}
										helperText={errors.name?.message}
										onChange={(e) => {
											setValueEdit({ ...valueEdit, name: e.target.value });
											reset({
												...valueEdit,
												startDate: valueEdit.startDate,
												name: e.target.value,
												code: valueEdit.code,
												value: valueEdit.value,
												finishDate: valueEdit.finishDate,
											});
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Ma code
							</Typography>
							<Controller
								control={control}
								name="code"
								defaultValue={valueEdit.code}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										fullWidth
										name="code"
										focused
										size="small"
										defaultValue={valueEdit.code}
										id="code"
										error={errors.code ? true : false}
										helperText={errors.code?.message}
										onChange={(e) => {
											setValueEdit({ ...valueEdit, code: e.target.value });
											reset({
												...valueEdit,
												startDate: valueEdit.startDate,
												name: valueEdit.name,
												code: e.target.value,
												value: valueEdit.value,
												finishDate: valueEdit.finishDate,
											});
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1" gutterBottom className={classes.titleInput}>
								Giam gia
							</Typography>
							<Controller
								control={control}
								name="value"
								defaultValue={valueEdit.value}
								render={({ field: { onChange } }) => (
									<TextField
										variant="outlined"
										fullWidth
										name="value"
										size="small"
										defaultValue={valueEdit.value}
										id="value"
										InputProps={{
											inputComponent: NumberFormatCustom as any,
											endAdornment: <InputAdornment position="end">VND</InputAdornment>,
										}}
										error={errors.value ? true : false}
										helperText={errors.value?.message}
										onChange={(e) => {
											setValueEdit({ ...valueEdit, value: e.target.value });
											reset({
												...valueEdit,
												startDate: valueEdit.startDate,
												name: valueEdit.name,
												code: valueEdit.code,
												value: e.target.value,
												finishDate: valueEdit.finishDate,
											});
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1" className={classes.titleInput}>
								Ngay bat dau
							</Typography>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Controller
									control={control}
									name="startDate"
									defaultValue={valueEdit.startDate}
									render={({ field: { onChange, value } }) => (
										<KeyboardDateTimePicker
											//disableToolbar
											inputVariant="outlined"
											format="dd/MM/yyyy hh:mm a"
											margin="normal"
											value={value}
											minDate={props.dataEdit.minDate}
											size="small"
											fullWidth
											onChange={(e) => {
												setValueEdit({ ...valueEdit, startDate: e });
												reset({
													...valueEdit,
													startDate: e,
													name: valueEdit.name,
													code: valueEdit.code,
													value: valueEdit.value,
													finishDate: valueEdit.finishDate,
												});
											}}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									)}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1" className={classes.titleInput}>
								Ngay ket thuc
							</Typography>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Controller
									control={control}
									name="finishDate"
									defaultValue={valueEdit.finishDate}
									render={({ field: { onChange, value } }) => (
										<KeyboardDateTimePicker
											//disableToolbar
											inputVariant="outlined"
											format="dd/MM/yyyy hh:mm a"
											margin="normal"
											id="finishDate"
											value={value}
											fullWidth
											size="small"
											minDate={new Date(valueEdit.startDate)}
											minDateMessage="Ngay ket thuc phai lon hon ngay bat dau"
											onChange={(e) => {
												setValueEdit({ ...valueEdit, finishDate: e });
												reset({
													...valueEdit,
													finishDate: e,
													name: valueEdit.name,
													code: valueEdit.code,
													value: valueEdit.value,
													startDate: valueEdit.startDate,
												});
											}}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									)}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={isSubmitting}
							style={{ position: 'relative' }}
						>
							{props.dataEdit.create ? 'Tao moi' : 'cap nhat thong tin'}
							{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
						</Button>
						&nbsp;&nbsp;
						<Button
							variant="contained"
							color="secondary"
							//disabled={true}
							style={{ position: 'relative' }}
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
			</form>
		</React.Fragment>
	);
};
export default EditProductPromotion;
