import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Collapse,
	DialogContent,
	DialogTitle,
	Divider,
	FormHelperText,
	IconButton,
	InputBase,
	ListItemAvatar,
	ListItemText,
	Theme,
	Typography,
} from '@material-ui/core';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { Close } from '@material-ui/icons';
import RemoveIcon from '@material-ui/icons/Remove';
import sp1 from './../../public/images/10047676-dien-thoai-vsmart-aris-8gb-128gb-xam-nhat-thuc-1.jpg';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, createStyles } from '@material-ui/styles';
import { AppURL } from '../../utils/const';
import theme from '../../utils/theme';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteProduct, getCartData, updateQuantity } from '../Product/CartSlice';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { updateValueRefreshPage } from '../../features/refresh/RefreshPageSlice';
import icon from '../../public/images/english.svg';
import iconvn from '../../public/images/vietnamese.svg';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
interface CartProps {
	receiveMenu?: (result: boolean) => void;
	dataUser?: any;
	dataMenu?: any;
	logoutMenuMobile?: (result: boolean) => void;
	changeLanguage?: (result: string) => void;
	valueI18n?: string;
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
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
		root: {
			position: 'fixed',
			bottom: theme.spacing(3),
			right: theme.spacing(2),
		},
		adHover: {
			'&:hover': {
				color: `${theme.palette.primary.main} !important`,
			},
		},
		styleSearch: { height: '7px !important' },
		menuButton: {
			marginRight: theme.spacing(2),
		},
		colorIcon: {
			color: theme.palette.primary.main,
			fontSize: '30px',
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
		styleLng: { borderBottom: `2px solid ${theme.palette.primary.main}` },
		styleLink: {
			textDecoration: 'none',
			cursor: 'pointer',
			color: 'black',
			display: 'flex',
			paddingLeft: '24px',
			paddingRight: '18px',
			alignItems: 'center',
			'&:hover': {
				color: theme.palette.primary.main,
			},
		},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	})
);
const MenuMobile: React.FC<CartProps> = (props) => {
	const classes = useStyles();
	const [openCart, setOpenCart] = React.useState(false);
	const [count, setCount] = React.useState(0);
	const [quantity, setQuantity] = React.useState(1);
	const { t } = useTranslation();
	const cartData = useAppSelector(getCartData);
	const dispatch = useAppDispatch();
	//console.log(cartData);
	const totalPrice = () => {
		let total = 0;
		cartData.map((item: any) => {
			total += item.quantity * item.promotion_price;
		});
		return total;
	};
	const [err, setErr] = React.useState<any>();
	const toURL = (str: any) => {
		str = str.toLowerCase();
		str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
		str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
		str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
		str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
		str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
		str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
		str = str.replace(/(đ)/g, 'd');
		str = str.replace(/([^0-9a-z-\s])/g, '');
		str = str.replace(/(\s+)/g, '-');
		str = str.replace(/^-+/g, '');
		str = str.replace(/-+$/g, '');
		return str;
	};

	const history = useHistory();
	const [showBrand, setShowBrand] = React.useState('');
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	return isResponseivePhone ? (
		<Box style={{ width: 400 }}>
			<Box>
				<DialogTitle
					id="form-dialog-title"
					style={{ backgroundColor: theme.palette.primary.main, paddingBottom: '7px' }}
				>
					{props.dataUser.name === '' ? (
						<Box style={{ display: 'flex' }}>
							<Box style={{ marginRight: '34px' }}>
								<ListItemAvatar style={{ marginRight: '-8px' }}>
									<Avatar style={{ backgroundColor: '#fff' }}>
										<PersonIcon className={classes.colorIcon} />
									</Avatar>
								</ListItemAvatar>
							</Box>
							<Box style={{ display: 'flex', alignItems: 'center' }}>
								<Link to={AppURL.ACCOUNT} style={{ textDecoration: 'none' }}>
									<Typography
										variant="body1"
										style={{
											color: 'white',
											fontWeight: 'bold',
											marginRight: '47px',
											cursor: 'pointer',
										}}
									>
										Đăng nhập
									</Typography>
								</Link>
								<Link to={AppURL.ACCOUNT} style={{ textDecoration: 'none' }}>
									<Typography
										variant="body1"
										style={{
											color: 'white',
											fontWeight: 'bold',
											marginRight: '47px',
											cursor: 'pointer',
										}}
									>
										Đăng ký
									</Typography>
								</Link>
							</Box>
						</Box>
					) : (
						<Box style={{ display: 'flex' }}>
							<Box style={{ marginRight: '10px' }}>
								<ListItemAvatar>
									<Avatar className={classes.colorAvatar}>{props.dataUser.name.charAt(0)}</Avatar>
								</ListItemAvatar>
							</Box>
							<div
								style={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
							>
								<div>
									<Typography variant="body2" noWrap style={{ color: '#fff' }}>
										Xin chào!
									</Typography>
								</div>
								<div style={{ display: 'grid' }}>
									<Typography variant="h6" style={{ fontSize: '16px', color: '#fff' }} noWrap>
										{props.dataUser.name}
									</Typography>
								</div>
							</div>
						</Box>
					)}
				</DialogTitle>

				<DialogContent style={{ padding: 0 }}>
					<Box
						style={{ marginTop: '12px', marginLeft: '24px', display: 'flex', marginBottom: '10px' }}
					>
						<Box
							style={{
								marginRight: '20px',

								cursor: 'pointer',
							}}
							className={clsx(classes.button, props.valueI18n === 'en' && classes.styleLng)}
							onClick={() => {
								props.changeLanguage?.('en');
								props.receiveMenu?.(false);
							}}
						>
							<img src={icon} />
						</Box>
						<Box
							style={{
								cursor: 'pointer',
							}}
							className={clsx(classes.button, props.valueI18n === 'vn' && classes.styleLng)}
							onClick={() => {
								props.changeLanguage?.('vn');
								props.receiveMenu?.(false);
							}}
						>
							<img src={iconvn} />
						</Box>
					</Box>
					<Typography
						variant="body1"
						style={{
							textTransform: 'uppercase',
							textAlign: 'center',
							fontWeight: 'bold',
							backgroundColor: '#f3f3f3',
							paddingTop: '11px',
							paddingBottom: '8px',
						}}
					>
						Menu
					</Typography>
					<Divider />
					<Box
						className={classes.styleLink}
						onClick={() => {
							history.push('/');
							props.receiveMenu?.(false);
						}}
					>
						<Typography
							variant="body1"
							style={{
								fontWeight: 500,
								paddingTop: '8px',
								paddingBottom: '8px',
							}}
						>
							Trang chủ
						</Typography>
					</Box>
					<Divider />
					<Box
						className={classes.styleLink}
						onClick={() => {
							history.push(AppURL.PROFILE_INFO);
							props.receiveMenu?.(false);
						}}
					>
						<Typography
							variant="body1"
							style={{
								fontWeight: 500,
								paddingTop: '8px',
								paddingBottom: '8px',
							}}
						>
							Giới thiệu
						</Typography>
					</Box>
					<Divider />
					<Box
						className={classes.styleLink}
						onClick={() => {
							history.push(AppURL.NEWS);
							props.receiveMenu?.(false);
							window.scrollTo(0, 0);
						}}
					>
						<Typography
							variant="body1"
							style={{
								fontWeight: 500,
								paddingTop: '8px',
								paddingBottom: '8px',
							}}
						>
							{t('header.news')}
						</Typography>
					</Box>
					<Divider />
					<Typography
						variant="body1"
						style={{
							textTransform: 'uppercase',
							textAlign: 'center',
							fontWeight: 'bold',
							backgroundColor: '#f3f3f3',
							paddingTop: '11px',
							paddingBottom: '8px',
						}}
					>
						{t('header.categories')}
					</Typography>
					<Divider />
					{props.dataMenu.data?.map((item: any) => {
						return (
							<React.Fragment>
								<Box className={classes.styleLink}>
									<ListItemText
										onClick={() => {
											//history.push(AppURL.PROFILE_INFO);

											props.receiveMenu?.(false);
										}}
									>
										<Typography
											variant="body1"
											style={{
												fontWeight: 500,
												paddingTop: '8px',
												paddingBottom: '8px',
											}}
										>
											{item.name}
										</Typography>
									</ListItemText>
									{item.brand?.length > 0 &&
										(showBrand === item.id ? (
											<RemoveIcon
												className={classes.adHover}
												style={{ color: '#595959' }}
												onClick={() =>
													showBrand === item.id ? setShowBrand('') : setShowBrand(item.id)
												}
											/>
										) : (
											<AddIcon
												className={classes.adHover}
												style={{ color: '#595959' }}
												onClick={() =>
													showBrand === item.id ? setShowBrand('') : setShowBrand(item.id)
												}
											/>
										))}
								</Box>
								<Divider />
								<Collapse in={showBrand === item.id ? true : false} timeout="auto" unmountOnExit>
									<Box>
										{item.brand?.map((item: any) => {
											return (
												<React.Fragment>
													<Box className={classes.styleLink} style={{ paddingLeft: '45px' }}>
														<ListItemText
															onClick={() => {
																//history.push(AppURL.PROFILE_INFO);
																props.receiveMenu?.(false);
															}}
														>
															<Typography
																variant="body1"
																style={{
																	paddingTop: '8px',
																	paddingBottom: '8px',
																}}
															>
																{item.name}
															</Typography>
														</ListItemText>
													</Box>
													<Divider />
												</React.Fragment>
											);
										})}
									</Box>
								</Collapse>
							</React.Fragment>
						);
					})}

					{props.dataUser.name !== '' && (
						<React.Fragment>
							<Typography
								variant="body1"
								style={{
									textTransform: 'uppercase',
									textAlign: 'center',
									fontWeight: 'bold',
									backgroundColor: '#f3f3f3',
									paddingTop: '11px',
									paddingBottom: '8px',
								}}
							>
								Thông tin tài khoản
							</Typography>
							<Divider />
							<Box
								className={classes.styleLink}
								onClick={() => {
									history.push(AppURL.PROFILE_INFO);
									props.receiveMenu?.(false);
								}}
							>
								<Typography
									variant="body1"
									style={{
										fontWeight: 500,
										paddingTop: '8px',
										paddingBottom: '8px',
									}}
								>
									Quản lý thông tin
								</Typography>
							</Box>
							<Divider />
							<Box
								className={classes.styleLink}
								onClick={() => {
									history.push(AppURL.ORDER_ALL);
									props.receiveMenu?.(false);
								}}
							>
								<Typography
									variant="body1"
									style={{
										fontWeight: 500,
										paddingTop: '8px',
										paddingBottom: '8px',
									}}
								>
									Quản lý đơn hàng
								</Typography>
							</Box>
							<Divider />
							<Box
								className={classes.styleLink}
								onClick={() => {
									props.logoutMenuMobile?.(true);
									props.receiveMenu?.(false);
									history.push('/');
								}}
							>
								<Typography
									variant="body1"
									style={{
										fontWeight: 500,
										paddingTop: '8px',
										paddingBottom: '8px',
									}}
								>
									Thoát tài khoản
								</Typography>
							</Box>
							<Divider />
						</React.Fragment>
					)}
				</DialogContent>
			</Box>
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
		</Box>
	) : (
		<Box style={{ width: 306 }}>
			<Box>
				<DialogTitle
					id="form-dialog-title"
					style={{ backgroundColor: theme.palette.primary.main, paddingBottom: '7px' }}
				>
					{props.dataUser.name === '' ? (
						<Box style={{ display: 'flex' }}>
							<Box style={{ marginRight: '34px' }}>
								<ListItemAvatar style={{ marginRight: '-8px' }}>
									<Avatar style={{ backgroundColor: '#fff' }}>
										<PersonIcon className={classes.colorIcon} />
									</Avatar>
								</ListItemAvatar>
							</Box>
							<Box style={{ display: 'flex', alignItems: 'center' }}>
								<Link to={AppURL.ACCOUNT} style={{ textDecoration: 'none' }}>
									<Typography
										variant="body1"
										style={{
											color: 'white',
											fontWeight: 'bold',
											marginRight: '47px',
											cursor: 'pointer',
										}}
									>
										Đăng nhập
									</Typography>
								</Link>
								<Link to={AppURL.ACCOUNT} style={{ textDecoration: 'none' }}>
									<Typography
										variant="body1"
										style={{
											color: 'white',
											fontWeight: 'bold',
											marginRight: '47px',
											cursor: 'pointer',
										}}
									>
										Đăng ký
									</Typography>
								</Link>
							</Box>
						</Box>
					) : (
						<Box style={{ display: 'flex' }}>
							<Box style={{ marginRight: '10px' }}>
								<ListItemAvatar>
									<Avatar className={classes.colorAvatar}>{props.dataUser.name.charAt(0)}</Avatar>
								</ListItemAvatar>
							</Box>
							<div
								style={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
							>
								<div>
									<Typography variant="body2" noWrap style={{ color: '#fff' }}>
										Xin chào!
									</Typography>
								</div>
								<div style={{ display: 'grid' }}>
									<Typography variant="h6" style={{ fontSize: '16px', color: '#fff' }} noWrap>
										{props.dataUser.name}
									</Typography>
								</div>
							</div>
						</Box>
					)}
				</DialogTitle>

				<DialogContent style={{ padding: 0 }}>
					<Box
						style={{ marginTop: '12px', marginLeft: '24px', display: 'flex', marginBottom: '10px' }}
					>
						<Box
							style={{
								marginRight: '20px',

								cursor: 'pointer',
							}}
							className={clsx(classes.button, props.valueI18n === 'en' && classes.styleLng)}
							onClick={() => {
								props.changeLanguage?.('en');
								props.receiveMenu?.(false);
							}}
						>
							<img src={icon} />
						</Box>
						<Box
							style={{
								cursor: 'pointer',
							}}
							className={clsx(classes.button, props.valueI18n === 'vn' && classes.styleLng)}
							onClick={() => {
								props.changeLanguage?.('vn');
								props.receiveMenu?.(false);
							}}
						>
							<img src={iconvn} />
						</Box>
					</Box>
					<Typography
						variant="body1"
						style={{
							textTransform: 'uppercase',
							textAlign: 'center',
							fontWeight: 'bold',
							backgroundColor: '#f3f3f3',
							paddingTop: '11px',
							paddingBottom: '8px',
						}}
					>
						Menu
					</Typography>
					<Divider />
					<Box
						className={classes.styleLink}
						onClick={() => {
							history.push('/');
							props.receiveMenu?.(false);
						}}
					>
						<Typography
							variant="body1"
							style={{
								fontWeight: 500,
								paddingTop: '8px',
								paddingBottom: '8px',
							}}
						>
							Trang chủ
						</Typography>
					</Box>
					<Divider />
					<Box
						className={classes.styleLink}
						onClick={() => {
							history.push(AppURL.PROFILE_INFO);
							props.receiveMenu?.(false);
						}}
					>
						<Typography
							variant="body1"
							style={{
								fontWeight: 500,
								paddingTop: '8px',
								paddingBottom: '8px',
							}}
						>
							Giới thiệu
						</Typography>
					</Box>
					<Divider />
					<Box
						className={classes.styleLink}
						onClick={() => {
							history.push(AppURL.PROFILE_INFO);
							props.receiveMenu?.(false);
						}}
					>
						<Typography
							variant="body1"
							style={{
								fontWeight: 500,
								paddingTop: '8px',
								paddingBottom: '8px',
							}}
						>
							{t('header.news')}
						</Typography>
					</Box>
					<Divider />
					<Typography
						variant="body1"
						style={{
							textTransform: 'uppercase',
							textAlign: 'center',
							fontWeight: 'bold',
							backgroundColor: '#f3f3f3',
							paddingTop: '11px',
							paddingBottom: '8px',
						}}
					>
						{t('header.categories')}
					</Typography>
					<Divider />
					{props.dataMenu.data?.map((item: any) => {
						return (
							<React.Fragment>
								<Box className={classes.styleLink}>
									<ListItemText
										onClick={() => {
											//history.push(AppURL.PROFILE_INFO);

											props.receiveMenu?.(false);
										}}
									>
										<Typography
											variant="body1"
											style={{
												fontWeight: 500,
												paddingTop: '8px',
												paddingBottom: '8px',
											}}
										>
											{item.name}
										</Typography>
									</ListItemText>
									{item.brand?.length > 0 &&
										(showBrand === item.id ? (
											<RemoveIcon
												className={classes.adHover}
												style={{ color: '#595959' }}
												onClick={() =>
													showBrand === item.id ? setShowBrand('') : setShowBrand(item.id)
												}
											/>
										) : (
											<AddIcon
												className={classes.adHover}
												style={{ color: '#595959' }}
												onClick={() =>
													showBrand === item.id ? setShowBrand('') : setShowBrand(item.id)
												}
											/>
										))}
								</Box>
								<Divider />
								<Collapse in={showBrand === item.id ? true : false} timeout="auto" unmountOnExit>
									<Box>
										{item.brand?.map((item: any) => {
											return (
												<React.Fragment>
													<Box className={classes.styleLink} style={{ paddingLeft: '45px' }}>
														<ListItemText
															onClick={() => {
																//history.push(AppURL.PROFILE_INFO);
																props.receiveMenu?.(false);
															}}
														>
															<Typography
																variant="body1"
																style={{
																	paddingTop: '8px',
																	paddingBottom: '8px',
																}}
															>
																{item.name}
															</Typography>
														</ListItemText>
													</Box>
													<Divider />
												</React.Fragment>
											);
										})}
									</Box>
								</Collapse>
							</React.Fragment>
						);
					})}

					{props.dataUser.name !== '' && (
						<React.Fragment>
							<Typography
								variant="body1"
								style={{
									textTransform: 'uppercase',
									textAlign: 'center',
									fontWeight: 'bold',
									backgroundColor: '#f3f3f3',
									paddingTop: '11px',
									paddingBottom: '8px',
								}}
							>
								Thông tin tài khoản
							</Typography>
							<Divider />
							<Box
								className={classes.styleLink}
								onClick={() => {
									history.push(AppURL.PROFILE_INFO);
									props.receiveMenu?.(false);
								}}
							>
								<Typography
									variant="body1"
									style={{
										fontWeight: 500,
										paddingTop: '8px',
										paddingBottom: '8px',
									}}
								>
									Quản lý thông tin
								</Typography>
							</Box>
							<Divider />
							<Box
								className={classes.styleLink}
								onClick={() => {
									history.push(AppURL.ORDER_ALL);
									props.receiveMenu?.(false);
								}}
							>
								<Typography
									variant="body1"
									style={{
										fontWeight: 500,
										paddingTop: '8px',
										paddingBottom: '8px',
									}}
								>
									Quản lý đơn hàng
								</Typography>
							</Box>
							<Divider />
							<Box
								className={classes.styleLink}
								onClick={() => {
									props.logoutMenuMobile?.(true);
									props.receiveMenu?.(false);
									history.push('/');
								}}
							>
								<Typography
									variant="body1"
									style={{
										fontWeight: 500,
										paddingTop: '8px',
										paddingBottom: '8px',
									}}
								>
									Thoát tài khoản
								</Typography>
							</Box>
							<Divider />
						</React.Fragment>
					)}
				</DialogContent>
			</Box>
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
		</Box>
	);
};
export default MenuMobile;
