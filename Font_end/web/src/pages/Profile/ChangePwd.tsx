import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Grid,
	LinearProgress,
	ListItem,
	ListItemAvatar,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import { useForm } from 'react-hook-form';
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
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
const ChangePwd: React.FC = () => {
	const classes = useStyles();
	const schema = yup.object().shape({
		oldPassword: yup
			.string()
			.required('Mật khẩu không để trống')
			.min(8, 'Mật khẩu ít nhất 8 ký tự'),
		newPassword: yup
			.string()
			.required('Mật khẩu không để trống')
			.min(8, 'Mật khẩu ít nhất 8 ký tự'),
		retypeNewPassword: yup
			.string()
			.required('Mật khẩu không để trống')
			.oneOf([yup.ref('newPassword')], '2 trường mật khẩu ko giống nhau'),
	});
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<Container>
			<Grid item xs={12}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container>
						<Grid item xs={6}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Mat khau hien tai
									</Typography>
									<TextField
										{...register('oldPassword')}
										id="oldPassword"
										name="oldPassword"
										variant="outlined"
										fullWidth
										type="password"
										error={errors.oldPassword ? true : false}
										helperText={errors.oldPassword?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Mat khau hien tai
									</Typography>
									<TextField
										{...register('newPassword')}
										id="newPassword"
										name="newPassword"
										variant="outlined"
										fullWidth
										type="password"
										error={errors.newPassword ? true : false}
										helperText={errors.newPassword?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1" gutterBottom>
										Mat khau hien tai
									</Typography>
									<TextField
										{...register('retypeNewPassword')}
										id="retypeNewPassword"
										name="retypeNewPassword"
										variant="outlined"
										type="password"
										fullWidth
										error={errors.retypeNewPassword ? true : false}
										helperText={errors.retypeNewPassword?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										size="large"
										type="submit"
										//disabled={true}
										style={{ position: 'relative' }}
									>
										Doi mat khau
										{/* <CircularProgress size={24} color="primary" style={{ position: 'absolute' }} /> */}
									</Button>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={6}></Grid>
					</Grid>
				</form>
			</Grid>
		</Container>
	);
};
export default ChangePwd;
