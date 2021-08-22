import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link as RouteLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logo from '../../public/images/logo1.png';
import icon from '../../public/images/english.svg';
import {
	Avatar,
	Card,
	CardHeader,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
} from '@material-ui/core';
import { AppURL } from '../../utils/const';
import { UserGet } from '../../api/User';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bgHeader: {
			backgroundColor: '#16a086',
			paddingRight: theme.spacing(10),
			paddingLeft: theme.spacing(10),
		},
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
		search: {
			// color: 'black',
			// '&:hover': {
			// 	backgroundColor: '#fff',
			// },
			//marginRight: theme.spacing(2),
			//marginLeft: 0,
			//width: '100%',
			// [theme.breakpoints.up('sm')]: {
			// 	marginLeft: theme.spacing(3),
			// 	width: 'auto',
			// },
		},
		inputRoot: {
			color: 'inherit',
		},
		inputInput: {
			height: '3ch',
			padding: theme.spacing(1, 6, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
			transition: theme.transitions.create('width'),
			//width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		inputSearch: {
			height: '48px',
			paddingRight: 0,
			borderRadius: theme.shape.borderRadius,
			backgroundColor: '#fff',
		},
		a: {
			borderRight: '1px solid',
			marginRight: '15px',
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	})
);
const Header: React.FC = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);
	React.useEffect(() => {
		const getDataUser = async () => {
			const response = await UserGet();
			console.log(response.data);
		};
		getDataUser();
	}, []);
	return (
		<div className={classes.grow}>
			<AppBar position="static" className={classes.bgHeader}>
				<Toolbar style={{ height: '9ch' }}>
					<Grid container spacing={2}>
						<Grid item xs={2}>
							<img src={Logo} alt="logo" width="85%" />
						</Grid>
						<Grid item xs={3}>
							<FormControl style={{ width: '100%' }}>
								<OutlinedInput
									className={classes.inputSearch}
									id="standard-adornment-password"
									placeholder="Search..."
									endAdornment={
										<InputAdornment position="end">
											<IconButton style={{}}>
												<SearchIcon style={{}} />
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
							<Grid
								container
								justify="center"
								spacing={3}
								style={{ textAlign: 'center', color: '#fff' }}
							>
								<Grid item xs={3}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}
									<i className="fa fa-newspaper-o" style={{ fontSize: '1.5vw' }}></i>
									<Link
										href="tel: 09878767"
										style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
									>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											Tin tức
										</Typography>
									</Link>
								</Grid>
								<Grid item xs={3}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<Link
										href="tel: 08434534"
										style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
									>
										<i className="fa fa-phone" style={{ fontSize: '1.5vw' }}></i>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											Liên hệ: 08434534
										</Typography>
									</Link>
								</Grid>
								<Grid item xs={3}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<a href="#" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}>
										<i className="fa fa-shopping-cart" style={{ fontSize: '1.5vw' }}></i>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											Giỏ hàng
										</Typography>
									</a>
								</Grid>
								<Grid item xs={3}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<RouteLink
										to={AppURL.ACCOUNT}
										style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
									>
										<i className="fa fa-user" style={{ fontSize: '1.5vw' }}></i>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											Tài khoản
										</Typography>
									</RouteLink>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={1} style={{ display: 'flex', alignItems: 'center' }}>
							<img src={icon} />
							&nbsp;
							<i className="fa fa-angle-down" aria-hidden="true"></i>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
};
export default Header;
