import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
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
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { TypeLogin } from '../../PropTypes/Account/Account';
import Login from './Login';
import Register from './Register';

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
			paddingRight: theme.spacing(3),
			paddingLeft: theme.spacing(3),
		},
		grow: {
			flexGrow: 1,
		},
		root: {
			backgroundColor: theme.palette.background.paper,
			width: 800,
		},
		paper: {
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			marginTop: theme.spacing(6),
			backgroundColor: '#fff',
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

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

	return (
		<div className={classes.grow}>
			<AppBar position="static" className={classes.bgHeader}>
				<Toolbar style={{ height: '9ch' }}>
					<Grid container>
						<Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
							<Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
								<Grid container style={{ display: 'flex', alignItems: 'center' }}>
									<Grid item xs={5} style={{ display: 'flex', alignItems: 'center' }}>
										<KeyboardArrowLeftRoundedIcon style={{ fontSize: '3vw' }} />
									</Grid>
									<Grid item xs={7}>
										<Typography component="h2" style={{ fontSize: '1.5vw' }}>
											Trở về
										</Typography>
									</Grid>
								</Grid>
							</Link>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'end', marginTop: '1%' }}>
							<img src={Logo} alt="logo" width="26%" />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Container>
				<Grid
					container
					spacing={5}
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<Grid item className={classes.paper}>
						<Box boxShadow={4}>
							<div className={classes.root}>
								<Tabs
									value={value}
									onChange={handleChange}
									style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
									centered
									indicatorColor="primary"
									aria-label="full width tabs example"
								>
									<Tab label="ĐĂNG NHẬP" {...a11yProps(0)} style={{ fontSize: '1.5vw' }} />
									<Tab label="ĐĂNG KÝ" {...a11yProps(1)} style={{ fontSize: '1.5vw' }} />
								</Tabs>

								<SwipeableViews
									axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
									index={value}
									onChangeIndex={handleChangeIndex}
									className={classes.content}
								>
									<TabPanel value={value} index={0} dir={theme.direction}>
										<Login />
									</TabPanel>
									<TabPanel value={value} index={1} dir={theme.direction}>
										<Register />
									</TabPanel>
								</SwipeableViews>
							</div>
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
		</div>
	);
};
export default Account;
