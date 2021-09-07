import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import jwtDecode from 'jwt-decode';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import Logo from '../../public/images/logo1.png';
import icon from '../../public/images/english.svg';
import iconvn from '../../public/images/vietnamese.svg';
import CallIcon from '@material-ui/icons/Call';
import { Close } from '@material-ui/icons';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardHeader,
	Chip,
	DialogContent,
	DialogTitle,
	Fab,
	Fade,
	FormControl,
	Grid,
	Input,
	InputAdornment,
	InputLabel,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	OutlinedInput,
	Slide,
	SwipeableDrawer,
	useScrollTrigger,
	Zoom,
} from '@material-ui/core';
import { AppURL } from '../../utils/const';
import { UserGet } from '../../api/User';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import theme from '../../utils/theme';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children?: React.ReactElement;
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bgHeader: {
			backgroundColor: theme.palette.primary.main,
			paddingRight: theme.spacing(10),
			paddingLeft: theme.spacing(10),
		},
		grow: {
			flexGrow: 1,
		},
		root: {
			position: 'fixed',
			bottom: theme.spacing(3),
			right: theme.spacing(2),
		},
		adHover: {
			color: 'black',
			textDecoration: 'none',
			fontWeight: 'bold',
			'&:hover': {
				color: '#2196f3',
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		colorIcon: {
			color: theme.palette.primary.main,
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
		colorChip: {
			padding: '22px',
			fontSize: '18px',
			fontWeight: 'bold',
			color: 'black',
			border: `2px solid ${theme.palette.primary.main}`,
		},
		inputRoot: {
			color: 'inherit',
		},
		colorAvatar: {
			backgroundColor: '#fff',
			color: theme.palette.primary.main,
			fontWeight: 'bold',
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
		displayBoxContact: {
			display: 'block !important',
		},
		closeButton: {
			position: 'absolute',
			top: theme.spacing(1),
			right: theme.spacing(1),
			color: theme.palette.grey[500],
			zIndex: 1,
		},
		button: {},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	})
);
function ScrollTop(props: Props) {
	const { children, window } = props;
	const classes = useStyles();
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
			'#back-to-top-anchor'
		);

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	);
}
const Header: React.FC<Props> = (props) => {
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
	const [refresh, setRefresh] = React.useState(-1);
	const [showBoxContact, setShowBoxContact] = React.useState(false);
	React.useEffect(() => {
		const i18nLng = window.localStorage.getItem('i18nextLng') || 'en';
		if (i18nLng === 'en') {
			setItem(icon);
			setValueI18n(i18nLng);
		} else {
			setItem(iconvn);
			setValueI18n(i18nLng);
		}
		const getDataUser = async () => {
			const token: any = window.localStorage.getItem('token');
			const date = Date.now();
			if (token) {
				const checkToken: any = jwtDecode(token);
				if (checkToken.exp < date / 1000) {
					localStorage.removeItem('token');
				} else {
					const response = await UserGet();
					if (response.errorCode === null) {
						setDataUser(response.data);
					}
				}
			}
		};
		getDataUser();
	}, [refresh]);
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
	const [anchorElAccount, setAnchorElAccount] = React.useState<null | HTMLElement>(null);

	const handleClickAccountLogin = (event: any) => {
		setAnchorElAccount(event.currentTarget);
	};

	const handleCloseAccount = () => {
		setAnchorElAccount(null);
	};
	const history = useHistory();
	const handleClickLogout = () => {
		if (window.localStorage.getItem('token')) {
			window.localStorage.removeItem('token');
			setDataUser({ name: '' });
		}
		setAnchorElAccount(null);
	};
	const [openCart, setOpenCart] = React.useState(false);
	return (
		<div className={classes.grow}>
			<AppBar className={classes.bgHeader}>
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
							<Grid container justify="center" style={{ textAlign: 'center', color: '#fff' }}>
								<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
									{/* <i className="fa fa-newspaper-o" style={{ fontSize: '1.5vw' }}></i>
									<Link
										href="tel: 09878767"
										style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
									>
										<Typography component="h5" style={{ lineHeight: 'inherit' }}>
											{t('header.news')}
										</Typography>
									</Link> */}

									<ListItem style={{ cursor: 'pointer' }}>
										<ListItemAvatar style={{ marginRight: '-8px' }}>
											<Avatar style={{ backgroundColor: '#fff' }}>
												{/* <CallIcon style={{ color: '#16a086' }} /> */}
												<i
													className="fa fa-newspaper-o"
													style={{ fontSize: '1.5vw', color: theme.palette.primary.main }}
												></i>
											</Avatar>
										</ListItemAvatar>
										<div
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
											}}
										>
											<div>
												<Typography variant="body2" noWrap>
													Tin tuc
												</Typography>
											</div>
											<div>
												<Typography variant="h6" noWrap style={{ fontSize: '16px' }}>
													Hot news
												</Typography>
											</div>
										</div>
									</ListItem>
								</Grid>
								<Grid
									item
									xs={3}
									onMouseOver={() => setShowBoxContact(true)}
									onMouseOut={() => setShowBoxContact(false)}
									style={{ display: 'grid', alignItems: 'center', position: 'relative' }}
								>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<ListItem style={{ cursor: 'pointer' }}>
										<ListItemAvatar style={{ marginRight: '-8px' }}>
											<Avatar style={{ backgroundColor: '#fff' }}>
												<CallIcon className={classes.colorIcon} />
											</Avatar>
										</ListItemAvatar>
										<div
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
											}}
										>
											<div>
												<Typography variant="body2" noWrap>
													Ban hang
												</Typography>
											</div>
											<div>
												<Typography variant="h6" noWrap style={{ fontSize: '16px' }}>
													Online
												</Typography>
											</div>
										</div>
									</ListItem>
									{/* <Slide direction="down" in={showBoxContact}> */}
									<Box
										className={clsx(classes.button, showBoxContact && classes.displayBoxContact)}
										style={{
											position: 'absolute',
											top: '100%',
											display: 'none',
											zIndex: 1,
											paddingTop: '10px',
											color: 'black',
										}}
									>
										<Box
											boxShadow={3}
											pt={2}
											pr={3}
											pb={3}
											pl={3}
											style={{ backgroundColor: '#fff' }}
										>
											<Box pb={3}>
												<Chip
													label="BÁN HÀNG ONLINE(8H - 21H HÀNG NGÀY)"
													clickable
													color="primary"
													variant="outlined"
													size="medium"
													className={classes.colorChip}
												></Chip>
											</Box>
											<Box pb={3} style={{ textAlign: 'start' }}>
												<Typography variant="body1" gutterBottom>
													<Typography
														variant="body1"
														component="span"
														style={{ fontWeight: 'bold' }}
													>
														Tư vấn bán hàng
													</Typography>
													&nbsp;
													<Typography variant="body1" component="span" gutterBottom>
														(Gọi hoặc chat Zalo)
													</Typography>
												</Typography>

												<Typography variant="body1">
													<i
														className="fa fa-commenting-o"
														style={{ color: '#2196f3', fontSize: '23px' }}
													></i>
													&nbsp;
													<Typography variant="body1" component="span" style={{ color: '#2196f3' }}>
														Zalo
													</Typography>
													&nbsp;
													<Typography
														variant="body1"
														component="span"
														style={{ color: 'red', fontWeight: 'bold' }}
													>
														0818.215.215
													</Typography>
													&nbsp;
													<Typography variant="body1" component="span">
														Hotline 1
													</Typography>
												</Typography>
												<Typography variant="body1" gutterBottom>
													<i
														className="fa fa-commenting-o"
														style={{ color: '#2196f3', fontSize: '23px' }}
													></i>
													&nbsp;
													<Typography variant="body1" component="span" style={{ color: '#2196f3' }}>
														Zalo
													</Typography>
													&nbsp;
													<Typography
														variant="body1"
														component="span"
														style={{ color: 'red', fontWeight: 'bold' }}
													>
														0818.215.215
													</Typography>
													&nbsp;
													<Typography variant="body1" component="span">
														Hotline 2
													</Typography>
												</Typography>
												<Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
													Tư vấn qua Facebook
												</Typography>
												<Typography variant="body1" gutterBottom>
													<Typography variant="body1" component="span">
														- Truy cập ngay
													</Typography>
													&nbsp;
													<Typography variant="body1" component="span">
														<a
															title="Fanpages SangTV.VN"
															rel="nofollow"
															href="google.com"
															style={{ color: '#2196f3', textDecoration: 'none' }}
														>
															Fanpages SangTV.VN
														</a>
													</Typography>
													&nbsp;
													<Typography variant="body1" component="span">
														để được cập nhật giá, thông tin mới nhất về các sản phẩm công nghệ.
													</Typography>
												</Typography>
												<Typography variant="body1" gutterBottom>
													<Typography variant="body1" component="span">
														-
													</Typography>
													&nbsp;
													<Typography variant="body1" component="span">
														<a
															title="chat voi nhan vien"
															rel="nofollow"
															href="google.com"
															style={{ color: '#2196f3', textDecoration: 'none' }}
														>
															Ấn vào đây{' '}
															<i className="fa fa-comments" style={{ fontSize: '23px' }}></i>
														</a>
													</Typography>
													&nbsp;
													<Typography variant="body1" component="span">
														để chát trực tiếp với nhân viên tư vấn.
													</Typography>
												</Typography>
												<Typography variant="body1" gutterBottom style={{ fontWeight: 'bold' }}>
													Hỗ trợ cửa hàng
												</Typography>
												<Typography variant="body1" gutterBottom>
													<Typography variant="body1" component="span">
														<Typography variant="body1" component="span">
															Cơ sở 1:
														</Typography>
														&nbsp;
														<a
															title="Google map"
															rel="nofollow"
															href="google.com"
															className={classes.adHover}
														>
															Số 215 Giáp Nhất, Nhân Chính, Thanh Xuân, Hà Nội
														</a>
														&nbsp;
														<Typography variant="body1" component="span">
															- Gọi ngay:
														</Typography>
														&nbsp;
														<a
															href="tel:0818.215.215"
															style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold' }}
														>
															0818.215.215
														</a>
													</Typography>
												</Typography>
												<Typography variant="body1" gutterBottom>
													<Typography variant="body1" component="span">
														<Typography variant="body1" component="span">
															Cơ sở 2:
														</Typography>
														&nbsp;
														<a
															title="Google map"
															rel="nofollow"
															href="google.com"
															className={classes.adHover}
														>
															208 Xã Đàn, Đống Đa, Hà Nội
														</a>
														&nbsp;
														<Typography variant="body1" component="span">
															- Gọi ngay:
														</Typography>
														&nbsp;
														<a
															href="tel:0818.215.215"
															style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold' }}
														>
															0818.215.215
														</a>
													</Typography>
												</Typography>
											</Box>
										</Box>
									</Box>
									{/* </Slide> */}
								</Grid>

								<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									{dataUser.name === '' ? (
										<RouteLink
											to={AppURL.ACCOUNT}
											style={{ textDecoration: 'none', fontWeight: 'bold', color: '#fff' }}
										>
											<ListItem style={{ cursor: 'pointer' }}>
												<ListItemAvatar style={{ marginRight: '-8px' }}>
													<Avatar style={{ backgroundColor: '#fff' }}>
														<PersonIcon className={classes.colorIcon} />
													</Avatar>
												</ListItemAvatar>
												<div
													style={{
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														whiteSpace: 'nowrap',
													}}
												>
													{/* <div>
													<Typography variant="body2" noWrap>
														Ban hang
													</Typography>
												</div> */}
													<div>
														<Typography variant="h6" style={{ fontSize: '16px' }} noWrap>
															{t('header.account')}
														</Typography>
													</div>
												</div>
											</ListItem>
										</RouteLink>
									) : (
										<ListItem style={{ cursor: 'pointer' }} onClick={handleClickAccountLogin}>
											<ListItemAvatar style={{ marginRight: '-8px' }}>
												<Avatar className={classes.colorAvatar}>{dataUser.name.charAt(0)}</Avatar>
											</ListItemAvatar>
											<div
												style={{
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
												}}
											>
												<div>
													<Typography variant="body2" noWrap>
														Xin chao!
													</Typography>
												</div>
												<div style={{ display: 'grid' }}>
													<Typography variant="h6" style={{ fontSize: '16px' }} noWrap>
														{dataUser.name}
													</Typography>
												</div>
											</div>
										</ListItem>
									)}
									<Menu
										id="simple-menu"
										anchorEl={anchorElAccount}
										keepMounted
										open={Boolean(anchorElAccount)}
										onClose={handleCloseAccount}
									>
										<MenuItem onClick={handleCloseAccount}>Profile</MenuItem>
										<MenuItem onClick={handleCloseAccount}>My account</MenuItem>
										<MenuItem onClick={handleClickLogout}>
											<ExitToAppIcon />
											&nbsp;Logout
										</MenuItem>
									</Menu>
									{/* <Typography
											component="h5"
											style={{ lineHeight: 'inherit', display: 'content' }}
										>
											{dataUser.name === '' ? t('header.account') : dataUser.name}
										</Typography> */}
								</Grid>
								<Grid item xs={3} style={{ display: 'grid', alignItems: 'center' }}>
									{/* <FiberNewIcon style={{ position: 'absolute', fontSize: '3vw' }} /> */}

									<ListItem
										style={{ cursor: 'pointer' }}
										onClick={() => {
											setOpenCart(true);
										}}
									>
										<ListItemAvatar style={{ marginRight: '-8px' }}>
											<Avatar style={{ backgroundColor: '#fff' }}>
												<ShoppingCartIcon className={classes.colorIcon} />
											</Avatar>
										</ListItemAvatar>
										<div
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
											}}
										>
											{/* <div>
												<Typography variant="body2" noWrap>
													Ban hang
												</Typography>
											</div> */}
											<div>
												<Typography variant="h6" noWrap style={{ fontSize: '16px' }}>
													Gio hang
												</Typography>
											</div>
										</div>
									</ListItem>
								</Grid>
								<SwipeableDrawer
									anchor="right"
									open={openCart}
									onClose={() => setOpenCart(false)}
									onOpen={() => {}}
								>
									<Box style={{ width: 400 }}>
										<Box>
											<DialogTitle id="form-dialog-title">Thong tin thanh toan</DialogTitle>
											<IconButton
												className={classes.closeButton}
												onClick={() => setOpenCart(false)}
											>
												<Close />
											</IconButton>
											<DialogContent>
												<Typography variant="body2">
													- Số Tài Khoản: 0501000182310 tên tài khoản: TRAN VAN SANG Ngân hàng TMCP
													ngoại thương Việt Nam - chi nhánh Bắc Sài Gòn.
												</Typography>
												<Typography variant="body2">
													- Tài khoản Momo: 0904978049 - TRAN VAN SANG.{' '}
												</Typography>
												<Typography variant="body2">
													- Nội dung chuyển tiền các bạn để: ten dang nhap, ten goi license ma ban
													mua.
												</Typography>
												<Typography variant="body2">
													-Nhận được tiền, Admin sẽ kich hoat goi ma ban da chon!
												</Typography>
											</DialogContent>
										</Box>
									</Box>
								</SwipeableDrawer>
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
			<Toolbar id="back-to-top-anchor" />
			<ScrollTop {...props}>
				<Fab color="primary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</div>
	);
};
export default Header;
