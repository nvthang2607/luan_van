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
	const [showBranch, setShowBranch] = React.useState('');
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	const handleNavLink = (id: number) => {
		if (id === 1) {
			return AppURL.ADMIN_HOME;
		} else if (id === 2) {
			return AppURL.LOGIN;
		} else if (id === 3) {
			return AppURL.MANAGER_USER;
		} else {
			return AppURL.ADMIN_HOME;
		}
	};
	const handleNavLinkChildren = (id: number) => {
		if (id === 202) {
			return AppURL.ADMIN_TYPE_PRODUCT;
		} else if (id === 203) {
			return AppURL.LOGIN;
		} else if (id === 204) {
			return AppURL.MANAGER_USER;
		} else {
			return AppURL.ADMIN_HOME;
		}
	};
	return isResponseivePhone ? (
		<Box style={{ width: 500, backgroundColor: '#00695c' }}>
			<Box>
				<DialogTitle
					id="form-dialog-title"
					style={{ backgroundColor: '#00695c', paddingBottom: '7px' }}
				>
					<img width="40%" src={logo} />
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
											? props.receiveShowCategories({ click: true, id: '' })
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
												? props.receiveShowCategories({ click: true, id: '' })
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
	) : (
		<Box style={{ width: 306 }}>
			<Box>
				<DialogTitle
					id="form-dialog-title"
					style={{ backgroundColor: theme.palette.primary.main, paddingBottom: '7px' }}
				></DialogTitle>

				<DialogContent style={{ padding: 0 }}></DialogContent>
			</Box>
		</Box>
	);
};
export default MenuAdmin;
