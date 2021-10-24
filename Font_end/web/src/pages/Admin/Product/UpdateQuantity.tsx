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
import { Close } from '@material-ui/icons';
import theme from '../../../utils/theme';
import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import Swal from 'sweetalert2';
import { CityGet, CommunePost, DistrictPost } from '../../../api/Address';
import { UpdateUserPost } from '../../../api/Admin/User';
import {
	CreateProductTypePost,
	EditProductTypePost,
	UpdateQuantityProductPatch,
} from '../../../api/Admin/Product';
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
const UpdateQuantity: React.FC<ProfileInfoProps> = (props) => {
	const classes = useStyles();

	const schema = yup.object().shape({
		name: yup
			.number()
			.typeError('month_must_specify_a_number')
			.min(1, 'month_must_be_greater_than_or_equal_to_0')
			.integer('month_must_be_an_integer'),
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
	});
	const [progress, setProgress] = React.useState(false);

	const onSubmit = async (data: any) => {
		// if (props.dataEdit.id === 0) {
		// 	const response = await CreateProductTypePost({ name: data.name });
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
		// 	const response = await EditProductTypePost({ id: props.dataEdit.id, name: data.name });
		// 	if (response) {
		// 		if (response.errorCode === null) {
		// 			Swal.fire({
		// 				icon: 'success',
		// 				title: 'Cap nhat thong tin thanh cong',
		// 			});
		// 			props.create?.(true);
		// 		} else {
		// 			Swal.fire({
		// 				icon: 'error',
		// 				title: 'Co loi xay ra',
		// 			});
		// 			props.create?.(true);
		// 		}
		// 	}
		// }
		const response = await UpdateQuantityProductPatch({
			id_product: props.dataEdit.id,
			quantity: data.name,
		});
		if (response.errorCode === null) {
			Swal.fire({
				icon: 'success',
				title: 'Cap nhat thong tin thanh cong',
			});
			props.create?.(true);
		} else {
			toast.error('Co loi xay ra');
		}
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
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							So luong
						</Typography>
						<Controller
							control={control}
							name="name"
							defaultValue=""
							render={({ field: { onChange } }) => (
								<TextField
									variant="outlined"
									fullWidth
									name="name"
									focused
									id="name"
									error={errors.name ? true : false}
									helperText={errors.name?.message}
									onChange={(e) => onChange(e.target.value)}
								/>
							)}
						/>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={isSubmitting}
							style={{ position: 'relative', textTransform: 'inherit' }}
						>
							Cap nhat
							{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
						</Button>
						&nbsp;&nbsp;
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
			</form>
		</React.Fragment>
	);
};
export default UpdateQuantity;