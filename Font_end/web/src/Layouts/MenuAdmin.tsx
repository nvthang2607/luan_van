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
	List,
	ListItem,
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
import theme from '../utils/theme';
import logo from '../public/images/logo1.png';
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import icon from '../../public/images/english.svg';
import iconvn from '../../public/images/vietnamese.svg';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { AppURL } from '../utils/const';
interface CartProps {
	menuData?: any;
	receiveShowCategories?: any;
	showCategories?: any;
	closeMenu?: (result: boolean) => void;
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
const MenuAdmin: React.FC<CartProps> = (props) => {
	const classes = useStyles();
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

	const history = useHistory();
	const [showBrand, setShowBrand] = React.useState('');
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
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
	return (
		<Box
			style={{
				width: isResponseivePhone ? 500 : 300,
				backgroundColor: '#00695c',
				height: '-webkit-fill-available',
			}}
		>
			<Box>
				<DialogTitle
					id="form-dialog-title"
					style={{ backgroundColor: '#00695c', paddingBottom: '7px' }}
				>
					<img
						width="40%"
						src={logo}
						onClick={() => {
							history.push(AppURL.ADMIN_HOME);
							props.closeMenu?.(false);
						}}
						style={{ cursor: 'pointer' }}
					/>
				</DialogTitle>
				<Divider />
				<DialogContent style={{ padding: 0 }}>
					{props.menuData.map((item: any) => {
						return item.children.length > 0 ? (
							<List style={{ paddingTop: 0, paddingBottom: 0 }}>
								<ListItem
									button
									onClick={() => {
										props.showCategories === item.id
											? props.receiveShowCategories({ click: true, id: 0 })
											: props.receiveShowCategories({ click: true, id: item.id });
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
									{props.showCategories === item.id ? (
										<RemoveIcon style={{ color: '#fff', marginRight: '3px' }} />
									) : (
										<AddIcon style={{ color: '#fff', marginRight: '3px' }} />
									)}
								</ListItem>

								{item.children.length > 0 && (
									<Collapse
										in={props.showCategories === item.id ? true : false}
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
													<ListItem
														button
														onClick={() => {
															props.closeMenu?.(false);
														}}
													>
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
											props.showCategories === item.id
												? props.receiveShowCategories({ click: true, id: 0 })
												: props.receiveShowCategories({ click: true, id: item.id });

											props.closeMenu?.(false);
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
				</DialogContent>
			</Box>
		</Box>
	);
};
export default MenuAdmin;
