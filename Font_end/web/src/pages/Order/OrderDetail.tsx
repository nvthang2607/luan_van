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
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
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
import { UpdatePasswordPost } from '../../api/User';
import { toast, ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
	({ theme, ownerState }) => ({
		color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
		display: 'flex',
		height: 22,
		alignItems: 'center',
		...(ownerState.active && {
			color: '#784af4',
		}),
		'& .QontoStepIcon-completedIcon': {
			color: '#784af4',
			zIndex: 1,
			fontSize: 18,
		},
		'& .QontoStepIcon-circle': {
			width: 8,
			height: 8,
			borderRadius: '50%',
			backgroundColor: 'currentColor',
		},
	})
);

function QontoStepIcon(props: StepIconProps) {
	const { active, completed, className } = props;

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<Check className="QontoStepIcon-completedIcon" />
			) : (
				<div className="QontoStepIcon-circle" />
			)}
		</QontoStepIconRoot>
	);
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled('div')<{
	ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	}),
}));

function ColorlibStepIcon(props: StepIconProps) {
	const { active, completed, className } = props;

	const icons: { [index: string]: React.ReactElement } = {
		1: <SettingsIcon />,
		2: <GroupAddIcon />,
		3: <VideoLabelIcon />,
		4: <SettingsIcon />,
	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

const steps = [
	'Dat hang thanh cong',
	'Da duyet va dangg cho d cho giao hang',
	'Dang cho thanh toan',
	'Don hang da hoan thanh',
];
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
const OrderDetail: React.FC = () => {
	const classes = useStyles();

	return (
		<Container>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="h5">Chi tiết đơn hàng #123435 - Giao hang thah cog</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack sx={{ width: '100%' }} spacing={4}>
						<Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={6}>
							<Typography variant="body1">ĐỊA CHỈ NGƯỜI NHẬN</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="body1">HÌNH THỨC GIAO HÀNG</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell colSpan={2}>Sản phẩm</TableCell>
									<TableCell>Gia</TableCell>
									<TableCell>So luong</TableCell>
									<TableCell align="right">Tam tinh</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell>Anh</TableCell>
									<TableCell>USB 3.0 SanDisk Ultra CZ48 64GB - Hàng Chính Hãng</TableCell>
									<TableCell>233.000.000 ₫</TableCell>
									<TableCell>12</TableCell>
									<TableCell align="right">233.000.000 ₫</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Anh</TableCell>
									<TableCell>
										<Typography gutterBottom>
											USB 3.0 SanDisk Ultra CZ48 64GB - Hàng Chính Hãng
										</Typography>
										<Typography>
											<Button
												variant="outlined"
												color="secondary"
												style={{ textTransform: 'inherit' }}
											>
												Danh gia
											</Button>
											&nbsp;&nbsp;
											<Button
												variant="outlined"
												color="secondary"
												style={{ textTransform: 'inherit' }}
											>
												Mua lai
											</Button>
										</Typography>
									</TableCell>
									<TableCell>233.000.000 ₫</TableCell>
									<TableCell>12</TableCell>
									<TableCell align="right">233.000.000 ₫</TableCell>
								</TableRow>
								<TableRow>
									<TableCell rowSpan={2} colSpan={3} />
									<TableCell>Tổng cộng</TableCell>
									<TableCell
										align="right"
										style={{ color: `rgb(${255}, ${59}, ${39})`, fontSize: '16px' }}
									>
										233.000.000 ₫
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button color="secondary" variant="contained">
						Huy don hang
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};
export default OrderDetail;
