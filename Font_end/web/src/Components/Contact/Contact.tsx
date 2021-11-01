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
import theme from '../../utils/theme';
import { iteratorSymbol } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import Swal from 'sweetalert2';
import { ContactPost } from '../../api/Contact';
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
const Contact: React.FC<ProfileInfoProps> = (props) => {
	const classes = useStyles();

	const schema = yup.object().shape({
		phone: yup
			.number()
			.required('Phone không để trống')
			.typeError('Số điện thoại không hợp lệ')
			.integer('Số điện thoại không hợp lệ'),
		name: yup.string().required('the_title_field_is_required'),
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
		console.log(data);
		let content = '';
		content = data.content === undefined ? '' : data.content;
		let email = '';
		email = data.email === undefined ? '' : data.email;
		const response = await ContactPost({
			name: data.name,
			phone: data.phone,
			comment: content,
			email: email,
		});
		if (response) {
			if (response.errorCode === null) {
				Swal.fire({
					icon: 'success',
					title: 'Gui lien he thanh cong',
				});
				props.cancel?.(false);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Co loi xay ra',
				});
				props.cancel?.(false);
			}
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
					<Typography variant="h5">Lien he voi chung toi</Typography>
				</DialogTitle>
				<DialogContent dividers>
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Ho ten
						</Typography>
						<TextField
							{...register('name')}
							id="name"
							name="name"
							size="small"
							variant="outlined"
							fullWidth
							error={errors.name ? true : false}
							helperText={errors.name?.message}
							style={{ marginBottom: '10px' }}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom>
							Email
						</Typography>
						<TextField
							{...register('email')}
							id="email"
							name="email"
							size="small"
							variant="outlined"
							fullWidth
							error={errors.email ? true : false}
							helperText={errors.email?.message}
							style={{ marginBottom: '10px' }}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							So dien thoai
						</Typography>
						<TextField
							{...register('phone')}
							id="phone"
							name="phone"
							size="small"
							variant="outlined"
							fullWidth
							error={errors.phone ? true : false}
							helperText={errors.phone?.message}
							style={{ marginBottom: '10px' }}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="body1" gutterBottom className={classes.titleInput}>
							Noi dung
						</Typography>
						<TextField
							id="rate_content"
							{...register('content')}
							multiline
							name="content"
							rows={4}
							placeholder="Nhập noi dung lien he"
							variant="outlined"
							fullWidth
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
							Gui lien he
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
export default Contact;
