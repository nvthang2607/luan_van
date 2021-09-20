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
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { relative } from 'path';
import { Rating } from '@material-ui/lab';
import { PhoneBranch, SearchPhoneGet } from '../../api/Product';
import { AppURL } from '../../utils/const';
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

const Content: React.FC = () => {
	const classes = useStyles();
	const [hoverProduct, setHoverProduct] = React.useState(false);
	const onMouseOverProduct = () => {
		setHoverProduct(true);
	};
	const onMouseOutProduct = () => {
		setHoverProduct(false);
	};
	const [dataPhoneBranch, setDataPhoneBranch] = React.useState<any>([]);
	React.useEffect(() => {
		const fetchPhoneBranch = async () => {
			const getPhoneBranch = await PhoneBranch();
			if (getPhoneBranch) {
				if (getPhoneBranch.errorCode === null) {
					//console.log(getPhoneBranch);
					setDataPhoneBranch(getPhoneBranch.data);
				}
			}
		};
		fetchPhoneBranch();
	}, []);
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
	return (
		<Grid container className={classes.bgHeader}>
			<Grid item xs={9} style={{ zIndex: 0 }}>
				<Carousel autoPlay infiniteLoop stopOnHover showThumbs={false}>
					<div>
						<img src={img1} />
					</div>
					<div>
						<img src={img2} />
					</div>
					<div>
						<img src={img3} />
					</div>
				</Carousel>
			</Grid>
			<Grid item xs={3} style={{ paddingLeft: '8px' }}>
				<div>
					<img width="100%" src={img4} />
				</div>
				<div>
					<img width="100%" src={img5} />
				</div>
			</Grid>
			<Grid item xs={12} className={classes.borderTitle}>
				<Grid container style={{ alignItems: 'baseline' }}>
					<Grid item xs={3} style={{ display: 'flex' }}>
						<Link to="/" className={classes.titles}>
							ĐIỆN THOẠI BÁN CHẠY
							<div className={classes.title}></div>
						</Link>
					</Grid>
					<Grid item xs={9} style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<List style={{ display: 'flex' }}>
							{dataPhoneBranch?.listData?.map((item: any, index: number) => {
								return (
									<Link
										to={`/views/${toURL(item.name)}-${item.id}`}
										className={classes.stylePhoneBranch}
									>
										<ListItem
											style={{
												padding: 0,
												fontWeight: 'bold',
												paddingRight: '10px',
												paddingLeft: '10px',
											}}
										>
											<Typography variant="body1" style={{ fontWeight: 500 }}>
												{item.name}
											</Typography>
										</ListItem>
									</Link>
								);
							})}
							<Link to={`/views/-${5}.html`} className={classes.styleViewAll}>
								<ListItem
									style={{
										padding: 0,
										fontWeight: 'bold',
										paddingRight: '10px',
										paddingLeft: '10px',
									}}
								>
									<Typography variant="body1" style={{ fontWeight: 500 }}>
										Xem tat ca
									</Typography>
								</ListItem>
							</Link>
						</List>
					</Grid>
				</Grid>
			</Grid>
			<Grid container spacing={3} style={{ marginTop: '10px' }}>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Grid item xs={12} className={classes.borderTitle}>
				<Grid container style={{ alignItems: 'baseline' }}>
					<Grid item xs={3} style={{ display: 'flex' }}>
						<Link to="/" className={classes.titles}>
							ĐIỆN THOẠI BÁN CHẠY
							<div className={classes.title}></div>
						</Link>
					</Grid>
					<Grid item xs={9} style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<List style={{ display: 'flex' }}>
							<ListItem
								style={{
									padding: 0,

									paddingRight: '10px',
									paddingLeft: '10px',
								}}
							>
								<Typography variant="body1">Xiaomi</Typography>
							</ListItem>
							<ListItem
								style={{
									padding: 0,

									paddingRight: '10px',
									paddingLeft: '10px',
								}}
							>
								<Typography variant="body1">Xiaomi</Typography>
							</ListItem>
							<ListItem
								style={{
									padding: 0,

									paddingRight: '10px',
									paddingLeft: '10px',
								}}
							>
								<Typography variant="body1">Xiaomi</Typography>
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</Grid>
			<Grid container spacing={3} style={{ marginTop: '10px' }}>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
				<Grid item xs={3}>
					<Box
						boxShadow={hoverProduct && 5}
						style={{ padding: '20px', position: 'relative' }}
						//onMouseOver={onMouseOverProduct}
						//onMouseOut={onMouseOutProduct}
						className={classes.hoverProduct}
					>
						<Chip
							label="-6%"
							color="primary"
							style={{ position: 'absolute', right: '9px', top: '8px', fontSize: '19px' }}
						/>
						<Box style={{ textAlign: 'center', marginBottom: '35px' }}>
							<img width="90%" src={sp1} />
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Link to="/" className={classes.nameProduct}>
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
									Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
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
								19.000.000đ
							</Typography>
							<Typography
								style={{
									textDecoration: 'line-through',
									color: 'grey',
									display: 'inline-block',
								}}
							>
								19.000.000đ
							</Typography>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center' }}>
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
						</Box>
					</Box>
				</Grid>
			</Grid>
			<Box style={{ position: 'fixed', left: 0, top: '40%' }}>
				<List>
					<ListItem>
						<ListItemAvatar>
							<a title="Link youtube">
								<Avatar
									style={{ backgroundColor: '#fff', border: '1px solid red', cursor: 'pointer' }}
								>
									<i className="fa fa-youtube" aria-hidden="true" style={{ color: 'red' }}></i>
								</Avatar>
							</a>
						</ListItemAvatar>
					</ListItem>
					<ListItem>
						<ListItemAvatar>
							<a title="Lick facebook">
								<Avatar
									style={{
										backgroundColor: '#fff',
										border: '1px solid #0278ad',
										cursor: 'pointer',
									}}
								>
									<i className="fa fa-facebook" aria-hidden="true" style={{ color: '#0278ad' }}></i>
								</Avatar>
							</a>
						</ListItemAvatar>
					</ListItem>
				</List>
			</Box>
		</Grid>
	);
};
export default Content;
