import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import Logo from '../../public/images/logo1.png';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import fbIcon from '../../public/images/facebook.svg';
import ggIcon from '../../public/images/google.webp';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Avatar,
	Card,
	CardHeader,
	Container,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
	Link as MuiLink,
	Button,
	FormHelperText,
	LinearProgress,
	Collapse,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Register from './Register';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import ForgotPwd from './ForgotPwd';
import SendCode from './SendCode';
import ResetPwd from './ResetPwd';

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bgHeader: {
			backgroundColor: theme.palette.primary.main,
			paddingRight: theme.spacing(0),
			paddingLeft: theme.spacing(0),
		},
		grow: {
			flexGrow: 1,
		},
		root: {
			backgroundColor: theme.palette.background.paper,
			width: 800,
		},
		button: {},
		rootMobile: {
			backgroundColor: theme.palette.background.paper,
			//width: 800,
		},
		paper: {
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			marginTop: theme.spacing(6),
			backgroundColor: '#fff',
		},
		styleForgotPwd: {
			padding: '62px',
			paddingTop: '12px',
		},
		content: {
			padding: theme.spacing(3, 15, 5, 15),
		},
	})
);
const Account: React.FC = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	const history = useHistory();
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};
	const [propressLogin, setPropressLogin] = React.useState(false);
	const [propressRegister, setPropressRegister] = React.useState(false);
	const receivePropsLogin: (result: boolean) => void = (result) => {
		setPropressLogin(result);
	};
	const receivePropsRegister: (result: boolean) => void = (result) => {
		setPropressRegister(result);
	};
	const { t } = useTranslation();
	const resultApiLogin: (result: any) => void = (result) => {
		if (result === null) {
			//toast.success('dang nhap thanh cong');
			history.push('/');
		} else if (result === 2) {
			toast.error('Tai skhoan ko chinh xac');
		}
	};
	const resultApiRegister: (result: any) => void = (result) => {
		if (result === 1) {
			toast.error('ten tai khoan da ton tai');
		}
	};
	const [showAccount, setShowAccount] = React.useState(true);
	const [showSendCode, setShowSendCode] = React.useState(false);
	const [showSendMail, setShowSendMail] = React.useState(true);
	const [showResetPwd, setShowResetPwd] = React.useState(false);
	const [valueEmail, setValueEmail] = React.useState('');
	const forgotPwd: (result: boolean) => void = (result) => {
		if (result) {
			setShowAccount(!showAccount);
			setShowResetPwd(false);
			setShowSendMail(true);
			setShowSendCode(false);
		}
	};
	const sendMail: (result: boolean) => void = (result) => {
		if (result) {
			setShowResetPwd(false);
			setShowSendMail(false);
			setShowSendCode(true);
		}
	};
	const sendCode: (result: boolean) => void = (result) => {
		if (result) {
			setShowResetPwd(true);
			setShowSendMail(false);
			setShowSendCode(false);
		}
	};
	const email: (result: any) => void = (result) => {
		setValueEmail(result);
	};
	const checkToken = () => {
		const token: any = window.localStorage.getItem('token');
		const date = Date.now();
		if (window.localStorage.getItem('token')) {
			const checkToken: any = jwtDecode(token);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('token');
			} else {
				return <Redirect to="/" />;
			}
		}
	};
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseiveProductMobile = useMediaQuery({ query: '(min-width: 1098px)' });
	const isResponseiveProduct1Mobile = useMediaQuery({ query: '(min-width: 780px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	return (
		<div className={classes.grow}>
			{checkToken()}
			<AppBar position="fixed" className={classes.bgHeader}>
				<Toolbar style={{ height: '9ch' }}>
					<Grid container>
						<Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
							<Link to="/" style={{ textDecoration: 'none', color: '#fff', display: 'contents' }}>
								<Grid container style={{ display: 'flex', alignItems: 'center' }}>
									<Grid item xs={5} style={{ display: 'contents', alignItems: 'center' }}>
										<KeyboardArrowLeftRoundedIcon style={{ fontSize: '27px' }} />
									</Grid>
									<Grid item xs={7}>
										<Typography component="h2" style={{ fontSize: '19px' }}>
											Trở về
										</Typography>
									</Grid>
								</Grid>
							</Link>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'end', marginTop: '1%' }}>
							<img src={Logo} alt="logo" width="157px" />
						</Grid>
					</Grid>
				</Toolbar>
				{propressLogin && <LinearProgress color="secondary" />}
				{propressRegister && <LinearProgress color="secondary" />}
			</AppBar>

			<Container style={{ marginTop: theme.spacing(10) }}>
				<Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Grid item className={classes.paper}>
						<Box boxShadow={4}>
							{showAccount ? (
								<div
									className={clsx(
										classes.button,
										isResponseiveMobile ? classes.root : classes.rootMobile
									)}
								>
									<Tabs
										value={value}
										onChange={handleChange}
										style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
										centered
										indicatorColor="primary"
										aria-label="full width tabs example"
									>
										<Tab
											disabled={propressRegister}
											label={t('account.sign_in')}
											{...a11yProps(0)}
											style={{ fontSize: '22px' }}
										/>
										<Tab
											disabled={propressLogin}
											label={t('account.sign_up')}
											{...a11yProps(1)}
											style={{ fontSize: '22px' }}
										/>
									</Tabs>

									<SwipeableViews
										axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
										index={value}
										onChangeIndex={handleChangeIndex}
										className={clsx(classes.button, isResponseiveMobile && classes.content)}
									>
										<TabPanel value={value} index={0} dir={theme.direction}>
											<Login
												receivePropsLogin={receivePropsLogin}
												resultApiLogin={resultApiLogin}
												forgotPwd={forgotPwd}
											/>
										</TabPanel>
										<TabPanel value={value} index={1} dir={theme.direction}>
											<Register
												receivePropsRegister={receivePropsRegister}
												resultApiRegister={resultApiRegister}
											/>
										</TabPanel>
									</SwipeableViews>
								</div>
							) : (
								<Box className={classes.styleForgotPwd}>
									{showSendMail && (
										<ForgotPwd forgotPwd={forgotPwd} sendMail={sendMail} email={email} />
									)}
									{showSendCode && (
										<SendCode forgotPwd={forgotPwd} sendCode={sendCode} valueEmail={valueEmail} />
									)}
									{showResetPwd && <ResetPwd forgotPwd={forgotPwd} valueEmail={valueEmail} />}
								</Box>
							)}
						</Box>
					</Grid>
				</Grid>
			</Container>

			<Grid container>
				<Grid
					item
					xs={12}
					style={{
						backgroundColor: '#e3e7e8',
						padding: '20px',
						marginTop: '50px',
						textAlign: 'center',
					}}
				>
					<Typography component="span">Bạn gặp khó khăn khi đăng nhập, đăng ký? Gọi </Typography>
					<MuiLink
						style={{
							color: theme.palette.secondary.main,
							fontWeight: 'bold',
							textDecoration: 'none',
						}}
						href="tel: 082636263"
					>
						082636263 &nbsp;
					</MuiLink>
					<Typography component="span">để được hỗ trợ tốt nhất.</Typography>
				</Grid>
			</Grid>
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
		</div>
	);
};
export default Account;
