import {
	Avatar,
	Box,
	Button,
	Collapse,
	Fade,
	Grid,
	ListItemAvatar,
	Menu,
	MenuItem,
} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NavLink, useHistory } from 'react-router-dom';
import { AppURL } from '../utils/const';
import logo from '../public/images/logo1.png';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PolicyIcon from '@material-ui/icons/Policy';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import icon from '../public/images/english.svg';
import iconvn from '../public/images/vietnamese.svg';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import PersonIcon from '@material-ui/icons/Person';
import Test from '../pages/text/Test';
import User from '../pages/Admin/User/User';
import HomeIcon from '@mui/icons-material/Home';
import Home from '../pages/Admin/Home/Home';
import { UserGet } from '../api/Admin/User';
const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: `calc(100% - ${73}px)`,
			backgroundColor: '#00695c',
			color: 'black',
		},
		appBarShift: {
			height: '76px',
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: 'none',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerOpen: {
			width: drawerWidth,

			backgroundColor: '#00695c',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerOpen1: {
			width: drawerWidth,
			marginTop: '74px',
			backgroundColor: '#00695c',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9) + 1,
			},
		},
		link: {
			color: 'red !important',
			textDecoration: 'none',
			backgroundColor: 'red !important',
		},
		activeTagLi: {
			backgroundColor: '#267f74',
			//borderLeft: `4px solid ${theme.palette.primary.main}`,
			//color: `${theme.palette.primary.main} !important`,
		},
		tagLi: {
			textDecoration: 'none',
			cursor: 'pointer',
			color: '#fff',

			display: 'block',
		},
		selected: {
			backgroundColor: '#e3f2fd !important',
		},
		activeColor: { color: '#1bb55c' },
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		button: {},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			backgroundColor: '#f4f4f4',
		},
	})
);
const AdminLayout: React.FC = (props) => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const history = useHistory();
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const [selectedItem, setSelectedItem] = React.useState<number>(-1);
	const { t, i18n } = useTranslation();
	const items = [
		{ text: 'user', icon: <PersonIcon /> },
		{ text: 'license', icon: <PolicyIcon /> },
	];
	const [item, setItem] = React.useState(icon);
	const [valueI18n, setValueI18n] = React.useState('en');
	const [profile, setProfile] = React.useState<string | undefined>('user name');
	const dispatch = useAppDispatch();
	//dispatch(updateTitleHeader(location.pathname.substring(1)));
	React.useEffect(() => {
		const i18nLng = window.localStorage.getItem('i18nextLng') || 'en';

		if (i18nLng === 'en') {
			setItem(icon);
			setValueI18n(i18nLng);
		} else {
			setItem(iconvn);
			setValueI18n(i18nLng);
		}
		const getDataProfile = async () => {
			const response = await UserGet();
			if (response?.errorCode === null) {
				setProfile(response.data.name);
			}
		};
		getDataProfile();
	}, [setValueI18n]);

	//const title = useAppSelector(titleHeader);

	const handleClick = (index: number, text: string) => {
		// setSelectedItem(index);
		// dispatch(updateTitleHeader(text));
	};
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [anchorElProfile, setAnchorElProfile] = React.useState<null | HTMLElement>(null);
	const open1 = Boolean(anchorEl);

	const handleClickLng = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElProfile(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleCloseProfile = () => {
		setAnchorElProfile(null);
	};

	const handleLanguage = (value: string) => {
		i18n.changeLanguage(value);
		setAnchorEl(null);
		if (value === 'en') {
			setItem(icon);
			setValueI18n(value);
		} else {
			setItem(iconvn);
			setValueI18n(value);
		}
	};
	const handleLogout = () => {
		window.localStorage.getItem('tokenAdmin') && window.localStorage.removeItem('tokenAdmin');
		setAnchorElProfile(null);
	};
	const [showCategories, setShowCategories] = React.useState(false);
	const tokenAdmin: any = window.localStorage.getItem('tokenAdmin');
	const date = Date.now();
	const handleCheckToken = () => {
		if (tokenAdmin) {
			const checkToken: any = jwtDecode(tokenAdmin);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('tokenAdmin');
				return <Redirect to={AppURL.LOGIN} />;
			} else if (checkToken.isAdmin === false) {
				return <Redirect to="404" />;
			}
		} else {
			localStorage.removeItem('tokenAdmin');
			return <Redirect to={AppURL.LOGIN} />;
		}
	};
	return (
		<Box>
			{handleCheckToken()}
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					style={{ display: 'flex', justifyContent: 'center' }}
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<Grid container>
							<Grid item xs={6} style={{ alignItems: 'center', display: 'flex' }}>
								{/* <IconButton>
									{open ? (
										<MenuIcon onClick={handleDrawerClose} />
									) : (
										<ChevronRightIcon onClick={handleDrawerOpen} />
									)}
								</IconButton> */}
								<Typography variant="h5" noWrap style={{ color: '#fff' }}>
									Trang Quan Tri
								</Typography>
							</Grid>
							<Grid
								item
								xs={4}
								style={{
									textAlign: 'end',
									paddingRight: '5vh',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
								}}
							>
								<Button onClick={handleClickLng}>
									<img src={item} />
									&nbsp;
									<i className="fa fa-angle-down" style={{ color: '#fff' }}></i>
								</Button>
								<Menu
									id="fade-menu"
									anchorEl={anchorEl}
									keepMounted
									open={open1}
									onClose={handleClose}
									TransitionComponent={Fade}
								>
									<MenuItem onClick={() => handleLanguage('en')}>
										<img src={icon} />
										&nbsp;English&nbsp;
										{valueI18n === 'en' && <i className="fa fa-check" aria-hidden="true"></i>}
									</MenuItem>
									<MenuItem onClick={() => handleLanguage('vi')}>
										<img src={iconvn} />
										&nbsp;Vietnamese&nbsp;
										{valueI18n === 'vi' && <i className="fa fa-check" aria-hidden="true"></i>}
									</MenuItem>
								</Menu>
							</Grid>
							<Grid
								item
								xs={2}
								style={{ alignItems: 'center', display: 'flex', paddingRight: '5vh' }}
							>
								<ListItem
									button
									style={{
										paddingBottom: 0,
										paddingTop: 0,
									}}
									onClick={handleClickProfile}
								>
									<ListItemAvatar>
										<Avatar>{profile?.charAt(0)}</Avatar>
									</ListItemAvatar>
									<div
										style={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											color: '#fff',
										}}
									>
										<div>Xin chao!</div>
										<div>
											<Typography variant="body2" noWrap>
												{profile}
											</Typography>
										</div>
									</div>
								</ListItem>
								<Menu
									id="simple-menu"
									anchorEl={anchorElProfile}
									keepMounted
									open={Boolean(anchorElProfile)}
									onClose={handleCloseProfile}
								>
									<MenuItem onClick={handleCloseProfile}>{t('tenant.profile')}</MenuItem>
									<MenuItem onClick={handleCloseProfile}>My account</MenuItem>
									<MenuItem onClick={handleLogout}>{t('tenant.log_out')}</MenuItem>
								</Menu>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
				>
					<div className={classes.toolbar} style={{ display: 'flex', alignItems: 'flex-end' }}>
						<img src={logo} style={{ width: '-webkit-fill-available' }} />
					</div>
					<Drawer
						variant="permanent"
						className={clsx(classes.drawer, {
							[classes.drawerOpen1]: open,
							[classes.drawerClose]: !open,
						})}
						classes={{
							paper: clsx({
								[classes.drawerOpen1]: open,
								[classes.drawerClose]: !open,
							}),
						}}
					>
						<Divider />
						<List style={{ paddingTop: 0, paddingBottom: 0 }}>
							<NavLink
								to={AppURL.ADMIN_HOME}
								activeClassName={classes.activeTagLi}
								className={classes.tagLi}
							>
								<ListItem
									button
									onClick={() => {
										history.push(AppURL.ADMIN_HOME);
										setShowCategories(false);
									}}
								>
									<HomeIcon style={{ color: '#fff', marginRight: '10px' }} />

									<ListItemText style={{ display: 'flex' }}>
										<Typography
											variant="h6"
											style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
										>
											Trang chu
										</Typography>
									</ListItemText>
								</ListItem>
								<Divider />
							</NavLink>
						</List>
						<List style={{ paddingTop: 0, paddingBottom: 0 }}>
							<ListItem
								button
								onClick={() => {
									setShowCategories(!showCategories);
								}}
							>
								<AvTimerIcon style={{ color: '#fff', marginRight: '10px' }} />

								<ListItemText style={{ display: 'flex' }}>
									<Typography
										variant="h6"
										style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
									>
										Quan tri danh muc
									</Typography>
								</ListItemText>
								{showCategories ? (
									<KeyboardArrowUpIcon style={{ color: '#fff' }} />
								) : (
									<KeyboardArrowDownIcon style={{ color: '#fff' }} />
								)}
							</ListItem>

							<Collapse in={showCategories} timeout="auto" unmountOnExit>
								<NavLink
									to="/admin/order/all"
									activeClassName={classes.activeTagLi}
									className={classes.tagLi}
								>
									<ListItem divider>
										<ListItemText style={{ display: 'flex', marginLeft: '32px' }}>
											<Typography variant="h6" style={{ fontSize: '18px', fontWeight: 'bold' }}>
												Loai san pham
											</Typography>
										</ListItemText>
									</ListItem>
								</NavLink>
								<NavLink
									to="/"
									activeClassName={classes.link}
									style={{ textDecoration: 'none', color: 'black' }}
								>
									<ListItem button>
										<ListItemText style={{ display: 'flex', marginLeft: '32px' }}>
											<Typography
												variant="h6"
												style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
											>
												Thuong hieu
											</Typography>
										</ListItemText>
									</ListItem>
								</NavLink>
								<NavLink
									to="/"
									//activeClassName={classes.link}
									style={{ textDecoration: 'none', color: 'black' }}
								>
									<ListItem button>
										<ListItemText style={{ display: 'flex', marginLeft: '32px' }}>
											<Typography
												variant="h6"
												style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
											>
												San pham
											</Typography>
										</ListItemText>
									</ListItem>
								</NavLink>
							</Collapse>

							<Divider />
						</List>
						<List style={{ paddingTop: 0, paddingBottom: 0 }}>
							<NavLink
								to={AppURL.MANAGER_USER}
								activeClassName={classes.activeTagLi}
								className={classes.tagLi}
							>
								<ListItem
									button
									onClick={() => {
										history.push(AppURL.MANAGER_USER);
										setShowCategories(false);
									}}
								>
									<PersonIcon style={{ color: '#fff', marginRight: '10px' }} />

									<ListItemText style={{ display: 'flex' }}>
										<Typography
											variant="h6"
											style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
										>
											Quan tri nguoi dung
										</Typography>
									</ListItemText>
								</ListItem>
								<Divider />
							</NavLink>
						</List>
						<List style={{ paddingTop: 0 }}>
							<NavLink
								to="/"
								//activeClassName={classes.link}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<ListItem button>
									<AvTimerIcon style={{ color: '#fff', marginRight: '10px' }} />

									<ListItemText style={{ display: 'flex' }}>
										<Typography
											variant="h6"
											style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
										>
											Quan tri danh muc
										</Typography>
									</ListItemText>
									<ArrowDropDownIcon style={{ color: '#fff' }} />
								</ListItem>
							</NavLink>
							<NavLink
								to="/"
								//activeClassName={classes.link}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<ListItem button>
									<ListItemText style={{ display: 'flex', marginLeft: '32px' }}>
										<Typography
											variant="h6"
											style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
										>
											Quan tri danh muc
										</Typography>
									</ListItemText>
								</ListItem>
							</NavLink>
							<NavLink
								to="/"
								//activeClassName={classes.link}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<ListItem button>
									<ListItemText style={{ display: 'flex', marginLeft: '32px' }}>
										<Typography
											variant="h6"
											style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
										>
											Quan tri danh muc
										</Typography>
									</ListItemText>
								</ListItem>
							</NavLink>
							<NavLink
								to="/"
								//activeClassName={classes.link}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<ListItem button>
									<ListItemText style={{ display: 'flex', marginLeft: '32px' }}>
										<Typography
											variant="h6"
											style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
										>
											Quan tri danh muc
										</Typography>
									</ListItemText>
								</ListItem>
							</NavLink>
							<Divider />
						</List>
					</Drawer>
				</Drawer>

				<main className={classes.content}>
					<div className={classes.toolbar} />
					{/* {handleCheckToken(props.children)} */}
					<Switch>
						<Route path={AppURL.MANAGER_USER} component={User} />
						<Route path={AppURL.ADMIN_HOME} component={Home} />
					</Switch>
				</main>
			</div>
		</Box>
	);
};
export default AdminLayout;
