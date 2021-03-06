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
import { useMediaQuery } from 'react-responsive';
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
	bgHeader3: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
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
	bgHeaderMobile: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
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
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	return (
		<React.Fragment>
			{isResponseiveMobile ? (
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
												<i
													className="fa fa-youtube"
													aria-hidden="true"
													style={{ color: '#fff' }}
												></i>
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
												<i
													className="fa fa-facebook"
													aria-hidden="true"
													style={{ color: '#fff' }}
												></i>
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
											B???n mu???n l?? ng?????i s???m nh???t nh???n khuy???n m??i ?????c bi???t?
										</Typography>
									</div>
									<div>
										<Typography variant="body1" style={{ color: '#fff' }}>
											????ng k?? ngay.
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
				</React.Fragment>
			) : isResponseivePhone ? (
				<React.Fragment>
					<Grid container className={classes.bgHeader3}>
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
											B???n mu???n l?? ng?????i s???m nh???t nh???n khuy???n m??i ?????c bi???t?
										</Typography>
									</div>
									<div>
										<Typography variant="body1" style={{ color: '#fff' }}>
											????ng k?? ngay.
										</Typography>
									</div>
								</div>
							</ListItem>
						</Grid>
						<Grid item xs={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
				</React.Fragment>
			) : (
				<React.Fragment>
					<Grid container className={classes.bgHeader3}>
						<Grid
							item
							xs={12}
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginBottom: '10px',
								marginTop: '10px',
							}}
						>
							<TextField
								size="small"
								variant="outlined"
								placeholder="Tha emai nhan uu dai"
								style={{ height: 'max-content', backgroundColor: '#fff' }}
							/>
							&nbsp;
							<Button size="small" variant="contained" color="primary">
								Dang ky
							</Button>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
			{isResponseiveMobile ? (
				<React.Fragment>
					<Grid container className={classes.bgHeader2}>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										Th??ng tin c??ng ty
									</Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Gi???i thi???u c??ng ty</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Quy ch??? ho???t ?????ng s??n TM??T</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">H??? th???ng c???a h??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Mua h??ng doanh nghi???p</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Tuy???n d???ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Li??n h???</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										Ch??nh s??ch
									</Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Tr??? g??p</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">??u ????i ?????i t??c</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">??i???u ki???n giao d???ch</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">B???o v??? th??ng tin ng?????i d??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">B???o m???t giao d???ch c???a kh??ch h??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ch??nh s??ch b???o h??nh</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ch??nh s??ch v?? quy ?????nh thanh to??n</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ch??nh s??ch 30 ng??y ?????i m???i</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										H??? tr??? kh??ch h??ng
									</Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">H?????ng d???n mua h??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">H??a ????n ??i???n t???</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">C??u h???i th?????ng g???p</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">V???n chuy???n v?? giao nh???n</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ph????ng th???c thanh to??n</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Tra c???u ????n h??ng</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										Th??ng tin kh??c
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
										<Typography variant="body1">Mua h??ng - G??p ?? - B???o h??nh</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">G???i:&nbsp;</Typography>
									</Link>
									<Typography variant="body1">
										<a
											style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold' }}
											href="tel:1800.6800"
										>
											1800.6800&nbsp;
										</a>
									</Typography>
									<Typography variant="body1"> Mi???n ph?? </Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">S?? ????? trang web</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>
											C???nh b??o gi??? m???o
										</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1" style={{ fontWeight: 'bold' }}>
											K??nh ti???p nh???n ph???n ??nh v??? h???i l???
										</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={12}>
							<List>
								<ListItem>
									<MuiLink href="http://online.gov.vn/Home/WebDetails/20090?AspxAutoDetectCookieSupport=1">
										<Typography className={classes.iconBocongthuong}></Typography>
									</MuiLink>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</React.Fragment>
			) : isResponseivePhone ? (
				<React.Fragment>
					<Grid container className={classes.bgHeaderMobile}>
						<Grid item xs={12}>
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
												<i
													className="fa fa-youtube"
													aria-hidden="true"
													style={{ color: '#fff' }}
												></i>
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
												<i
													className="fa fa-facebook"
													aria-hidden="true"
													style={{ color: '#fff' }}
												></i>
											</Avatar>
										</a>
									</ListItemAvatar>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										Th??ng tin c??ng ty
									</Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Gi???i thi???u c??ng ty</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Quy ch??? ho???t ?????ng s??n TM??T</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">H??? th???ng c???a h??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Mua h??ng doanh nghi???p</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Tuy???n d???ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Li??n h???</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										Ch??nh s??ch
									</Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Tr??? g??p</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">??u ????i ?????i t??c</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">??i???u ki???n giao d???ch</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">B???o v??? th??ng tin ng?????i d??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">B???o m???t giao d???ch c???a kh??ch h??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ch??nh s??ch b???o h??nh</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ch??nh s??ch v?? quy ?????nh thanh to??n</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ch??nh s??ch 30 ng??y ?????i m???i</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										H??? tr??? kh??ch h??ng
									</Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">H?????ng d???n mua h??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">H??a ????n ??i???n t???</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">C??u h???i th?????ng g???p</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">V???n chuy???n v?? giao nh???n</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Ph????ng th???c thanh to??n</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Tra c???u ????n h??ng</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6} lg={3} sm={6} md={3}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										Th??ng tin kh??c
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
										<Typography variant="body1">Mua h??ng - G??p ?? - B???o h??nh</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">G???i:&nbsp;</Typography>
									</Link>
									<Typography variant="body1">
										<a
											style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold' }}
											href="tel:1800.6800"
										>
											1800.6800&nbsp;
										</a>
									</Typography>
									<Typography variant="body1"> Mi???n ph?? </Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">S?? ????? trang web</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1" style={{ color: 'red', fontWeight: 'bold' }}>
											C???nh b??o gi??? m???o
										</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1" style={{ fontWeight: 'bold' }}>
											K??nh ti???p nh???n ph???n ??nh v??? h???i l???
										</Typography>
									</Link>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={12}>
							<List>
								<ListItem>
									<MuiLink href="http://online.gov.vn/Home/WebDetails/20090?AspxAutoDetectCookieSupport=1">
										<Typography className={classes.iconBocongthuong}></Typography>
									</MuiLink>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Grid container className={classes.bgHeaderMobile}>
						<Grid item xs={12}>
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
												<i
													className="fa fa-youtube"
													aria-hidden="true"
													style={{ color: '#fff' }}
												></i>
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
												<i
													className="fa fa-facebook"
													aria-hidden="true"
													style={{ color: '#fff' }}
												></i>
											</Avatar>
										</a>
									</ListItemAvatar>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={12}>
							<List>
								<ListItem>
									<Typography style={{ fontWeight: 'bold' }} variant="body1">
										Th??ng tin c??ng ty
									</Typography>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Gi???i thi???u c??ng ty</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Quy ch??? ho???t ?????ng s??n TM??T</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">H??? th???ng c???a h??ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Mua h??ng doanh nghi???p</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Tuy???n d???ng</Typography>
									</Link>
								</ListItem>
								<ListItem>
									<Link to="/" className={classes.tagLi}>
										<Typography variant="body1">Li??n h???</Typography>
									</Link>
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
							</List>
						</Grid>

						<Grid item xs={12}>
							<List>
								<ListItem>
									<MuiLink href="http://online.gov.vn/Home/WebDetails/20090?AspxAutoDetectCookieSupport=1">
										<Typography className={classes.iconBocongthuong}></Typography>
									</MuiLink>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
			<Divider />
			{isResponseivePhone ? (
				<Grid container className={classes.bgHeader2}>
					<Grid item xs={12} style={{ textAlign: 'center' }}>
						<Typography variant="caption" display="block">
							Copyright ?? 1999 - 2021 C??ng ty C??? ph???n Th????ng m???i SangTV
						</Typography>
						<Typography variant="caption" display="block">
							Gi???y ch???ng nh???n ????ng k?? kinh doanh s??? 0302286281, c???p ng??y 22/06/2006 b???i S??? K??? ho???ch
							v?? ?????u t?? TP. H??? Ch?? Minh.
						</Typography>
						<Typography variant="caption" display="block">
							?????a ch??? ????ng k?? tr??? s??? ch??nh: 63-65-67 Tr???n H??ng ?????o, P. C???u ??ng L??nh, TP. H??? Ch?? Minh
						</Typography>
					</Grid>
				</Grid>
			) : (
				<Grid
					container
					className={classes.bgHeader2}
					style={{ paddingLeft: '10px', paddingRight: '10px' }}
				>
					<Grid item xs={12} style={{ textAlign: 'center' }}>
						<Typography variant="caption" display="block">
							Copyright ?? 1999 - 2021 C??ng ty C??? ph???n Th????ng m???i SangTV
						</Typography>
						<Typography variant="caption" display="block">
							Gi???y ch???ng nh???n ????ng k?? kinh doanh s??? 0302286281, c???p ng??y 22/06/2006 b???i S??? K??? ho???ch
							v?? ?????u t?? TP. H??? Ch?? Minh.
						</Typography>
						<Typography variant="caption" display="block">
							?????a ch??? ????ng k?? tr??? s??? ch??nh: 63-65-67 Tr???n H??ng ?????o, P. C???u ??ng L??nh, TP. H??? Ch?? Minh
						</Typography>
					</Grid>
				</Grid>
			)}
		</React.Fragment>
	);
};
export default Footer;
