import {
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	Card,
	Collapse,
	Divider,
	Grid,
	LinearProgress,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LaptopIcon from '@material-ui/icons/Laptop';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import HeadsetIcon from '@material-ui/icons/Headset';
import sp1 from './../../public/images/10048267-dien-thoai-samsung-galaxy-a12-128gb-den-1.jpg';
import sp2 from './../../public/images/iphone-6s-vang-hong_1592643194.jpg';
import sp3 from './../../public/images/xiaomi-redmi-note-9-xam_1593057875-copy.jpg';
import watchImg1200 from './../../public/images/10048267-dien-thoai-samsung-galaxy-a12-128gb-den-1.jpg';
import watchImg300 from './../../public/images/10048267-dien-thoai-samsung-galaxy-a12-128gb-den-1.jpg';
//import SliderImage from 'react-zoom-slider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Pagination, Rating } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import ReactImageMagnify from 'react-image-magnify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ProductCarousel from '../../Components/Product/ProductCarousel';
function SampleNextArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: 'grey' }}
			onClick={onClick}
		/>
	);
}
function SamplePrevArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: 'block', background: 'grey' }}
			onClick={onClick}
		/>
	);
}
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',

		// marginBottom: '10px',
	},
	reply: { color: 'blue', cursor: 'pointer', display: 'contents', '&:hover': { color: 'grey' } },
	titleText: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		paddingLeft: '10px',
		marginBottom: '33px',
	},
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	discount_percent: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
	},
	discount_percent1: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
		marginLeft: '10px',
		position: 'relative',
		'&:after': {
			right: '100%',
			top: '50%',
			border: 'solid transparent',
			content: '""',
			height: 0,
			width: 0,
			position: 'absolute',
			pointerEvents: 'none',
			borderColor: `rgba(${82},${184},${88},${0})`,
			borderRightColor: theme.palette.primary.main,
			borderWidth: '6px',
			marginTop: '-6px',
		},
	},
	showBox: {
		display: 'block !important',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	link: {
		display: 'flex',
		textDecoration: 'none',
		color: 'black',
	},
	button: {},
	tagLi: {
		textDecoration: 'none',
		cursor: 'pointer',
		color: 'black',
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
}));
const ProductDetail: React.FC = () => {
	const labels: { [index: string]: string } = {
		1: 'Không thích',
		2: 'Tạm được',
		3: 'Bình thường',
		4: 'Rất tốt',
		5: 'Tuyệt vời quá',
	};
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		//slidesToScroll: 3,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	const [value, setValue] = React.useState<number | null>(3);
	const [hover, setHover] = React.useState(-1);
	const classes = useStyles();
	const [configuration, setConfiguration] = React.useState<any>([
		{ name: 'Màn hình:', value: '6.67 inches IPS LCD, 1080 x 2400 pixels' },
		{ name: 'CPU:', value: 'Snapdragon 732G (8 nm)' },
		{ name: 'GPU:', value: 'Adreno 618' },
		{ name: 'RAM:', value: '6GB' },
		{ name: 'Bộ nhớ:', value: '64/128GB' },
		{ name: 'Pin:', value: '5160mAh, sạc nhanh 33W' },
	]);
	const schema = yup.object().shape({
		email: yup.string().email('Email không hợp lệ').required('Email không để trống'),
		name: yup.string().required('Mật khẩu không để trống'),
	});
	const [collapse, setCollapse] = React.useState(false);
	const [collapseReply, setCollapseReply] = React.useState(false);
	const [collapseForm, setCollapseForm] = React.useState(false);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: any) => {
		console.log(data);
	};
	const data = [
		{
			image: sp1,
		},
		{
			image: sp2,
		},
		{
			image: sp3,
		},
	];
	return (
		<Grid container className={classes.bgHeader}>
			<Grid item xs={9} style={{ position: 'absolute', top: '93px', left: '362px' }}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link to="/" className={classes.link}>
						<HomeIcon className={classes.icon} />
						Trang chu
					</Link>
					<Link to="/" className={classes.link}>
						Dien thoai
					</Link>
					{/* <Link to="/" className={classes.link}>
						Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
					</Link> */}
				</Breadcrumbs>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Box style={{ paddingTop: '10px' }}>
						<Carousel
							infiniteLoop
							stopOnHover
							showThumbs={true}
							showStatus={false}
							showArrows={false}
							showIndicators={false}
						>
							<div>
								<img width="55%" src={sp1} />
							</div>
							<div>
								<img width="55%" src={sp1} />
							</div>
						</Carousel>

						{/* <div style={{ position: 'absolute' }}>
							<SliderImage data={data} showDescription={true} direction="right" />
						</div> */}
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Typography variant="h6" gutterBottom>
						Apple Watch SE GPS 40mm Vàng Chính Hãng Chưa Kích Trôi BH Apple Watch SE GPS 40mm
					</Typography>
					<Typography gutterBottom style={{ display: 'flex', paddingBottom: '5px' }}>
						<Typography component="span">3.0 </Typography>
						<Rating style={{ fontSize: '20px' }} name="read-only" value={3.2} readOnly />
						<Typography component="span">Co 1 danh gia</Typography>
					</Typography>
					<Divider />
					<Typography variant="h4" style={{ fontWeight: 'bold', paddingTop: '20px' }}>
						19.000.000đ
					</Typography>
					<Typography component="span" className={classes.discount_percent}>
						-6%
					</Typography>
					&nbsp;&nbsp;
					<Typography component="span" style={{ color: 'grey', textDecoration: 'line-through' }}>
						19.000.000đ
					</Typography>
					<Box style={{ position: 'relative', paddingTop: '10px', marginTop: '20px' }}>
						<Card variant="outlined" style={{ padding: '20px', paddingTop: '30px' }}>
							<Typography
								component="span"
								className={classes.discount_percent}
								style={{
									position: 'absolute',
									top: '-4px',
									left: '10px',
								}}
							>
								Khuyen mai
							</Typography>
							<Typography>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae fuga dolorum,
								rerum soluta porro quisquam? Odio magni doloremque explicabo. Doloribus sint
								asperiores a officia aperiam neque unde, libero excepturi magni.
							</Typography>
						</Card>
					</Box>
					<Button
						variant="contained"
						color="primary"
						style={{ display: 'block', marginTop: '10px' }}
						fullWidth
						size="large"
					>
						<Typography component="h6" style={{ fontSize: '1.5rem' }}>
							Mua ngay
						</Typography>
						<Typography variant="body1" style={{ textTransform: 'initial' }}>
							Giao hang tan noi
						</Typography>
					</Button>
					<Button
						variant="outlined"
						color="primary"
						style={{ display: 'block', marginTop: '10px' }}
						fullWidth
						size="large"
					>
						<Typography component="h6" style={{ fontSize: '1.2rem' }}>
							Them vao gio hang
						</Typography>
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={3}>
					<Grid item xs={9}>
						<Typography variant="h5" className={classes.titleText} gutterBottom>
							Thong so ly thuuat
						</Typography>
						{configuration.map((item: any, index: number) => {
							return (
								<Box style={{ backgroundColor: index % 2 === 0 ? '#ededed' : 'inherit' }}>
									<Typography
										variant="body1"
										style={{
											fontWeight: 'bold',

											display: 'inline-block',
											padding: '10px',
											paddingRight: '162px',
										}}
									>
										{item.name}
									</Typography>
									<Typography variant="body1" style={{ display: 'inline-block', padding: '10px' }}>
										{item.value}
									</Typography>
								</Box>
							);
						})}
						<Typography
							variant="h5"
							className={classes.titleText}
							gutterBottom
							style={{ marginTop: '10px' }}
						>
							Bai viet danh gia
						</Typography>
						<Typography
							variant="h5"
							className={classes.titleText}
							gutterBottom
							style={{ marginTop: '10px' }}
						>
							Nhan xet va danh gia
						</Typography>
						<Card variant="outlined" style={{ padding: '10px' }}>
							<Box style={{ display: 'flex' }}>
								<Box style={{ width: '50%' }}>
									<Typography gutterBottom style={{ display: 'flex', paddingBottom: '5px' }}>
										<Typography variant="h5" style={{ color: '#ffb400', fontWeight: 'bold' }}>
											3.0
										</Typography>
										&nbsp;&nbsp;
										<Rating
											style={{ fontSize: '27px' }}
											name="read-only"
											value={4.6}
											precision={0.04}
											readOnly
										/>
										&nbsp;&nbsp;
										<Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
											Co 1 danh gia
										</Typography>
									</Typography>
									<Typography
										gutterBottom
										style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
									>
										<Typography component="span">5.0 </Typography>&nbsp;&nbsp;
										<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
										<Box width="100%">
											<LinearProgress variant="determinate" value={3} />
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1">22%</Typography>
										</Box>
									</Typography>
									<Typography
										gutterBottom
										style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
									>
										<Typography component="span">4.0 </Typography>&nbsp;&nbsp;
										<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
										<Box width="100%">
											<LinearProgress variant="determinate" value={3} />
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1">22%</Typography>
										</Box>
									</Typography>
									<Typography
										gutterBottom
										style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
									>
										<Typography component="span">3.0 </Typography>&nbsp;&nbsp;
										<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
										<Box width="100%">
											<LinearProgress variant="determinate" value={3} />
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1">22%</Typography>
										</Box>
									</Typography>
									<Typography
										gutterBottom
										style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
									>
										<Typography component="span">2.0 </Typography>&nbsp;&nbsp;
										<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
										<Box width="100%">
											<LinearProgress variant="determinate" value={3} />
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1">22%</Typography>
										</Box>
									</Typography>
									<Typography
										gutterBottom
										style={{ display: 'flex', paddingBottom: '5px', alignItems: 'center' }}
									>
										<Typography component="span">1.0 </Typography>&nbsp;&nbsp;
										<i className="fa fa-star" style={{ paddingBottom: '5px' }}></i>&nbsp;&nbsp;
										<Box width="100%">
											<LinearProgress variant="determinate" value={3} />
										</Box>
										&nbsp;&nbsp;
										<Box minWidth={35}>
											<Typography variant="body1">22%</Typography>
										</Box>
									</Typography>
								</Box>
								<Box
									style={{
										width: '50%',
										justifyContent: 'center',
										alignItems: 'center',
										display: 'flex',
									}}
								>
									<Button
										variant="contained"
										color="primary"
										style={{ textTransform: 'initial', padding: '8px 25px' }}
										onClick={() => {
											setCollapse(!collapse);
											collapse && setCollapseForm(false);
											setValue(3);
										}}
									>
										{collapse ? 'Dong lai' : 'Gui danh gia cua ban'}
									</Button>
								</Box>
							</Box>
							<Collapse in={collapse} timeout="auto" unmountOnExit>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
										marginTop: '25px',
										marginBottom: '25px',
									}}
								>
									<Typography variant="body1" style={{ paddingRight: '20px' }}>
										Chon danh gia cua ban
									</Typography>

									<Rating
										name="size-large"
										defaultValue={3}
										size="large"
										onChange={(event, newValue) => {
											setValue(newValue);
											if (newValue === null) {
												setCollapseForm(false);
											} else {
												setCollapseForm(true);
											}
										}}
										onChangeActive={(event, newHover) => {
											setHover(newHover);
										}}
									/>
									{value !== null && (
										<Box className={classes.discount_percent1}>
											{labels[hover !== -1 ? hover : value]}
										</Box>
									)}
								</Box>
							</Collapse>
							<Collapse in={collapseForm} timeout="auto" unmountOnExit>
								<Box style={{ display: 'flex' }}>
									<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
										<Box style={{ display: 'inline-block', width: '60%' }}>
											<TextField
												id="rate_content"
												{...register('rate_content')}
												multiline
												name="rate_content"
												rows={4}
												placeholder="Nhập đánh giá về sản phẩm"
												variant="outlined"
												fullWidth
											/>
										</Box>
										<Box style={{ display: 'inline-block', width: '40%', marginLeft: '10px' }}>
											<TextField
												{...register('name')}
												id="name"
												label="Ho ten *"
												name="name"
												variant="outlined"
												fullWidth
												error={errors.name ? true : false}
												helperText={errors.name?.message}
												style={{ marginBottom: '10px' }}
											/>
											<TextField
												{...register('email')}
												id="email"
												name="email"
												label="Email *"
												variant="outlined"
												fullWidth
												error={errors.email ? true : false}
												helperText={errors.email?.message}
												style={{ marginBottom: '10px' }}
											/>
											<Button variant="contained" color="primary" type="submit">
												gui danh gia
											</Button>
										</Box>
									</form>
								</Box>
							</Collapse>
						</Card>
						<Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
						<Box style={{ marginBottom: '10px' }}>
							<Box style={{ display: 'flex', alignItems: 'center' }}>
								<Avatar>S</Avatar> &nbsp;&nbsp;
								<Typography variant="h6" style={{ fontWeight: 'bold' }}>
									Sang tran
								</Typography>
							</Box>
							<Box style={{ marginLeft: '39px' }}>
								<Typography variant="h6">
									<Rating
										style={{ fontSize: '20px', display: 'flex' }}
										name="read-only"
										value={3.2}
										readOnly
									/>
									<Typography color="textSecondary">Vao ngay 29/09/2021</Typography>
								</Typography>
								<Typography>Cho mình hỏi. Sao dùng camera máy lại nóng ghê vậy?</Typography>
							</Box>
						</Box>
						<Box style={{ marginBottom: '10px' }}>
							<Box style={{ display: 'flex', alignItems: 'center' }}>
								<Avatar>T</Avatar> &nbsp;&nbsp;
								<Typography variant="h6" style={{ fontWeight: 'bold' }}>
									Thang nguyen
								</Typography>
							</Box>
							<Box style={{ marginLeft: '39px' }}>
								<Typography variant="h6">
									<Rating
										style={{ fontSize: '20px', display: 'flex' }}
										name="read-only"
										value={3.2}
										readOnly
									/>
									<Typography color="textSecondary">Vao ngay 29/09/2021</Typography>
								</Typography>
								<Typography>Cho mình hỏi. Sao dùng camera máy lại nóng ghê vậy?</Typography>
							</Box>
						</Box>
						{/* <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
							<Pagination count={10} color="primary" />
						</Box> */}
						<Box>
							<Typography
								variant="h5"
								className={classes.titleText}
								gutterBottom
								style={{ marginTop: '10px' }}
							>
								Hoi & Dap{' '}
								<Typography component="span" className={classes.discount_percent}>
									co 123 binh luan
								</Typography>
							</Typography>

							<Box>
								<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
									<Box style={{ display: 'inline-block', width: '100%' }}>
										<TextField
											id="rate_content"
											{...register('rate_content')}
											multiline
											name="rate_content"
											rows={3}
											placeholder="Nhập đánh giá về sản phẩm"
											variant="outlined"
											fullWidth
											style={{ marginBottom: '10px' }}
										/>
										<Button variant="contained" color="primary" type="submit">
											gui cau hoi
										</Button>
									</Box>
								</form>
							</Box>

							<Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
							<Box>
								<Box style={{ marginBottom: '10px' }}>
									<Box style={{ display: 'flex', alignItems: 'center' }}>
										<Avatar>T</Avatar> &nbsp;&nbsp;
										<Typography variant="h6" style={{ fontWeight: 'bold' }}>
											Thang nguyen
										</Typography>{' '}
										&nbsp;&nbsp;
										<Typography color="textSecondary">vao ngay 29/09/2021</Typography>
									</Box>
									<Box style={{ marginLeft: '39px', marginBottom: '10px' }}>
										<Typography>Cho mình hỏi. Sao dùng camera máy lại nóng ghê vậy?</Typography>
										<Typography
											className={classes.reply}
											onClick={() => setCollapseReply(!collapseReply)}
										>
											Tra loi
										</Typography>
									</Box>
									<Box
										style={{
											marginLeft: '60px',
											borderLeft: '5px solid #dee2e6',
											paddingLeft: '10px',
											marginBottom: '10px',
										}}
									>
										<Typography style={{ display: 'flex', alignItems: 'center' }}>
											<Typography variant="h6">Hoan Dung</Typography>&nbsp;&nbsp;
											<Typography
												component="span"
												className={classes.discount_percent}
												style={{ fontSize: '11px' }}
											>
												Quan tri vien
											</Typography>
											&nbsp;&nbsp;
											<Typography color="textSecondary">vao ngay 29/09/2021</Typography>
										</Typography>
										<Typography>
											Chao ban,Cho mình hỏi. Sao dùng camera máy lại nóng ghê vậy?
										</Typography>
									</Box>
									<Box
										style={{
											marginLeft: '60px',
											borderLeft: '5px solid #dee2e6',
											paddingLeft: '10px',
											marginBottom: '10px',
										}}
									>
										<Typography style={{ display: 'flex', alignItems: 'center' }}>
											<Typography variant="h6">Hoan Dung</Typography>&nbsp;&nbsp;
											<Typography
												component="span"
												className={classes.discount_percent}
												style={{ fontSize: '11px' }}
											>
												Quan tri vien
											</Typography>
											&nbsp;&nbsp;
											<Typography color="textSecondary">vao ngay 29/09/2021</Typography>
										</Typography>
										<Typography>
											Chao ban,Cho mình hỏi. Sao dùng camera máy lại nóng ghê vậy?
										</Typography>
									</Box>
									<Box
										style={{
											marginLeft: '60px',

											paddingLeft: '10px',
											marginBottom: '10px',
										}}
									>
										<Collapse in={collapseReply} timeout="auto" unmountOnExit>
											<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
												<Box style={{ display: 'inline-block', width: '100%' }}>
													<TextField
														id="rate_content"
														{...register('rate_content')}
														multiline
														name="rate_content"
														rows={3}
														placeholder="Nhập đánh giá về sản phẩm"
														variant="outlined"
														fullWidth
														style={{ marginBottom: '10px' }}
													/>
													<Button variant="contained" color="primary" type="submit">
														gui cau hoi
													</Button>
												</Box>
											</form>
										</Collapse>
									</Box>
								</Box>
							</Box>
							<Box style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
								<Pagination count={10} color="primary" />
							</Box>
						</Box>
					</Grid>
					<Grid item xs={3} style={{ paddingRight: '10px' }}>
						<Card variant="outlined" style={{ padding: '10px', position: 'sticky', top: '86px' }}>
							<Box style={{ textAlign: 'center' }}>
								<Typography variant="h6" style={{ lineHeight: 1 }}>
									Apple Watch SE GPS 40mm Vàng Chính Hãng
								</Typography>
								<Typography
									variant="h5"
									style={{
										fontWeight: 'bold',
										paddingTop: '10px',
										color: 'red',
									}}
								>
									19.000.000đ
								</Typography>
							</Box>
							<Box style={{ position: 'relative', paddingTop: '10px', marginTop: '20px' }}>
								<Card variant="outlined" style={{ padding: '20px', paddingTop: '30px' }}>
									<Typography
										component="span"
										className={classes.discount_percent}
										style={{
											position: 'absolute',
											top: '-4px',
											left: '10px',
										}}
									>
										Khuyen mai
									</Typography>
									<Typography>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae fuga
										dolorum, rerum soluta porro quisquam? Odio magni doloremque explicabo. Doloribus
										sint asperiores a officia aperiam neque unde, libero excepturi magni.
									</Typography>
								</Card>
							</Box>
							<Button
								variant="contained"
								color="primary"
								style={{ display: 'block', marginTop: '10px' }}
								fullWidth
								size="large"
							>
								<Typography component="h6" style={{ fontSize: '1.1rem' }}>
									Mua ngay
								</Typography>
							</Button>
							<Button
								variant="outlined"
								color="primary"
								style={{ display: 'block', marginTop: '10px' }}
								fullWidth
								size="large"
							>
								<Typography component="h6" style={{ fontSize: '1rem' }}>
									Them vao gio hang
								</Typography>
							</Button>
						</Card>
					</Grid>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Typography
					variant="h5"
					className={classes.titleText}
					gutterBottom
					style={{ marginTop: '10px' }}
				>
					San pham cung loai
				</Typography>
				<Slider {...settings}>
					<ProductCarousel />
					<ProductCarousel />
					<ProductCarousel />
					<ProductCarousel />
					<ProductCarousel />
					<ProductCarousel />
					<ProductCarousel />
				</Slider>
			</Grid>
		</Grid>
	);
};
export default ProductDetail;
