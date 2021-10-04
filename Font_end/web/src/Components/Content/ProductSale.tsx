import {
	Avatar,
	Box,
	Chip,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	MenuItem,
	MenuList,
	styled,
	Theme,
	Typography,
} from '@material-ui/core';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LaptopIcon from '@material-ui/icons/Laptop';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import HeadsetIcon from '@material-ui/icons/Headset';
import img1 from './../../public/images/830-300-830x300-5.png';
import img2 from './../../public/images/830-300-830x300-9.png';
import img3 from './../../public/images/fold3-830-300-830x300-4.png';
import img4 from './../../public/images/slider_6.jpg';
import img5 from './../../public/images/slider_7.jpg';
import sp1 from './../../public/images/10047676-dien-thoai-vsmart-aris-8gb-128gb-xam-nhat-thuc-1.jpg';
import sale from './../../public/images/evo_block_product_title_2.gif';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { relative } from 'path';
import { Rating } from '@material-ui/lab';
import { PhoneBranch, SearchPhoneGet } from '../../api/Product';
import { AppURL } from '../../utils/const';
import theme from './../../utils/theme/index';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import spsale from './../../public/images/4.png';
import Countdown from 'react-countdown';
interface ProductProps {
	unit_price?: number;
	name?: any;
	id?: number;
	rate_number?: number;
	link?: string;
	avg?: number;
	promotion_price?: number;
	storeQuantity?: number;
	promotion?: any;
	addToCart?: (boolean: boolean) => void;
	timeout?: any;
	resultTimeout?: any;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: '30px',
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: '#d4d7d9',
		height: '10px',
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.primary.main,
		height: '10px',
	},
}));
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#f4f4f4',
	},
	showBox: {
		display: 'block !important',
	},
	discount_percent: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
		marginRight: '10px',
		fontSize: '18px',
	},
	coutdown: {
		borderRadius: '10px',
		color: '#fff',
		backgroundColor: 'black',
		marginRight: '10px',
		fontSize: '25px',
		minWidth: '67px',
	},
	showBorder: {
		borderLeft: '0.5px solid #8c8c8c4f',
		borderRight: '0.5px solid #8c8c8c4f',
	},
	button: {},
	stylePhoneBranch: {
		textDecoration: 'none',
		color: 'black',
		fontWeight: 'bold',
		'&:hover': {
			color: '#ff6600',
		},
	},
	styleViewAll: {
		color: '#ff6600',
		textDecoration: 'none',
		'&:hover': {
			color: 'red',
		},
	},
	titles: {
		textDecoration: 'none',
		padding: '12px',
		fontSize: '19px',
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		position: 'relative',
		fontWeight: 'bold',
	},
	title: {
		position: 'absolute',
		backgroundColor: 'inherit',
		transform: `skew(${23}deg)`,
		padding: 'inherit',
		top: 0,
		left: '10%',
		zIndex: -1,
		display: 'inherit',
		height: '-webkit-fill-available',
		width: '-webkit-fill-available',
	},
	nameProduct: {
		textDecoration: 'none',
		color: 'black',
		'&:hover': {
			color: theme.palette.primary.main + ' !important',
		},
	},
	hoverProduct: {
		cursor: 'pointer',
		'&:hover': {
			boxShadow: `rgb(${0} ${0} ${0} / ${20}%) ${0}px ${3}px ${5}px ${-1}px, rgb(${0} ${0} ${0} / ${14}%) ${0}px ${5}px ${8}px ${0}px, rgb(${0} ${0} ${0} / ${12}%) ${0}px ${1}px ${14}px ${0}px`,
		},
	},

	borderTitle: {
		borderBottom: `4px solid ${theme.palette.primary.main}`,
		display: 'inline-flex',

		zIndex: 1,
	},
	tagLi: {
		width: 'inherit',
		float: 'left',
		cursor: 'pointer',
		paddingLeft: '12px',
		paddingRight: '12px',
		'&:hover': {
			borderLeft: '0.5px solid #8c8c8c4f',
			borderRight: '0.5px solid #8c8c8c4f',
		},
	},
}));
const ProductSale: React.FC<ProductProps> = (props) => {
	const classes = useStyles();
	const Completionist = () => <span>You are good to go!</span>;
	const renderer = (hours: any, minutes: any, seconds: any, completed: any) => {
		if (completed) {
			// Render a completed state
			return <Completionist />;
		} else {
			// Render a countdown
			return (
				<span>
					{hours}:{minutes}:{seconds}
				</span>
			);
		}
	};
	const now = new Date().getTime();
	const countdownTime = new Date('3 Dec, 2021 13:00:00').getTime();
	const distance = countdownTime - now;
	//const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);
	const history = useHistory();
	const timeDistance = (hours * 60 * 60 + minutes * 60 + seconds + 60) * 1000;
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
	return (
		<React.Fragment>
			<Box style={{ display: 'flex' }}>
				<Box>
					<img
						width="100%"
						src={`http://localhost:8000/${props.link}`}
						onClick={() => {
							history.push(`/product_detail/${toURL(props?.name)}-${props?.id}.html`);
						}}
						style={{ cursor: 'pointer' }}
					/>
				</Box>
				<Box style={{ width: '80%' }}>
					<Box>
						<Typography
							variant="body1"
							gutterBottom
							style={{
								height: '51px',
								overflow: 'hidden',
								display: '-webkit-box',
								textOverflow: 'ellipsis',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								fontWeight: 400,
							}}
						>
							{props.name}
						</Typography>
					</Box>
					<Box>
						<Typography variant="h6" style={{ fontWeight: 'bold' }}>
							{Intl.NumberFormat('en-US').format(Number(props.unit_price))}đ
						</Typography>
					</Box>
					{/* <Box>
						<Typography component="span" className={classes.discount_percent} gutterBottom>
							-6%
						</Typography>
						<Typography
							gutterBottom
							component="span"
							style={{ color: 'grey', textDecoration: 'line-through' }}
						>
							{Intl.NumberFormat('en-US').format(Number(12000000))}đ
						</Typography>
					</Box> */}

					<Box style={{ marginTop: '10px' }}>
						<Typography gutterBottom>
							<Chip
								label="FLASH SALE HOM NAY"
								color="secondary"
								variant="outlined"
								size="medium"
								style={{ fontWeight: 'bold' }}
							></Chip>
						</Typography>
					</Box>
					<Box>
						<Typography>Gia soc online</Typography>
					</Box>
					<Box>
						<Typography
							variant="h6"
							style={{
								color: 'red',
								fontWeight: 'bold',
								display: 'inline-block',
								paddingRight: '15px',
							}}
						>
							{Intl.NumberFormat('en-US').format(Number(props.promotion_price))}đ
						</Typography>
					</Box>
					<Box>
						<Typography style={{ display: 'flex', alignItems: 'center' }}>
							<Rating
								name="read-only"
								value={Number(Number(props.avg).toFixed(1))}
								precision={0.04}
								readOnly
								style={{
									paddingRight: '10px',
									borderRight: '1px solid grey',
									fontSize: '20px',
								}}
							/>
							<Typography
								component="span"
								style={{
									paddingLeft: '10px',
									color: 'grey',
								}}
							>
								{props.rate_number} đánh giá
							</Typography>
						</Typography>
					</Box>
					{/* <Box style={{ marginTop: '20px' }}>
						<BorderLinearProgress variant="determinate" value={50} />
						<Typography style={{ marginTop: '5px' }}>
							Da ban{' '}
							<Typography component="span" style={{ color: ' red' }}>
								0
							</Typography>
							/ 10 san pham
						</Typography>
					</Box> */}
				</Box>
			</Box>
			<Countdown
				date={Date.now() + timeDistance}
				renderer={({ hours, minutes, seconds, completed }) => {
					if (completed) {
						// Render a completed state
						return <Completionist />;
					} else {
						// Render a countdown
						return (
							<Box
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									marginTop: '20px',
									alignItems: 'center',
									textAlign: 'center',
								}}
							>
								<Typography component="span" style={{ marginRight: '10px' }}>
									Ket thuc trong
								</Typography>
								{/* {days > 0 && (
									<React.Fragment>
										<Typography
											component="span"
											variant="h6"
											style={{ fontWeight: 'bold', marginLeft: '10px', color: 'red' }}
										>
											{days < 10 ? '0' + days : days}
										</Typography>
										<Typography
											component="span"
											variant="h6"
											style={{ marginRight: '10px', marginLeft: '10px' }}
										>
											ngay
										</Typography>
									</React.Fragment>
								)} */}
								<Box>
									<Typography className={classes.coutdown}>
										<Typography
											style={{
												fontSize: '23px',
												paddingLeft: '15px',
												paddingRight: '15px',
												fontWeight: 'bold',
											}}
										>
											{hours < 10 ? '0' + hours : hours}
										</Typography>
										<Divider style={{ backgroundColor: 'red' }} />
										<Typography
											style={{
												fontSize: '15px',
												paddingLeft: '15px',
												paddingBottom: '7px',
												paddingRight: '15px',
												fontWeight: 'bold',
											}}
										>
											Giờ
										</Typography>
									</Typography>
								</Box>
								<Typography
									style={{
										fontSize: '30px',
										fontWeight: 'bold',
										marginRight: '10px',
										paddingTop: '4px',
									}}
								>
									:
								</Typography>
								<Box>
									<Typography className={classes.coutdown}>
										<Typography
											style={{
												fontSize: '23px',
												paddingLeft: '15px',
												paddingRight: '15px',
												fontWeight: 'bold',
											}}
										>
											{minutes < 10 ? '0' + minutes : minutes}
										</Typography>
										<Divider style={{ backgroundColor: 'red' }} />
										<Typography
											style={{
												fontSize: '15px',
												paddingLeft: '15px',
												paddingBottom: '5px',
												paddingRight: '15px',
												fontWeight: 'bold',
											}}
										>
											Phút
										</Typography>
									</Typography>
								</Box>
								<Typography
									style={{
										fontSize: '30px',
										fontWeight: 'bold',
										marginRight: '10px',
										paddingTop: '4px',
									}}
								>
									:
								</Typography>
								<Box>
									<Typography className={classes.coutdown}>
										<Typography
											style={{
												fontSize: '23px',
												paddingLeft: '15px',
												paddingRight: '15px',
												fontWeight: 'bold',
											}}
										>
											{/* {seconds < 10 ? '0' + seconds : seconds} */}
											{seconds}
										</Typography>
										<Divider style={{ backgroundColor: 'red' }} />
										<Typography
											style={{
												fontSize: '15px',
												paddingLeft: '15px',
												paddingBottom: '5px',
												paddingRight: '15px',
												fontWeight: 'bold',
											}}
										>
											Giây
										</Typography>
									</Typography>
								</Box>
							</Box>
						);
					}
				}}
			/>
		</React.Fragment>
	);
};
export default ProductSale;
