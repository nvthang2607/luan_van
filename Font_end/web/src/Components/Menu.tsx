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
import { TypeBranch } from '../api/Product';
const useStyles = makeStyles((theme: Theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		marginBottom: '10px',
	},
	showBoxBranch: {
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
	React.useEffect(() => {
		const fetchTypeBranch = async () => {
			const getTypeBranch = await TypeBranch();
			if (getTypeBranch) {
				if (getTypeBranch.errorCode === null) {
					//	console.log(getTypeBranch);
					setDataMenu(getTypeBranch);
				}
			}
		};
		fetchTypeBranch();
	}, []);
	const [showBoxBranch, setShowBoxBranch] = React.useState(false);
	const [showBoxCategories, setShowBoxCategories] = React.useState(false);
	const [idProduct, setIdProduct] = React.useState(0);
	const [dataBranch, setDataBranch] = React.useState<any>([]);
	const onMouseOverProduct = (item: any) => {
		setIdProduct(item.id);

		setDataBranch(item.branch);
		if (item.branch.length > 0) {
			setShowBoxBranch(true);
		}
	};
	const onMouseOverBoxBranch = () => {
		setShowBoxBranch(true);
		setShowBoxCategories(true);
	};
	const onMouseOutBoxBranch = () => {
		setShowBoxBranch(false);
		setShowBoxCategories(false);
		//setIdProduct(0);
	};
	const showBranch = () => {
		if (dataBranch.length > 0) {
			const data = dataBranch.map((item: any) => {
				return (
					<React.Fragment>
						<ListItem>
							<Typography>{item.name}</Typography>
						</ListItem>
					</React.Fragment>
				);
			});
			return data;
		}
	};
	const onMouseOutProduct = (item: any) => {
		setShowBoxBranch(false);
		//setIdProduct(0);
	};
	const onClickBranch = (item: any) => {
		console.log(item);
	};
	const showListCategories = () => {
		if (dataMenu.data.length > 0) {
			const data = dataMenu.data.map((item: any, index: number) => {
				const showIcon = (item: any) => {
					if (item.id === 1) {
						return <PhoneAndroidIcon />;
					} else if (item.id === 2) {
						return <TabletAndroidIcon />;
					} else if (item.id === 3) {
						return <LaptopIcon />;
					} else if (item.id === 4) {
						return <HeadsetIcon />;
					}
				};

				// const showBranch = item.branch.map((item: any, index: number) => {
				// 	return (
				// 		<React.Fragment>
				// 			<ListItem button onClick={() => onClickBranch(item)} divider>
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
						<i
							className="fa fa-angle-right"
							aria-hidden="true"
							style={{ paddingRight: '10px' }}
						></i>
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
							//minHeight: '299px',
							cursor: 'default',
						}}
					>
						<Box style={{ width: '-webkit-fill-available', backgroundColor: '#fff', zIndex: 1 }}>
							{showListCategories()}
						</Box>
					</Box>
				</Box>
				<Box
					className={clsx(classes.button, showBoxBranch && classes.showBoxBranch)}
					style={{
						position: 'absolute',
						top: '105%',
						display: 'none',

						zIndex: 2,
						width: '-webkit-fill-available',
						marginRight: '184px',
						left: '184px',
						paddingLeft: '63px',
						//minHeight: '295px',
					}}
					onMouseOver={onMouseOverBoxBranch}
					onMouseOut={onMouseOutBoxBranch}
				>
					<Box boxShadow={3} className={classes.bgProduct}>
						<List>{showBranch()}</List>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
export default Menu;
