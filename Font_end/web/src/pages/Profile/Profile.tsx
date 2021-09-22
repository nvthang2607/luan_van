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
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
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
		<Grid container className={classes.bgHeader2}>
			{checkToken()}
			<Grid item xs={3} style={{ backgroundColor: '#f1f4f7' }}>
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
											Xin chao!
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
									quan ly thong tin
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
								<Typography style={{ paddingLeft: '36px' }}>Thong tin tai khoan</Typography>
							</NavLink>

							<NavLink
								to={AppURL.PROFILE_CHANGEPWD}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Doi mat khau</Typography>
							</NavLink>
						</Box>
						<Box style={{ display: 'flex', alignItems: 'center', paddingLeft: '13px' }}>
							<EventNoteIcon style={{ fontSize: '34px' }} /> &nbsp;
							<ListItem style={{ paddingLeft: 0, textTransform: 'uppercase' }}>
								<Typography variant="body1" style={{ fontWeight: 'bold' }}>
									quan ly don hang
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
								<Typography style={{ paddingLeft: '36px' }}>Tat ca don hang</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_PENDING}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Don hang dang cho duyet</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_PROCESSING}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Don hang da dong goi</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_SHIPPING}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Don hang dang van chuyen</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_COMPLETED}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Don hang da hoan thanh</Typography>
							</NavLink>
							<NavLink
								to={AppURL.ORDER_CANCELLED}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Don hang da huy</Typography>
							</NavLink>
						</Box>
					</Card>
				</Card>
			</Grid>
			<Grid item xs={9} style={{ position: 'relative' }}>
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
									title="Don hang da hoan thanh"
									name={AppURL.ORDER_COMPLETED}
									status={4}
								/>
							</Route>

							<Route path={AppURL.ORDER_ALL}>
								<OrderStatus title="Tat ca don hang" name={AppURL.ORDER_ALL} status={0} />
							</Route>
							<Route path={AppURL.ORDER_PENDING}>
								<OrderStatus
									title="Don hang dang cho duyet"
									name={AppURL.ORDER_PENDING}
									status={1}
								/>
							</Route>
							<Route path={AppURL.ORDER_SHIPPING}>
								<OrderStatus
									title="Don hang dang van chuyen"
									name={AppURL.ORDER_SHIPPING}
									status={2}
								/>
							</Route>
							<Route path={AppURL.ORDER_PROCESSING}>
								<OrderStatus
									title="Don hang da dong goi"
									name={AppURL.ORDER_PROCESSING}
									status={3}
								/>
							</Route>
							<Route path={AppURL.ORDER_CANCELLED}>
								<OrderStatus title="Don hang da huy" name={AppURL.ORDER_CANCELLED} status={5} />
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
