import {
	Avatar,
	Button,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	makeStyles,
	TextField,
	Typography,
	Link as MuiLink,
	Divider,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import bocongthuong from './../../public/images/bocongthuong.png';
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#333333',
		marginTop: '20px',
		// marginBottom: '10px',
		display: 'flex',
		alignItems: 'center',
	},
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	iconBocongthuong: {
		background: `url(${bocongthuong})`,
		width: '204px',
		height: '63px',
		display: 'inline-block',
		backgroundPosition: '-51px -9px',
	},
	showBox: {
		display: 'block !important',
	},
	showBorder: {
		borderLeft: '0.5px solid #8c8c8c4f',
		borderRight: '0.5px solid #8c8c8c4f',
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
const Footer: React.FC = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Grid container className={classes.bgHeader}>
				<Grid item xs={3}>
					<List>
						<ListItem>
							<ListItemAvatar>
								<a title="Link youtube">
									<Avatar
										style={{
											backgroundColor: '#333333',
											border: '2px solid #fff',
											cursor: 'pointer',
										}}
									>
										<i className="fa fa-youtube" aria-hidden="true" style={{ color: '#fff' }}></i>
									</Avatar>
								</a>
							</ListItemAvatar>
							<ListItemAvatar>
								<a title="Lick facebook">
									<Avatar
										style={{
											backgroundColor: '#333333',
											border: '2px solid #fff',
											cursor: 'pointer',
										}}
									>
										<i className="fa fa-facebook" aria-hidden="true" style={{ color: '#fff' }}></i>
									</Avatar>
								</a>
							</ListItemAvatar>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={5} style={{ display: 'grid' }}>
					<ListItem>
						<ListItemAvatar>
							<Avatar
								style={{
									backgroundColor: '#333333',
									border: '2px solid #fff',
									cursor: 'pointer',
								}}
							>
								<i className="fa fa-envelope" style={{ color: '#fff' }} aria-hidden="true"></i>
							</Avatar>
						</ListItemAvatar>
						<div>
							<div>
								<Typography variant="body1" style={{ color: '#fff' }}>
									Bạn muốn là người sớm nhất nhận khuyến mãi đặc biệt?
								</Typography>
							</div>
							<div>
								<Typography variant="body1" style={{ color: '#fff' }}>
									Đăng ký ngay.
								</Typography>
							</div>
						</div>
					</ListItem>
				</Grid>
				<Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<TextField
						size="small"
						variant="outlined"
						style={{ height: 'max-content', backgroundColor: '#fff' }}
					/>
					&nbsp;
					<Button size="small" variant="contained" color="primary">
						Dang ky
					</Button>
				</Grid>
			</Grid>
			<Grid container className={classes.bgHeader2}>
				<Grid item xs={3}>
					<List>
						<ListItem>
							<Typography style={{ fontWeight: 'bold' }} variant="body1">
								Thông tin công ty
							</Typography>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Giới thiệu công ty</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Quy chế hoạt động sàn TMĐT</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Hệ thống cửa hàng</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Mua hàng doanh nghiệp</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Tuyển dụng</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Liên hệ</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<MuiLink href="http://online.gov.vn/Home/WebDetails/20090?AspxAutoDetectCookieSupport=1">
								<Typography className={classes.iconBocongthuong}></Typography>
							</MuiLink>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={3}>
					<List>
						<ListItem>
							<Typography style={{ fontWeight: 'bold' }} variant="body1">
								Chính sách
							</Typography>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Trả góp</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Ưu đãi đối tác</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Điều kiện giao dịch</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Bảo vệ thông tin người dùng</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Bảo mật giao dịch của khách hàng</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Chính sách bảo hành</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Chính sách và quy định thanh toán</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Chính sách 30 ngày đổi mới</Typography>
							</Link>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={3}>
					<List>
						<ListItem>
							<Typography style={{ fontWeight: 'bold' }} variant="body1">
								Hỗ trợ khách hàng
							</Typography>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Hướng dẫn mua hàng</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Hóa đơn điện tử</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Câu hỏi thường gặp</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Vận chuyển và giao nhận</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Phương thức thanh toán</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Tra cứu đơn hàng</Typography>
							</Link>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={3}>
					<List>
						<ListItem>
							<Typography style={{ fontWeight: 'bold' }} variant="body1">
								Thông tin khác
							</Typography>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Email:&nbsp;</Typography>
							</Link>
							<Typography variant="body1">
								<a style={{ color: 'red' }} href="mailto:tranvansangg@gmail.com">
									tranvansangg@gmail.com
								</a>
							</Typography>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Mua hàng - Góp ý - Bảo hành</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Gọi:&nbsp;</Typography>
							</Link>
							<Typography variant="body1">
								<a
									style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold' }}
									href="tel:1800.6800"
								>
									1800.6800&nbsp;
								</a>
							</Typography>
							<Typography variant="body1"> Miễn phí </Typography>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1">Sơ đồ trang web</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>
									Cảnh báo giả mạo
								</Typography>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/" className={classes.tagLi}>
								<Typography variant="body1" style={{ fontWeight: 'bold' }}>
									Kênh tiếp nhận phản ánh về hối lộ
								</Typography>
							</Link>
						</ListItem>
					</List>
				</Grid>
			</Grid>
			<Divider />
			<Grid container className={classes.bgHeader2}>
				<Grid item xs={12} style={{ textAlign: 'center' }}>
					<Typography variant="caption" display="block">
						Copyright © 1999 - 2021 Công ty Cổ phần Thương mại SangTV
					</Typography>
					<Typography variant="caption" display="block">
						Giấy chứng nhận đăng ký kinh doanh số 0302286281, cấp ngày 22/06/2006 bởi Sở Kế hoạch và
						Đầu tư TP. Hồ Chí Minh.
					</Typography>
					<Typography variant="caption" display="block">
						Địa chỉ đăng ký trụ sở chính: 63-65-67 Trần Hưng Đạo, P. Cầu Ông Lãnh, TP. Hồ Chí Minh
					</Typography>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};
export default Footer;
