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
	carouselOnclick?: (boolean: boolean) => void;
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
		cursor: 'pointer',
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
const ProductCarouselPhone: React.FC<ProductProps> = (props) => {
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
	const history = useHistory();
	return (
		<Link
			to={`/product_detail/${toURL(props?.name)}-${props?.id}.html`}
			className={classes.nameProduct}
		>
			<Box
				boxShadow={hoverProduct && 5}
				style={{ padding: '20px', position: 'relative' }}
				onMouseOver={onMouseOverProduct}
				onMouseOut={onMouseOutProduct}
				className={classes.hoverProduct}
				onClick={() => props.carouselOnclick?.(true)}
			>
				<Chip
					label="-6%"
					color="primary"
					style={{
						position: 'absolute',
						right: '9px',
						top: '8px',
						fontSize: '13px',
					}}
				/>
				<Box
					style={{
						textAlign: 'center',
						marginBottom: '35px',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<img width="100%" src={`http://localhost:8000${props.link}`} />
				</Box>
				<Box style={{ marginBottom: '10px' }}>
					<Link
						to={`/product_detail/${toURL(props?.name)}-${props?.id}.html`}
						className={classes.nameProduct}
					>
						<Typography
							style={{
								height: '45px',
								overflow: 'hidden',
								display: '-webkit-box',
								textOverflow: 'ellipsis',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
							}}
							variant="body1"
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
							fontSize: '13px',
						}}
					>
						{Intl.NumberFormat('en-US').format(Number(props.promotion_price))}đ
					</Typography>
					<Typography
						style={{
							textDecoration: 'line-through',
							color: 'grey',
							display: 'inline-block',
							fontSize: '12px',
						}}
					>
						{Intl.NumberFormat('en-US').format(Number(props.unit_price))}đ
					</Typography>
				</Box>
				{/* <Box style={{ display: 'flex', alignItems: 'center' }}>
				<Rating
					name="read-only"
					value={3}
					readOnly
					style={{
						paddingRight: '10px',
						borderRight: '1px solid grey',
					}}
				/>
				<Typography
					component="span"
					style={{
						paddingLeft: '10px',
						color: 'grey',
					}}
				>
					1 đánh giá
				</Typography>
			</Box> */}
				{/* <Zoom in={hoverProduct}>
				<Box style={{ marginTop: '10px' }}>
					<Button variant="contained" color="primary" style={{ width: '48%' }}>
						Chi tiet
					</Button>
					<Button variant="contained" style={{ float: 'right', width: '48%', color: 'grey' }}>
						Mua ngay
					</Button>
				</Box>
			</Zoom> */}
			</Box>
		</Link>
	);
};
export default ProductCarouselPhone;
