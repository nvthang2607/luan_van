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
import iconvn from '../../public/images/vietnamese.svg';
import {
	Avatar,
	Button,
	Card,
	CardHeader,
	Fade,
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
import { useTranslation } from 'react-i18next';

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
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
	const [dataUser, setDataUser] = React.useState({ name: '' });
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
	React.useEffect(() => {
		const getDataUser = async () => {
			const response = await UserGet();
			if (response.errorCode === null) {
				setDataUser(response.data);
			} else {
				window.localStorage.getItem('token') && window.localStorage.removeItem('token');
			}
		};
		getDataUser();
	}, []);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const { t, i18n } = useTranslation();
	const [valueI18n, setValueI18n] = React.useState('en');
	const handleLanguage = (value: string) => {
		setAnchorEl(null);
		i18n.changeLanguage(value);
		if (value === 'en') {
			setItem(icon);
			setValueI18n(value);
		} else {
			setItem(iconvn);
			setValueI18n(value);
		}
	};
	const [item, setItem] = React.useState<any>(icon);
	React.useEffect(() => {
		const i18nLng = window.localStorage.getItem('i18nextLng') || 'en';
		if (i18nLng === 'en') {
			setItem(icon);
			setValueI18n(i18nLng);
		} else {
			setItem(iconvn);
			setValueI18n(i18nLng);
		}
	}, [setValueI18n]);
	return (
		<div className={classes.grow}>
			<AppBar position="static" className={classes.bgHeader}>
				<Toolbar style={{ height: '9ch' }}>
					<Grid container spacing={2}>
						<Grid item xs={2} style={{ display: 'grid', alignItems: 'center' }}>
							<img src={Logo} alt="logo" width="85%" />
						</Grid>
						<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
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
								<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}
									<i className="fa fa-newspaper-o" style={{ fontSize: '1.5vw' }}></i>
									<Link
										href="tel: 09878767"
										style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
									>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											{t('header.news')}
										</Typography>
									</Link>
								</Grid>
								<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<Link
										href="tel: 08434534"
										style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
									>
										<i className="fa fa-phone" style={{ fontSize: '1.5vw' }}></i>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											{t('header.contact') + ': 08434534'}
										</Typography>
									</Link>
								</Grid>
								<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<a href="#" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}>
										<i className="fa fa-shopping-cart" style={{ fontSize: '1.5vw' }}></i>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											{t('header.cart')}
										</Typography>
									</a>
								</Grid>
								<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<RouteLink
										to={AppURL.ACCOUNT}
										style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
									>
										{dataUser.name === '' ? (
											<i className="fa fa-user" style={{ fontSize: '1.5vw' }}></i>
										) : (
											<i
												className="fa fa-user-circle"
												style={{ fontSize: '1.5vw', color: 'brown' }}
											></i>
										)}

										<Typography
											component="h5"
											style={{ lineHeight: 'inherit', display: 'content' }}
										>
											{dataUser.name === '' ? t('header.account') : dataUser.name}
										</Typography>
									</RouteLink>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={1} style={{ display: 'flex', alignItems: 'center' }}>
							<Button onClick={handleClick}>
								<img src={item} />
								&nbsp;
								<i className="fa fa-angle-down" style={{ color: '#fff' }}></i>
							</Button>
							<Menu
								id="fade-menu"
								anchorEl={anchorEl}
								keepMounted
								open={open}
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
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};
export default Header;
