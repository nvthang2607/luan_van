import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
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
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
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
import { Close } from '@material-ui/icons';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { StepIconProps } from '@mui/material/StepIcon';
import RatingComponent from './RatingComponent';
import { OrderCancelPost, OrderGetId } from '../../api/Order';
import CheckIcon from '@mui/icons-material/Check';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';

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
		1: <InsertInvitationIcon />,
		2: <BusinessCenterIcon />,
		3: <LocalShippingIcon />,
		4: <CheckIcon />,
	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

const steps = ['??ang x??? l??', '???? ????ng g??i', '??ang v???n chuy???n', '???? giao h??ng'];
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
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
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
	const [refresh, setRefresh] = React.useState(1);
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [dataOrderId, setDataOrderId] = React.useState<any>({});
	const handleClose = () => {
		setOpen(false);
	};
	const action: (result: boolean) => void = (result) => {
		if (result === false) {
			setOpen(false);
		} else {
			setRefresh(refresh + 1);
			setOpen(false);
		}
	};
	const { id } = useParams<{ id?: string }>();
	const [progressOrderId, setProgressOrderId] = React.useState(false);
	const [dataDialog, setDataDialog] = React.useState<any>({
		idBill: id,
		idBillDetail: 0,
		idProduct: 0,
		link: '',
		name: '',
		price: 0,
	});

	React.useEffect(() => {
		const fetchOrderDetail = async () => {
			setProgressOrderId(true);
			window.scrollTo(0, 0);
			const responseOrderId = await OrderGetId(id);
			if (responseOrderId) {
				if (responseOrderId.errorCode === null) {
					console.log(responseOrderId);
					setDataOrderId(responseOrderId.data);
					setProgressOrderId(false);
				}
			}
		};
		fetchOrderDetail();
	}, [id, refresh]);
	const contentStatus = () => {
		let result = '';
		if (dataOrderId?.bill?.status == '1') {
			result = '??ang ch??? duy???t';
		} else if (dataOrderId?.bill?.status == '4') {
			result = '???? ho??n th??nh';
		} else if (dataOrderId?.bill?.status == '2') {
			result = '???? ????ng g??i';
		} else if (dataOrderId?.bill?.status == '3') {
			result = '??ang v???n chuy???n';
		} else if (dataOrderId?.bill?.status == '5') {
			result = '???? h???y';
		}
		return result;
	};
	const contentPayment = () => {
		let result = '';
		if (dataOrderId?.bill?.payment === 'cod') {
			result = 'Thanh to??n khi giao h??ng (COD)';
		}
		return result;
	};
	const history = useHistory();
	const toURL = (str: any) => {
		str = str.toLowerCase();
		str = str.replace(/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/g, 'a');
		str = str.replace(/(??|??|???|???|???|??|???|???|???|???|???)/g, 'e');
		str = str.replace(/(??|??|???|???|??)/g, 'i');
		str = str.replace(/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/g, 'o');
		str = str.replace(/(??|??|???|???|??|??|???|???|???|???|???)/g, 'u');
		str = str.replace(/(???|??|???|???|???)/g, 'y');
		str = str.replace(/(??)/g, 'd');
		str = str.replace(/([^0-9a-z-\s])/g, '');
		str = str.replace(/(\s+)/g, '-');
		str = str.replace(/^-+/g, '');
		str = str.replace(/-+$/g, '');
		return str;
	};
	const numberStatus = () => {
		let result = -1;
		if (dataOrderId.bill?.status == '1') {
			result = 0;
		} else if (dataOrderId.bill?.status == '2') {
			result = 1;
		} else if (dataOrderId.bill?.status == '3') {
			result = 2;
		} else if (dataOrderId.bill?.status == '4') {
			result = 3;
		} else if (dataOrderId.bill?.status == '5') {
			result = -1;
		}
		return result;
	};
	const handleCancel = () => {
		Swal.fire({
			title: 'B???n c?? ch???c mu???n h???y ????n h??ng kh??ng?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			reverseButtons: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				const token: any = window.localStorage.getItem('token');
				const date = Date.now();
				if (window.localStorage.getItem('token')) {
					const checkToken: any = jwtDecode(token);
					if (checkToken.exp < date / 1000) {
						localStorage.removeItem('token');
					} else {
						const response = await OrderCancelPost({ id_bill: id });
						if (response) {
							if (response.errorCode === null) {
								Swal.fire('H???y ????n h??ng th??nh c??ng!', 'Your file has been deleted.', 'success');
								setRefresh(refresh + 1);
							} else {
								Swal.fire({
									icon: 'error',
									title: 'C?? l???i x???y ra!',
								});
							}
						}
					}
				}
			}
		});
	};
	const checkToken = () => {
		const token: any = window.localStorage.getItem('token');
		const date = Date.now();
		if (window.localStorage.getItem('token')) {
			const checkToken: any = jwtDecode(token);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('token');
				return <Redirect to={AppURL.ACCOUNT} />;
			}
		} else {
			return <Redirect to={AppURL.ACCOUNT} />;
		}
	};
	return (
		<Container>
			{checkToken()}
			{progressOrderId ? (
				<CircularProgress
					color="secondary"
					style={{ position: 'fixed', top: '150px', left: '900px' }}
				/>
			) : (
				<React.Fragment>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<Typography variant="h5">
								Chi ti???t ????n h??ng #{id} - {contentStatus()}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" style={{ textAlign: 'end' }}>
								Ng??y ?????t h??ng: {dataOrderId.bill?.created_at}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Stack sx={{ width: '100%' }} spacing={4}>
								<Stepper
									alternativeLabel
									activeStep={numberStatus()}
									connector={<ColorlibConnector />}
								>
									{steps.map((label) => (
										<Step key={label}>
											<StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
										</Step>
									))}
								</Stepper>
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={3}>
								<Grid item lg={6} xl={6} md={6} sm={6} xs={12}>
									<Typography variant="body1">?????A CH??? NG?????I NH???N</Typography>
									<Typography
										style={{ marginLeft: '10px', marginTop: '30px', backgroundColor: '#fff' }}
									>
										<Typography variant="body1" gutterBottom>
											<Typography component="span" style={{ fontWeight: 'bold' }}>
												H??? t??n:
											</Typography>
											&nbsp;
											<Typography component="span">{dataOrderId.bill?.name_customer}</Typography>
										</Typography>
										<Typography variant="body1" gutterBottom>
											<Typography component="span" style={{ fontWeight: 'bold' }}>
												Gi???i t??nh:
											</Typography>
											&nbsp;
											<Typography component="span">{dataOrderId.bill?.gender_customer}</Typography>
										</Typography>
										<Typography variant="body1" gutterBottom>
											<Typography component="span" style={{ fontWeight: 'bold' }}>
												S??? ??i???n tho???i:
											</Typography>
											&nbsp;
											<Typography component="span">{dataOrderId.bill?.phone_customer}</Typography>
										</Typography>
										<Typography variant="body1" gutterBottom>
											<Typography component="span" style={{ fontWeight: 'bold' }}>
												?????a ch???:
											</Typography>
											&nbsp;
											<Typography component="span">{dataOrderId.bill?.address_customer}</Typography>
										</Typography>

										<Typography variant="body1" gutterBottom>
											<Typography component="span" style={{ fontWeight: 'bold' }}>
												Ghi ch???:
											</Typography>
											&nbsp;
											<Typography component="span">{dataOrderId.bill?.note}</Typography>
										</Typography>
									</Typography>
								</Grid>
								<Grid item lg={6} xl={6} md={6} sm={6} xs={12}>
									<Typography variant="body1">H??NH TH???C GIAO H??NG</Typography>
									<Typography
										style={{ marginLeft: '10px', marginTop: '30px', backgroundColor: '#fff' }}
									>
										{contentPayment()}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<TableContainer style={{ backgroundColor: '#fff' }}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell colSpan={2}>
												<Typography style={{ fontWeight: 'bold' }} variant="body1">
													S???n ph???m
												</Typography>
											</TableCell>
											<TableCell>
												<Typography style={{ fontWeight: 'bold' }} variant="body1">
													Gi??
												</Typography>
											</TableCell>
											<TableCell>
												<Typography style={{ fontWeight: 'bold' }} variant="body1">
													S??? l?????ng
												</Typography>
											</TableCell>
											<TableCell style={{ fontWeight: 'bold' }} align="right">
												<Typography variant="body1">T???m t??nh</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{dataOrderId.billdetail?.map((item: any) => {
											return (
												<TableRow>
													<TableCell style={{ paddingRight: 0 }}>
														<img width="71px" src={`http://localhost:8000${item.image}`} />
													</TableCell>
													<TableCell>
														<Typography gutterBottom>{item.name_product}</Typography>
														{dataOrderId.bill?.status == '4' && (
															<Typography>
																{item.rate === 0 && (
																	<Button
																		variant="outlined"
																		color="secondary"
																		style={{ textTransform: 'inherit', marginRight: '5px' }}
																		onClick={() => {
																			setOpen(true);
																			setDataDialog({
																				...dataDialog,
																				idBillDetail: item.id_detail,
																				idProduct: item.id_product,
																				link: item.image,
																				name: item.name_product,
																				price: item.price,
																			});
																		}}
																	>
																		????nh gi??
																	</Button>
																)}

																<Button
																	variant="outlined"
																	color="secondary"
																	style={{ textTransform: 'inherit' }}
																	onClick={() => {
																		history.push(
																			`/product_detail/${toURL(item?.name_product)}-${
																				item.id_product
																			}.html`
																		);
																	}}
																>
																	Mua l???i
																</Button>
															</Typography>
														)}
													</TableCell>
													<TableCell>
														<Typography variant="body1">
															{Intl.NumberFormat('en-US').format(Number(item.price))}??
														</Typography>
													</TableCell>
													<TableCell>
														<Typography variant="body1">{item.quantity}</Typography>
													</TableCell>
													<TableCell align="right">
														<Typography variant="body1">
															{Intl.NumberFormat('en-US').format(
																Number(item.quantity * item.price)
															)}
															??
														</Typography>
													</TableCell>
												</TableRow>
											);
										})}
										<TableRow>
											<TableCell rowSpan={2} colSpan={3} />
											<TableCell>
												<Typography variant="body1">T???ng c???ng</Typography>
											</TableCell>
											<TableCell
												align="right"
												style={{ color: `rgb(${255}, ${59}, ${39})`, fontSize: '16px' }}
											>
												<Typography variant="body1">
													{Intl.NumberFormat('en-US').format(Number(dataOrderId.bill?.total))}??
												</Typography>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						{dataOrderId.bill?.status == '1' && (
							<Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<Button color="secondary" variant="contained" onClick={handleCancel}>
									H???y ????n h??ng
								</Button>
							</Grid>
						)}
					</Grid>
					<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
						<RatingComponent action={action} data={dataDialog} />
					</Dialog>
				</React.Fragment>
			)}
		</Container>
	);
};
export default OrderDetail;
