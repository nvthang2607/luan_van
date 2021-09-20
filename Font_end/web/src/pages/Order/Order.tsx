import {
	Avatar,
	Box,
	Card,
	CircularProgress,
	Collapse,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import { UserGet } from '../../api/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import jwtDecode from 'jwt-decode';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { getValueRefreshPage } from '../../features/refresh/RefreshPageSlice';
import Shipping from './Shipping';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import OrderStatus from './OrderStatus';
import OrderDetail from './OrderDetail';
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
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
const Order: React.FC = (props) => {
	const classes = useStyles();
	const valueRefreshPage = useAppSelector(getValueRefreshPage);
	const [profileInfo, setProfileInfo] = React.useState<any>({});
	const [flag, setFlag] = React.useState(false);
	React.useEffect(() => {
		const getData = async () => {
			const profile = await UserGet();
			if (profile.errorCode === null) {
				setProfileInfo(profile.data);
				setFlag(true);
				//console.log(pro);
			}
		};
		getData();
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
	const history = useHistory();
	const [showOrderStatus, setShowOrderStatus] = React.useState(true);
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
								to={AppURL.ORDER_WAITING}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Don hang dang cho duyet</Typography>
							</NavLink>

							{/* <NavLink
								to={AppURL.PROFILE_CHANGEPWD}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Doi mat khau</Typography>
							</NavLink> */}
							{/* <Box style={{ marginTop: '10px' }}>
								<ListItem
									className={classes.activeTagLi}
									button
									onClick={() => {
										setShowOrderStatus(!showOrderStatus);
									}}
								>
									<Typography style={{ paddingLeft: '36px', display: 'flex', fontWeight: 'bold' }}>
										Trang trai don hang
										{showOrderStatus ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
									</Typography>
								</ListItem>
								<Collapse in={showOrderStatus} timeout="auto" unmountOnExit>
									<ListItem
										button
										onClick={() => {
											history.push(AppURL.ORDER_ALL);
										}}
									>
										<Typography style={{ paddingLeft: '55px' }}>Tat ca don hang</Typography>
									</ListItem>
									<ListItem
										button
										onClick={() => {
											history.push(AppURL.ORDER_WAITING);
										}}
									>
										<Typography style={{ paddingLeft: '55px' }}>Dang cho duyet</Typography>
									</ListItem>
									<ListItem button>
										<Typography style={{ paddingLeft: '55px' }}>
											Da duyet va dang cho giao hang
										</Typography>
									</ListItem>
									<ListItem button>
										<Typography style={{ paddingLeft: '55px' }}>Dang cho thanh toan</Typography>
									</ListItem>
									<ListItem button>
										<Typography style={{ paddingLeft: '55px' }}>Don hang da hoan thanh</Typography>
									</ListItem>
									<ListItem button>
										<Typography style={{ paddingLeft: '55px' }}>Da huy</Typography>
									</ListItem>
								</Collapse>
							</Box>
							<Box>
								<ListItem className={classes.tagLi} button>
									<Typography style={{ paddingLeft: '36px', display: 'flex' }}>
										Lich su mua hang
									</Typography>
								</ListItem>
							</Box> */}
						</Box>
					</Card>
				</Card>
			</Grid>
			<Grid item xs={9} style={{ position: 'relative' }}>
				<Switch>
					<Route
						path={[
							AppURL.ORDER_SHIPPING,
							AppURL.ORDER_WAITING,
							AppURL.ORDER_ALL,
							AppURL.ORDER_DETAIL,
						]}
					>
						<Switch>
							<Route path={AppURL.ORDER_SHIPPING}>
								{flag ? (
									<Shipping />
								) : (
									<CircularProgress
										color="secondary"
										style={{ position: 'absolute', top: '50%', left: '50%' }}
									/>
								)}
							</Route>
							<Route path={AppURL.ORDER_WAITING}>
								<OrderStatus title="Don hang dang cho duyet" name="waiting" />
							</Route>
							<Route path={AppURL.ORDER_ALL}>
								<OrderStatus title="Tat ca don hang" name="all" />
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
export default Order;
