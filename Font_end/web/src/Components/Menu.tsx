import {
	Avatar,
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	MenuItem,
	MenuList,
	Theme,
	Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LaptopIcon from '@material-ui/icons/Laptop';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import HeadsetIcon from '@material-ui/icons/Headset';
import clsx from 'clsx';
import { TypeBrand } from '../api/Product';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme: Theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#f4f4f4',
		marginTop: '20px',
		marginBottom: '10px',
	},
	stylePhoneBrand: {
		textDecoration: 'none',
		color: 'black',
		fontWeight: 'bold',
		'&:hover': {
			color: '#ff6600',
		},
	},
	showBoxBrand: {
		display: 'inline-flex !important',
	},
	bgCategory: {
		display: 'inline-flex',
		alignItems: 'center',
		width: 'fit-content',
		padding: '5px',
		backgroundColor: theme.palette.primary.main,
		cursor: 'pointer',
		position: 'relative',
		color: '#fff',
	},
	showBoxCategories: {
		display: 'grid !important',
	},
	bgProduct: {
		zIndex: 1,
		width: '-webkit-fill-available',
		backgroundColor: '#fff',
		borderLeft: `4px solid ${theme.palette.primary.main}`,
	},
	showBorder: {
		borderLeft: '0.5px solid #8c8c8c4f',
		borderRight: '0.5px solid #8c8c8c4f',
	},
	button: {},
	tagLi: {
		width: 'inherit',
		float: 'left',
		cursor: 'pointer',
		paddingLeft: '12px',
		paddingRight: '12px',
		backgroundColor: '#72ada2',
		color: '#fff',
	},
}));

const Menu: React.FC = () => {
	const classes = useStyles();
	const [dataMenu, setDataMenu] = React.useState<any>({
		errorCode: null,
		data: [],
	});
	const toURL = (str: string) => {
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
	React.useEffect(() => {
		const fetchTypeBrand = async () => {
			const getTypeBrand = await TypeBrand();
			if (getTypeBrand) {
				if (getTypeBrand.errorCode === null) {
					//	console.log(getTypeBrand);
					setDataMenu(getTypeBrand);
				}
			}
		};
		fetchTypeBrand();
	}, []);
	const [showBoxBrand, setShowBoxBrand] = React.useState(false);
	const [showBoxCategories, setShowBoxCategories] = React.useState(false);
	const [idProduct, setIdProduct] = React.useState(0);
	const [dataBrand, setDataBrand] = React.useState<any>([]);
	const onMouseOverProduct = (item: any) => {
		setIdProduct(item.id);

		setDataBrand(item.brand);
		if (item.brand.length > 0) {
			setShowBoxBrand(true);
		}
	};
	const onMouseOverBoxBrand = () => {
		setShowBoxBrand(true);
		setShowBoxCategories(true);
	};
	const onMouseOutBoxBrand = () => {
		setShowBoxBrand(false);
		setShowBoxCategories(false);
		//setIdProduct(0);
	};
	const showBrand = () => {
		if (dataBrand.length > 0) {
			const data = dataBrand.map((item: any) => {
				return (
					<React.Fragment>
						<Link
							to={`/views/dien-thoai/${toURL(item.name)}-${item.id}`}
							className={classes.stylePhoneBrand}
						>
							<ListItem>
								<Typography>{item.name}</Typography>
							</ListItem>
						</Link>
					</React.Fragment>
				);
			});
			return data;
		}
	};
	const onMouseOutProduct = (item: any) => {
		setShowBoxBrand(false);
		//setIdProduct(0);
	};
	const onClickBrand = (item: any) => {
		console.log(item);
	};
	const showListCategories = () => {
		if (dataMenu.data.length > 0) {
			const data = dataMenu.data.map((item: any, index: number) => {
				const showIcon = (item: any) => {
					if (item.name === 'Điện thoại') {
						return <PhoneAndroidIcon />;
					} else if (item.name === 'Máy tính bảng') {
						return <TabletAndroidIcon />;
					} else if (item.name === 'Máy tính') {
						return <LaptopIcon />;
					} else if (item.name === 4) {
						return <HeadsetIcon />;
					}
				};

				// const showBrand = item.brand.map((item: any, index: number) => {
				// 	return (
				// 		<React.Fragment>
				// 			<ListItem button onClick={() => onClickBrand(item)} divider>
				// 				<ListItemText primary={item.name} />
				// 			</ListItem>
				// 		</React.Fragment>
				// 	);
				// });
				return (
					<ListItem
						className={clsx(classes.button, idProduct === item.id && classes.tagLi)}
						onMouseOver={() => onMouseOverProduct(item)}
						onMouseOut={() => onMouseOutProduct(item)}
						divider
					>
						{showIcon(item)}
						&nbsp;&nbsp;
						<ListItemText primary={item.name} />
						{item.brand?.length > 0 && (
							<i
								className="fa fa-angle-right"
								aria-hidden="true"
								style={{ paddingRight: '10px' }}
							></i>
						)}
					</ListItem>
				);
			});
			return data;
		}
	};
	return (
		<Grid container className={classes.bgHeader}>
			<Grid item xs={12} style={{ position: 'relative' }}>
				{/* <List> */}
				{/* {showListMenu()} */}

				{/* <ListItem
						className={classes.tagLi}
						onMouseOver={() => setShowBox(true)}
						onMouseOut={() => setShowBox(false)}
					>
						<PhoneAndroidIcon />
						&nbsp;&nbsp;
						<ListItemText primary="Dien thoai" />
						<Box
							boxShadow={3}
							className={clsx(classes.button, showBox && classes.showBox)}
							style={{ position: 'absolute', top: '100%', display: 'none' }}
						>
							<List>
								<ListItem button>
									<ListItemText primary="Inbox" />
								</ListItem>
								<Divider />
								<ListItem button divider>
									<ListItemText primary="Drafts" />
								</ListItem>
								<ListItem button>
									<ListItemText primary="Trash" />
								</ListItem>
								<Divider light />
								<ListItem button>
									<ListItemText primary="Spam" />
								</ListItem>
							</List>
						</Box>
					</ListItem>
					<ListItem className={classes.tagLi}>
						<LaptopIcon />
						&nbsp;&nbsp;
						<ListItemText primary="Laptop" />
					</ListItem>
					<ListItem className={classes.tagLi}>
						<TabletAndroidIcon />
						&nbsp;&nbsp;
						<ListItemText primary="May tinh bang" />
					</ListItem>
					<ListItem className={classes.tagLi}>
						<HeadsetIcon />
						&nbsp;&nbsp;
						<ListItemText primary="Phu kien" />
					</ListItem> */}
				{/* </List> */}
				<Box
					className={classes.bgCategory}
					onMouseOver={() => setShowBoxCategories(true)}
					onMouseOut={() => setShowBoxCategories(false)}
				>
					<MenuIcon />
					<Typography variant="h6">DANH MỤC SẢN PHẨM</Typography>
					<Box
						boxShadow={3}
						className={clsx(classes.button, showBoxCategories && classes.showBoxCategories)}
						style={{
							position: 'absolute',
							display: 'none',
							color: 'black',
							zIndex: 3,
							width: '-webkit-fill-available',
							left: 0,
							top: '96%',
							height: '360px',
							backgroundColor: '#fff',
							cursor: 'default',
						}}
					>
						<Box style={{ width: '-webkit-fill-available', backgroundColor: '#fff', zIndex: 1 }}>
							{showListCategories()}
						</Box>
					</Box>
				</Box>
				<Box
					className={clsx(classes.button, showBoxBrand && classes.showBoxBrand)}
					style={{
						position: 'absolute',
						top: '97%',
						display: 'none',
						height: '360px',
						zIndex: 2,
						width: '-webkit-fill-available',
						marginRight: '184px',
						left: '184px',
						paddingLeft: '63px',
						//minHeight: '295px',
					}}
					onMouseOver={onMouseOverBoxBrand}
					onMouseOut={onMouseOutBoxBrand}
				>
					<Box boxShadow={3} className={classes.bgProduct}>
						<List>{showBrand()}</List>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
export default Menu;
