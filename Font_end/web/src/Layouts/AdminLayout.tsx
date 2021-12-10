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
	SwipeableDrawer,
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PolicyIcon from '@material-ui/icons/Policy';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import icon from '../public/images/english.svg';
import iconvn from '../public/images/vietnamese.svg';
import { useTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Test from '../pages/text/Test';
import User from '../pages/Admin/User/User';
import HomeIcon from '@mui/icons-material/Home';
import Home from '../pages/Admin/Home/Home';
import { UserGet } from '../api/Admin/User';
import { useMediaQuery } from 'react-responsive';
import { Close } from '@material-ui/icons';
import MenuAdmin from './MenuAdmin';
import TypeProduct from '../pages/Admin/ProductType/TypeProduct';

import Product from '../pages/Admin/Product/Product';
import BrandProduct from '../pages/Admin/BrandProduct/BrandProduct';
import ProductPromotion from '../pages/Admin/Product/ProductPromotion';
import BillDetail from '../pages/Admin/Bill/BillDetail';
import ListBill from '../pages/Admin/Bill/ListBill';
import ListRating from '../pages/Admin/Rating.tsx/ListRating';
import ListNews from '../pages/Admin/News/ListNews';
import ListSlide from '../pages/Admin/Slide/ListSlide';
import PhoneIcon from '@mui/icons-material/Phone';
import ListContact from '../pages/Admin/Contact/ListContact';
import ListComment from '../pages/Admin/Comment/ListComment';
import GroupIcon from '@mui/icons-material/Group';
import ListEmployee from '../pages/Admin/Employee/ListEmployee';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ChangePwd from '../pages/Admin/Profile/ChangePwd';
import Profile from '../pages/Admin/Profile/Profile';
import {
	getValueRefreshPage,
	updateValueRefreshPage,
} from '../features/refresh/RefreshPageAdminSlice';
const drawerWidth = 300;

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
			height: '-webkit-fill-available',
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
		closeButton: {
			position: 'absolute',
			top: theme.spacing(1),
			right: theme.spacing(1),
			color: theme.palette.grey[500],
			zIndex: 1,
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
	const valueRefreshPage = useAppSelector(getValueRefreshPage);
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
		if (
			window.location.pathname.indexOf('type_product') !== -1 ||
			window.location.pathname.indexOf('brand_product') !== -1 ||
			window.location.pathname.indexOf('product') !== -1
		) {
			setShowCategories(2);
		}
	}, [setValueI18n, valueRefreshPage.value]);

	//const title = useAppSelector(titleHeader);
	const handleClick = (index: number, text: string) => {
		// setSelectedItem(index);
		// dispatch(updateTitleHeader(text));
	};
	const [openMenu, setOpenMenu] = React.useState(false);
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
	const [showCategories, setShowCategories] = React.useState(0);
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
	const menuData = [
		{
			id: 1,
			name: t('menu_admin.home'),
			icon: <HomeIcon style={{ color: '#fff', marginRight: '10px' }} />,
			children: [],
		},
		{
			id: 2,
			name: t('menu_admin.category_management'),
			icon: <AvTimerIcon style={{ color: '#fff', marginRight: '10px' }} />,
			children: [
				{ id: 202, name: t('menu_admin.type') },
				{ id: 203, name: t('menu_admin.branch') },
				{ id: 204, name: t('menu_admin.product') },
			],
		},
		{
			id: 3,
			name: t('menu_admin.user_management'),
			icon: <PersonIcon style={{ color: '#fff', marginRight: '10px' }} />,
			children: [],
		},
		{
			id: 4,
			name: t('menu_admin.order_management'),
			icon: <EventNoteIcon style={{ color: '#fff', marginRight: '10px' }} />,
			children: [],
		},
		{
			id: 5,
			name: t('menu_admin.news_management'),
			icon: (
				<i
					className="fa fa-newspaper-o"
					aria-hidden="true"
					style={{ color: '#fff', marginRight: '10px', fontSize: '20px' }}
				></i>
			),
			children: [],
		},
		{
			id: 6,
			name: t('menu_admin.slide_management'),
			icon: (
				<i
					className="fa fa-sliders"
					aria-hidden="true"
					style={{ color: '#fff', marginRight: '10px', fontSize: '20px' }}
				></i>
			),
			children: [],
		},
		{
			id: 7,
			name: t('menu_admin.contact_management'),
			icon: <PhoneIcon style={{ color: '#fff', marginRight: '10px' }} />,
			children: [],
		},
		{
			id: 8,
			name: t('menu_admin.comment_management'),
			icon: (
				<i
					className="fa fa-comments-o"
					aria-hidden="true"
					style={{ color: '#fff', marginRight: '10px', fontSize: '20px' }}
				></i>
			),
			children: [],
		},
		{
			id: 9,
			name: t('menu_admin.personnel_management'),
			icon: <GroupIcon style={{ color: '#fff', marginRight: '10px' }} />,
			children: [],
		},
	];

	const handleNavLink = (id: number) => {
		if (id === 1) {
			return AppURL.ADMIN_HOME;
		} else if (id === 2) {
			return AppURL.LOGIN;
		} else if (id === 3) {
			return AppURL.MANAGER_USER;
		} else if (id === 4) {
			return AppURL.ADMIN_BILL;
		} else if (id === 5) {
			return AppURL.ADMIN_NEWS;
		} else if (id === 6) {
			return AppURL.ADMIN_SLIDE;
		} else if (id === 7) {
			return AppURL.ADMIN_CONTACT;
		} else if (id === 8) {
			return AppURL.ADMIN_COMMENT;
		} else if (id === 9) {
			return AppURL.ADMIN_EMPLOYEE;
		} else {
			return AppURL.ADMIN_HOME;
		}
	};
	const handleNavLinkChildren = (id: number) => {
		if (id === 202) {
			return AppURL.ADMIN_TYPE_PRODUCT;
		} else if (id === 203) {
			return AppURL.ADMIN_BRAND_PRODUCT;
		} else if (id === 204) {
			return AppURL.ADMIN_PRODUCT;
		} else {
			return AppURL.ADMIN_HOME;
		}
	};

	const receiveShowCategories: (result: any) => void = (result) => {
		if (result.click === true) {
			setShowCategories(result.id);
		}
	};
	const closeMenu: (result: boolean) => void = (result) => {
		setOpenMenu(result);
	};

	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 1200px)' });
	const idCategory: (result: any) => void = (result) => {
		setShowCategories(result);
	};
	return isResponseiveMobile ? (
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
							<Grid item xs={5} style={{ alignItems: 'center', display: 'flex' }}>
								{/* <IconButton>
								{open ? (
									<MenuIcon onClick={handleDrawerClose} />
								) : (
									<ChevronRightIcon onClick={handleDrawerOpen} />
								)}
							</IconButton> */}
								<Typography variant="h5" noWrap style={{ color: '#fff' }}>
									{t('header_admin.administrator_page')}
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
								xs={3}
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
										<div>{t('header_admin.hello')}</div>
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
									<MenuItem
										onClick={() => {
											history.push(AppURL.ADMIN_PROFILE);
											setAnchorElProfile(null);
										}}
									>
										<PersonIcon />
										&nbsp;{t('header_admin.information_management')}
									</MenuItem>
									<MenuItem
										onClick={() => {
											history.push(AppURL.ADMIN_CHANGEPASSWORD);
											setAnchorElProfile(null);
										}}
									>
										<CompareArrowsIcon />
										&nbsp;{t('header_admin.change_password')}
									</MenuItem>
									<MenuItem onClick={handleLogout}>
										<ExitToAppIcon />
										&nbsp;{t('header_admin.logout')}
									</MenuItem>
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
						<img
							src={logo}
							style={{ width: '-webkit-fill-available', cursor: 'pointer' }}
							onClick={() => {
								history.push(AppURL.ADMIN_HOME);
							}}
						/>
					</div>
					<Drawer
						variant="permanent"
						// className={clsx(classes.drawer, {
						// 	[classes.drawerOpen1]: open,
						// 	[classes.drawerClose]: !open,
						// })}
						classes={{
							paper: clsx({
								[classes.drawerOpen1]: open,
								[classes.drawerClose]: !open,
							}),
						}}
					>
						<Divider />

						{menuData.map((item: any) => {
							return item.children.length > 0 ? (
								<List style={{ paddingTop: 0, paddingBottom: 0 }}>
									<ListItem
										button
										onClick={() => {
											showCategories === item.id
												? setShowCategories(0)
												: setShowCategories(item.id);
										}}
									>
										{item.icon}

										<ListItemText style={{ display: 'flex' }}>
											<Typography
												variant="h6"
												style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
											>
												{item.name}
											</Typography>
										</ListItemText>
										{showCategories === item.id ? (
											<KeyboardArrowUpIcon style={{ color: '#fff' }} />
										) : (
											<KeyboardArrowDownIcon style={{ color: '#fff' }} />
										)}
									</ListItem>

									{item.children.length > 0 && (
										<Collapse
											in={showCategories === item.id ? true : false}
											timeout="auto"
											unmountOnExit
										>
											{item.children.map((item: any) => {
												return (
													<NavLink
														to={handleNavLinkChildren(item.id)}
														activeClassName={classes.activeTagLi}
														className={classes.tagLi}
														style={{ textDecoration: 'none', color: 'black' }}
													>
														<ListItem button>
															<ListItemText style={{ display: 'flex', marginLeft: '32px' }}>
																<Typography
																	variant="h6"
																	style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
																>
																	{item.name}
																</Typography>
															</ListItemText>
														</ListItem>
													</NavLink>
												);
											})}
										</Collapse>
									)}

									<Divider />
								</List>
							) : (
								<List style={{ paddingTop: 0, paddingBottom: 0 }}>
									<NavLink
										to={handleNavLink(item.id)}
										activeClassName={classes.activeTagLi}
										className={classes.tagLi}
									>
										<ListItem
											button
											onClick={() => {
												showCategories === item.id
													? setShowCategories(0)
													: setShowCategories(item.id);
											}}
										>
											{item.icon}

											<ListItemText style={{ display: 'flex' }}>
												<Typography
													variant="h6"
													style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}
												>
													{item.name}
												</Typography>
											</ListItemText>
										</ListItem>
									</NavLink>

									<Divider />
								</List>
							);
						})}
					</Drawer>
				</Drawer>

				<main className={classes.content}>
					<div className={classes.toolbar} />
					{/* {handleCheckToken(props.children)} */}
					<Switch>
						<Route path={AppURL.MANAGER_USER} component={User} />
						<Route path={AppURL.ADMIN_HOME} component={Home} />
						<Route path={AppURL.ADMIN_TYPE_PRODUCT}>
							<TypeProduct idCategory={idCategory} />
						</Route>
						<Route path={AppURL.ADMIN_BRAND_PRODUCT} component={BrandProduct} />
						<Route path={AppURL.ADMIN_PRODUCT} component={Product} />
						<Route path={AppURL.ADMIN_PRODUCT_PROMOTION} component={ProductPromotion} />
						<Route path={AppURL.ADMIN_BILL} component={ListBill} />
						<Route path={AppURL.ADMIN_LIST_RATING} component={ListRating} />
						<Route path={AppURL.ADMIN_NEWS} component={ListNews} />
						<Route path={AppURL.ADMIN_SLIDE} component={ListSlide} />
						<Route path={AppURL.ADMIN_CONTACT} component={ListContact} />
						<Route path={AppURL.ADMIN_COMMENT} component={ListComment} />
						<Route path={AppURL.ADMIN_EMPLOYEE} component={ListEmployee} />
						<Route path={AppURL.ADMIN_CHANGEPASSWORD} component={ChangePwd} />
						<Route path={AppURL.ADMIN_PROFILE} component={Profile} />
					</Switch>
				</main>
			</div>
		</Box>
	) : (
		<Box>
			{handleCheckToken()}
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					style={{
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: '#00695c',
						height: '76px',
					}}
				>
					<Toolbar>
						<Grid container>
							<Grid item xs={5} style={{ alignItems: 'center', display: 'flex' }}>
								{/* <IconButton>
								{open ? (
									<MenuIcon onClick={handleDrawerClose} />
								) : (
									<ChevronRightIcon onClick={handleDrawerOpen} />
								)}
							</IconButton> */}
								<IconButton>
									<MenuIcon
										style={{ color: '#fff', marginRight: '10px', fontSize: '36px' }}
										onClick={() => setOpenMenu(true)}
									/>
								</IconButton>
								<Typography variant="h5" noWrap style={{ color: '#fff' }}>
									{t('header_admin.administrator_page')}
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
								xs={3}
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
										<div>{t('header_admin.hello')}</div>
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
									<MenuItem
										onClick={() => {
											history.push(AppURL.ADMIN_PROFILE);
											setAnchorElProfile(null);
										}}
									>
										<PersonIcon />
										&nbsp;{t('header_admin.information_management')}
									</MenuItem>
									<MenuItem
										onClick={() => {
											history.push(AppURL.ADMIN_CHANGEPASSWORD);
											setAnchorElProfile(null);
										}}
									>
										<CompareArrowsIcon />
										&nbsp;{t('header_admin.change_password')}
									</MenuItem>
									<MenuItem onClick={handleLogout}>
										<ExitToAppIcon />
										&nbsp;{t('header_admin.logout')}
									</MenuItem>
								</Menu>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<SwipeableDrawer
					anchor="left"
					open={openMenu}
					onClose={() => setOpenMenu(false)}
					onOpen={() => {}}
					style={{ position: 'relative' }}
				>
					<IconButton className={classes.closeButton} onClick={() => setOpenMenu(false)}>
						<Close style={{ color: '#fff' }} />
					</IconButton>
					<MenuAdmin
						menuData={menuData}
						receiveShowCategories={receiveShowCategories}
						showCategories={showCategories}
						closeMenu={closeMenu}
					/>
				</SwipeableDrawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{/* {handleCheckToken(props.children)} */}
					<Switch>
						<Route path={AppURL.MANAGER_USER} component={User} />
						<Route path={AppURL.ADMIN_HOME} component={Home} />
						<Route path={AppURL.ADMIN_TYPE_PRODUCT}>
							<TypeProduct idCategory={idCategory} />
						</Route>
						<Route path={AppURL.ADMIN_BRAND_PRODUCT} component={BrandProduct} />
						<Route path={AppURL.ADMIN_PRODUCT} component={Product} />
						<Route path={AppURL.ADMIN_PRODUCT_PROMOTION} component={ProductPromotion} />
						<Route path={AppURL.ADMIN_BILL} component={ListBill} />
						<Route path={AppURL.ADMIN_LIST_RATING} component={ListRating} />
						<Route path={AppURL.ADMIN_NEWS} component={ListNews} />
						<Route path={AppURL.ADMIN_SLIDE} component={ListSlide} />
						<Route path={AppURL.ADMIN_SLIDE} component={ListSlide} />
						<Route path={AppURL.ADMIN_CONTACT} component={ListContact} />
						<Route path={AppURL.ADMIN_COMMENT} component={ListComment} />
						<Route path={AppURL.ADMIN_EMPLOYEE} component={ListEmployee} />
						<Route path={AppURL.ADMIN_CHANGEPASSWORD} component={ChangePwd} />
						<Route path={AppURL.ADMIN_PROFILE} component={Profile} />
					</Switch>
				</main>
			</div>
		</Box>
	);
};
export default AdminLayout;
