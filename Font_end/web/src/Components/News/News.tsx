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
import { toast, ToastContainer } from 'react-toastify';
import { AppURL } from '../../utils/const';
interface ProductProps {
	date?: Date;
	id?: number;
	link?: string;
	title?: string;
	content?: any;
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
		color: theme.palette.primary.main + ' !important',
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
const News: React.FC<ProductProps> = (props) => {
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

	return (
		<React.Fragment>
			<Box
				//boxShadow={hoverProduct && 5}
				style={{ padding: '20px', position: 'relative' }}
				//onMouseOver={onMouseOverProduct}
				//onMouseOut={onMouseOutProduct}
				//className={classes.hoverProduct}
			>
				<Box
					style={{ textAlign: 'center', marginBottom: '20px' }}
					onMouseOver={onMouseOverProduct}
					onMouseOut={onMouseOutProduct}
					//className={classes.hoverProduct}
				>
					<img
						width="100%"
						src={`http://localhost:8000${props.link}`}
						onClick={() => {
							history.push(`/news_detail/${toURL(props?.title)}-${props?.id}.html`);
						}}
						style={{ cursor: 'pointer' }}
					/>
				</Box>
				<Box style={{ marginBottom: '20px' }}>
					<Typography variant="body2">{props.date}</Typography>
				</Box>
				<Box style={{ marginBottom: '10px' }}>
					<Link
						to={`/news_detail/${toURL(props?.title)}-${props?.id}.html`}
						className={clsx(classes.nameProduct, { [classes.hoverProduct]: hoverProduct })}
					>
						<Typography
							style={{
								height: '66px',
								overflow: 'hidden',
								display: '-webkit-box',
								textOverflow: 'ellipsis',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',

								fontSize: '1.3rem',
							}}
							variant="h6"
						>
							{props.title}
						</Typography>
					</Link>
				</Box>

				<Box>
					<Typography
						variant="body1"
						style={{
							height: '70px',
							overflow: 'hidden',
							display: '-webkit-box',
							textOverflow: 'ellipsis',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
						}}
					>
						{/* {props.title} */}
					</Typography>
				</Box>
				<Box>
					<Button
						color="secondary"
						onClick={() => {
							history.push(`/news_detail/${toURL(props?.title)}-${props?.id}.html`);
						}}
					>
						Đọc tiếp
					</Button>
				</Box>
			</Box>
		</React.Fragment>
	);
};
export default News;
