import {
	Avatar,
	Box,
	Card,
	CircularProgress,
	Grid,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import { UserGet } from '../../api/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserProfile, userProfileAPI } from './UserSlice';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ProfileInfo from './ProfileInfo';
import ChangePwd from './ChangePwd';
import jwtDecode from 'jwt-decode';
import { getValueRefreshPage } from '../../features/refresh/RefreshPageSlice';
import OrderStatus from '../Order/OrderStatus';
import OrderDetail from '../Order/OrderDetail';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#f4f4f4',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	bgHeaderResponse: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		backgroundColor: '#f4f4f4',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	button: {},
	activeTagLi: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		color: `${theme.palette.primary.main} !important`,
	},
	tagLi: {
		textDecoration: 'none',
		cursor: 'pointer',
		color: 'black',
		padding: '8px',
		display: 'block',
	},
}));
const Profile: React.FC = (props) => {
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseiveProductMobile = useMediaQuery({ query: '(min-width: 1098px)' });
	const isResponseiveProduct1Mobile = useMediaQuery({ query: '(min-width: 780px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	const classes = useStyles();
	const valueRefreshPage = useAppSelector(getValueRefreshPage);
	const [profileInfo, setProfileInfo] = React.useState<any>({});
	const [flag, setFlag] = React.useState(false);
	React.useEffect(() => {
		const token: any = window.localStorage.getItem('token');
		const date = Date.now();
		if (window.localStorage.getItem('token')) {
			const checkToken: any = jwtDecode(token);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('token');
			} else {
				const getData = async () => {
					const profile = await UserGet();
					if (profile.errorCode === null) {
						setProfileInfo(profile.data);
						setFlag(true);
						//console.log(pro);
					}
				};
				getData();
			}
		}
	}, [valueRefreshPage]);
	const checkToken = () => {
		const token: any = window.localStorage.getItem('token');
		const date = Date.now();
		if (window.localStorage.getItem('token')) {
			const checkToken: any = jwtDecode(token);
			if (checkToken.exp < date / 1000) {
				localStorage.removeItem('token');
				return <Redirect to={AppURL.ACCOUNT} />;
			}
		} else {
			return <Redirect to={AppURL.ACCOUNT} />;
		}
	};
	return (
		<Grid
			container
			className={clsx(isResponseiveMobile ? classes.bgHeader2 : classes.bgHeaderResponse)}
		>
			{checkToken()}
			<Grid item lg={3} xl={3} md={12} xs={12} style={{ backgroundColor: '#f1f4f7' }}>
				<Card variant="outlined">
					<Box
						style={{
							backgroundColor: '#fff',
							display: 'flex',
							alignItems: 'center',
							marginBottom: '15px',
						}}
					>
						<Card variant="outlined" style={{ width: '-webkit-fill-available' }}>
							<ListItem>
								<ListItemAvatar style={{ marginRight: '-8px' }}>
									<Avatar>{profileInfo.name ? profileInfo.name.charAt(0) : 'A'}</Avatar>
								</ListItemAvatar>
								<div
									style={{
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}}
								>
									<div>
										<Typography variant="body1" noWrap>
											Xin chào!
										</Typography>
									</div>
									<div style={{ display: 'grid' }}>
										<Typography variant="h6" style={{ fontSize: '16px' }} noWrap>
											{profileInfo.name}
										</Typography>
									</div>
								</div>
							</ListItem>
						</Card>
					</Box>

					<Card
						variant="outlined"
						style={{
							width: '-webkit-fill-available',
							backgroundColor: '#fff',
						}}
					>
						<Box style={{ display: 'flex', alignItems: 'center', paddingLeft: '13px' }}>
							<PersonIcon style={{ fontSize: '34px' }} /> &nbsp;
							<ListItem style={{ paddingLeft: 0, textTransform: 'uppercase' }}>
								<Typography variant="body1" style={{ fontWeight: 'bold' }}>
									Quản lý thông tin
								</Typography>
							</ListItem>
							<ChevronRightIcon />
						</Box>
						<Box>
							<NavLink
								to={AppURL.PROFILE_INFO}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Thông tin tài khoản</Typography>
							</NavLink>

							<NavLink
								to={AppURL.PROFILE_CHANGEPWD}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Đổi mật khẩu</Typography>
							</NavLink>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center', paddingLeft: '13px' }}>
							<EventNoteIcon style={{ fontSize: '34px' }} /> &nbsp;
							<ListItem style={{ paddingLeft: 0, textTransform: 'uppercase' }}>
								<Typography variant="body1" style={{ fontWeight: 'bold' }}>
									Quản lý đơn hàng
								</Typography>
							</ListItem>
							<ChevronRightIcon />
						</Box>
						<Box>
							<NavLink
								to={AppURL.ORDER_ALL}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Tất cả đơn hàng</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_PENDING}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Đơn hàng đang chờ duyệt</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_PROCESSING}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Đơn hàng đã đóng gói</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_SHIPPING}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Đơn hàng đang vận chuyển</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_COMPLETED}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Đơn hàng đã hoàn thành</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_CANCELLED}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Đơn hàng đã hủy</Typography>
							</NavLink>
						</Box>
					</Card>
				</Card>
			</Grid>
			<Grid item lg={9} xl={9} md={12} xs={12} style={{ position: 'relative' }}>
				<Switch>
					<Route
						path={[
							AppURL.PROFILE_INFO,
							AppURL.PROFILE_CHANGEPWD,
							AppURL.ORDER_DETAIL,
							AppURL.ORDER_CANCELLED,
							AppURL.ORDER_ALL,
							AppURL.ORDER_COMPLETED,
							AppURL.ORDER_PENDING,
							AppURL.ORDER_SHIPPING,
						]}
					>
						<Switch>
							<Route path={AppURL.PROFILE_INFO}>
								{flag ? (
									<ProfileInfo profileInfo={profileInfo} />
								) : (
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', top: '50%', left: '50%' }}
									/>
								)}
							</Route>
							<Route path={AppURL.PROFILE_CHANGEPWD} component={ChangePwd} />
							<Route path={AppURL.ORDER_COMPLETED}>
								<OrderStatus
									title="Đơn hàng đã hoàn thành"
									name={AppURL.ORDER_COMPLETED}
									status={4}
								/>
							</Route>

							<Route path={AppURL.ORDER_ALL}>
								<OrderStatus title="Tất cả đơn hàng" name={AppURL.ORDER_ALL} status={0} />
							</Route>
							<Route path={AppURL.ORDER_PENDING}>
								<OrderStatus
									title="Đơn hàng đang chờ duyệt"
									name={AppURL.ORDER_PENDING}
									status={1}
								/>
							</Route>
							<Route path={AppURL.ORDER_SHIPPING}>
								<OrderStatus
									title="Đơn hàng đang vận chuyển"
									name={AppURL.ORDER_SHIPPING}
									status={2}
								/>
							</Route>
							<Route path={AppURL.ORDER_PROCESSING}>
								<OrderStatus
									title="Đơn hàng đã đóng gói"
									name={AppURL.ORDER_PROCESSING}
									status={3}
								/>
							</Route>
							<Route path={AppURL.ORDER_CANCELLED}>
								<OrderStatus title="Đơn hàng đã hủy" name={AppURL.ORDER_CANCELLED} status={5} />
							</Route>
							<Route path={AppURL.ORDER_DETAIL}>
								<OrderDetail />
							</Route>
						</Switch>
					</Route>
				</Switch>
			</Grid>
		</Grid>
	);
};
export default Profile;
