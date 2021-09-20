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
	const classes = useStyles();
	React.useEffect(() => {
		const fetchOrderAll = async () => {
			const responseOrderAll = await OrderPostAll({ page: 1, pageSize: 5 });
			if (responseOrderAll) {
				if (responseOrderAll.errorCode === null) {
					console.log(responseOrderAll.data);
				}
			}
		};
		fetchOrderAll();
	}, []);
	const history = useHistory();
	return (
		// <Container>
		// 	<Grid item xs={12}>
		// 		<Typography variant="h5">Don hang dang cho duyet</Typography>
		// 	</Grid>
		// 	<Grid container>
		// 		<Grid item xs={12} style={{ display: 'flex' }}>
		// 			<Grid item xs={2}>
		// 				<Typography variant="body1" gutterBottom>
		// 					Mã đơn hàng
		// 				</Typography>
		// 				<Typography variant="body1">774868856</Typography>
		// 			</Grid>
		// 			<Grid item xs={2}>
		// 				<Typography variant="body1" gutterBottom>
		// 					Ngày mua
		// 				</Typography>

		// 				<Typography variant="body1">18/01/2021</Typography>
		// 			</Grid>
		// 			<Grid item xs={3}>

		//                 <Typography variant="body1" gutterBottom>
		//                 Sản phẩm
		// 				</Typography>

		// 				<Typography variant="body1"> USB 3.0 SanDisk Ultra CZ48 64GB - Hàng Chính Hãng</Typography>

		// 			</Grid>
		// 			<Grid item xs={2}>

		//                 <Typography variant="body1" gutterBottom>
		//                 Tổng tiền
		// 				</Typography>

		// 				<Typography variant="body1">233.000.000d</Typography>
		// 			</Grid>
		// 			<Grid item xs={3}>

		//                 <Typography variant="body1" gutterBottom>
		//                 Trạng thái đơn hàng
		// 				</Typography>

		// 				<Typography variant="body1">233.000.000d</Typography>
		//                 Giao hàng thành công
		// 			</Grid>
		// 		</Grid>
		// 	</Grid>
		// </Container>
		<Container>
			<Typography variant="h5">{props.title}</Typography>
			<TableContainer>
				<Table>
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
						<TableRow>
							<TableCell
								style={{ color: 'blue', cursor: 'pointer' }}
								onClick={() => {
									history.push('/order/123456');
								}}
							>
								774868856
							</TableCell>
							<TableCell>18/01/2021</TableCell>
							<TableCell>USB 3.0 SanDisk Ultra CZ48 64GB - Hàng Chính Hãng</TableCell>
							<TableCell>233.000.000 ₫</TableCell>
							<TableCell>Giao hàng thành công</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{ color: 'blue', cursor: 'pointer' }}>774868856</TableCell>
							<TableCell>18/01/2021</TableCell>
							<TableCell>USB 3.0 SanDisk Ultra CZ48 64GB - Hàng Chính Hãng</TableCell>
							<TableCell>233.000.000 ₫</TableCell>
							<TableCell>Giao hàng thành công</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: ' 30px' }}>
				<Pagination count={10} variant="outlined" color="primary" />
			</Box>
		</Container>
	);
};
export default OrderStatus;
