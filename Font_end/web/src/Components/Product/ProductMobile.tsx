import {
	Avatar,
	Box,
	Button,
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
	Theme,
	Typography,
	Zoom,
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
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { relative } from 'path';
import { Rating } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCartData, updataCartData } from './CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import { AppURL } from '../../utils/const';
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
}
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
	},
	showBox: {
		display: 'block !important',
	},
	showBorder: {
		borderLeft: '0.5px solid #8c8c8c4f',
		borderRight: '0.5px solid #8c8c8c4f',
	},
	button: {},
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
		'&:hover': {
			boxShadow: `rgb(${0} ${0} ${0} / ${20}%) ${0}px ${3}px ${5}px ${-1}px, rgb(${0} ${0} ${0} / ${14}%) ${0}px ${5}px ${8}px ${0}px, rgb(${0} ${0} ${0} / ${12}%) ${0}px ${1}px ${14}px ${0}px`,
		},
	},
	borderTitle: {
		borderBottom: `4px solid ${theme.palette.primary.main}`,
		marginTop: '20px',
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
const ProductMobile: React.FC<ProductProps> = (props) => {
	const classes = useStyles();
	const [hoverProduct, setHoverProduct] = React.useState(false);
	const onMouseOverProduct = () => {
		setHoverProduct(true);
	};
	const onMouseOutProduct = () => {
		setHoverProduct(false);
	};
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
	const dispatch = useAppDispatch();
	const history = useHistory();
	//const cartData: any = [];
	const cartData = useAppSelector(getCartData);
	const storeQuantity = () => {
		let result = 1;
		cartData.map((item: any) => {
			//console.log(item.quantity);
			//console.log(dataProduct);
			if (item.id === props.id) {
				if (item.quantity >= Number(props.storeQuantity)) result = -1;
			}
		});
		return result;
	};
	const buyNow = () => {
		//setPrefresh(refresh + 1);
		if (storeQuantity() === -1) {
			props.addToCart?.(false);
		} else {
			dispatch(
				updataCartData({
					id: props.id,
					name: props.name,
					storeQuantity: props.storeQuantity,
					link: props.link,
					unit_price: props.unit_price,
					promotion_price: props.promotion_price,
					quantity: 1,
					promotion: props.promotion,
				})
			);
			//window.scrollTo(0, 0);
			//history.push(AppURL.CHECKOUT);
			//toast.success('Da them san pham vao gio hang');
			props.addToCart?.(true);
		}
	};
	return (
		<React.Fragment>
			<Box
				boxShadow={hoverProduct && 5}
				style={{ padding: '20px', position: 'relative' }}
				onMouseOver={onMouseOverProduct}
				onMouseOut={onMouseOutProduct}
				className={classes.hoverProduct}
			>
				<Chip
					label="-6%"
					color="primary"
					style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
				/>
				<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
					<img
						width="100%"
						src={`http://localhost:8000/${props.link}`}
						onClick={() => {
							history.push(`/product_detail/${toURL(props?.name)}-${props?.id}.html`);
						}}
						style={{ cursor: 'pointer' }}
					/>
				</Box>
				<Box style={{ marginBottom: '10px' }}>
					<Link
						to={`/product_detail/${toURL(props?.name)}-${props?.id}.html`}
						className={classes.nameProduct}
					>
						<Typography
							style={{
								height: '55px',
								overflow: 'hidden',
								display: '-webkit-box',
								textOverflow: 'ellipsis',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',

								fontSize: '1.1rem',
							}}
							variant="h6"
						>
							{props.name}
						</Typography>
					</Link>
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
					<Typography
						style={{
							textDecoration: 'line-through',
							color: 'grey',
							display: 'inline-block',
						}}
					>
						{Intl.NumberFormat('en-US').format(Number(props.unit_price))}đ
					</Typography>
				</Box>
				<Box style={{ display: 'flex', alignItems: 'center' }}>
					<Rating
						name="read-only"
						value={Number(Number(props.avg).toFixed(1))}
						precision={0.04}
						readOnly
						style={{
							paddingRight: '10px',
							borderRight: '1px solid grey',
							fontSize: '18px',
						}}
					/>
					<Typography
						component="span"
						style={{
							paddingLeft: '10px',
							color: 'grey',
							fontSize: '14px',
						}}
					>
						{props.rate_number} đánh giá
					</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};
export default ProductMobile;
