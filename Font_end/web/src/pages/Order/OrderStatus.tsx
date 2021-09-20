import {
	Avatar,
	Box,
	Button,
	Card,
	CircularProgress,
	Container,
	Grid,
	LinearProgress,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, useHistory } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import { useForm } from 'react-hook-form';
import { UpdatePasswordPost } from '../../api/User';
import { toast, ToastContainer } from 'react-toastify';
import { OrderPostAll } from '../../api/Order';
import { Pagination } from '@material-ui/lab';
import { TryRounded } from '@mui/icons-material';
interface OrderStatusProps {
	listData?: any;
	title?: string;
	name?: string;
}
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

const OrderStatus: React.FC<OrderStatusProps> = (props) => {
	const [dataOrder, setDataOrder] = React.useState<any>({});
	const [progressOrder, setProgressOrder] = React.useState(false);
	const [page, setPage] = React.useState(1);
	const classes = useStyles();

	React.useEffect(() => {
		setProgressOrder(true);
		window.scrollTo(0, 0);
		const fetchOrderAll = async () => {
			const responseOrderAll = await OrderPostAll({ page: page, pageSize: 5 });
			if (responseOrderAll) {
				if (responseOrderAll.errorCode === null) {
					console.log(responseOrderAll.data);
					setProgressOrder(false);
					setDataOrder(responseOrderAll.data);
				}
			}
		};
		fetchOrderAll();
	}, [page]);
	const history = useHistory();
	const contenStatus = (item: any) => {
		let result = '';
		if (item?.status === 1) {
			result = 'Dang cho duyet';
		}
		return result;
	};
	return (
		<Container>
			{progressOrder ? (
				<CircularProgress
					color="secondary"
					style={{ position: 'fixed', top: '150px', left: '900px' }}
				/>
			) : (
				<React.Fragment>
					<Typography variant="h5" gutterBottom>
						{props.title}
					</Typography>
					<TableContainer>
						<Table style={{ backgroundColor: '#fff' }}>
							<TableHead>
								<TableRow>
									<TableCell>Mã đơn hàng</TableCell>
									<TableCell>Ngày mua</TableCell>
									<TableCell>Sản phẩm</TableCell>
									<TableCell>Tổng tiền</TableCell>
									<TableCell>Trạng thái đơn hàng</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{dataOrder.listData?.map((item: any) => {
									return (
										<TableRow>
											<TableCell
												style={{ color: 'blue', cursor: 'pointer' }}
												onClick={() => {
													history.push(`/order/${item.bill.id}`);
												}}
											>
												<Typography>{item.bill.id}</Typography>
											</TableCell>
											<TableCell>{item.bill.created_at}</TableCell>
											<TableCell>
												{item.item.length > 1 ? (
													<React.Fragment>
														<Typography
															component="span"
															style={{
																//height: '50px',
																overflow: 'hidden',
																display: '-webkit-box',
																textOverflow: 'ellipsis',
																WebkitLineClamp: 1,
																WebkitBoxOrient: 'vertical',
															}}
														>
															{item.item[0]}
														</Typography>
														<Typography component="span">
															&nbsp;va {item.item.length - 1} san pham khac
														</Typography>
													</React.Fragment>
												) : (
													item.item[0]
												)}
											</TableCell>
											<TableCell>
												{Intl.NumberFormat('en-US').format(Number(item.bill.total))}đ
											</TableCell>
											<TableCell>{contenStatus(item)}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					{dataOrder.totalCount > 5 && (
						<Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: ' 30px' }}>
							<Pagination
								count={Math.ceil(dataOrder.totalCount / 5)}
								variant="outlined"
								color="primary"
								defaultPage={page}
								onChange={(event: object, page: number) => {
									setPage(page);
								}}
							/>
						</Box>
					)}
				</React.Fragment>
			)}
		</Container>
	);
};
export default OrderStatus;
