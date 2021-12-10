import {
	Box,
	Button,
	ButtonGroup,
	DialogContent,
	DialogTitle,
	Divider,
	FormHelperText,
	IconButton,
	InputBase,
	Theme,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Close } from '@material-ui/icons';
import RemoveIcon from '@material-ui/icons/Remove';
import sp1 from './../../public/images/10047676-dien-thoai-vsmart-aris-8gb-128gb-xam-nhat-thuc-1.jpg';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, createStyles } from '@material-ui/styles';
import { AppURL } from '../../utils/const';
import theme from '../../utils/theme';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteProduct, getCartData, updateQuantity } from '../Product/CartSlice';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
interface CartProps {
	receiveCart?: (result: boolean) => void;
}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bgHeader: {
			backgroundColor: theme.palette.primary.main,
			paddingRight: theme.spacing(10),
			paddingLeft: theme.spacing(10),
		},
		grow: {
			flexGrow: 1,
		},
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
		root: {
			position: 'fixed',
			bottom: theme.spacing(3),
			right: theme.spacing(2),
		},
		adHover: {
			color: 'black',
			textDecoration: 'none',
			fontWeight: 'bold',
			'&:hover': {
				color: '#2196f3',
			},
		},
		styleSearch: { height: '7px !important' },
		menuButton: {
			marginRight: theme.spacing(2),
		},
		colorIcon: {
			color: theme.palette.primary.main,
		},
		title: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
		search: {
			// color: 'black',
			// '&:hover': {
			// 	backgroundColor: '#fff',
			// },
			//marginRight: theme.spacing(2),
			//marginLeft: 0,
			//width: '100%',
			// [theme.breakpoints.up('sm')]: {
			// 	marginLeft: theme.spacing(3),
			// 	width: 'auto',
			// },
		},
		colorChip: {
			padding: '22px',
			fontSize: '18px',
			fontWeight: 'bold',
			color: 'black',
			border: `2px solid ${theme.palette.primary.main}`,
		},
		inputRoot: {
			color: 'inherit',
		},
		colorAvatar: {
			backgroundColor: '#fff',
			color: theme.palette.primary.main,
			fontWeight: 'bold',
		},
		inputInput: {
			height: '3ch',
			padding: theme.spacing(1, 6, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
			transition: theme.transitions.create('width'),
			//width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		},
		sectionDesktop: {
			display: 'none',
			[theme.breakpoints.up('md')]: {
				display: 'flex',
			},
		},
		inputSearch: {
			height: '48px',
			paddingRight: 0,
			borderRadius: theme.shape.borderRadius,
			backgroundColor: '#fff',
		},
		a: {
			borderRight: '1px solid',
			marginRight: '15px',
		},
		displayBoxContact: {
			display: 'block !important',
		},
		closeButton: {
			position: 'absolute',
			top: theme.spacing(1),
			right: theme.spacing(1),
			color: theme.palette.grey[500],
			zIndex: 1,
		},
		button: {},
		sectionMobile: {
			display: 'flex',
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
	})
);
const Cart: React.FC<CartProps> = (props) => {
	const classes = useStyles();
	const [openCart, setOpenCart] = React.useState(false);
	const [count, setCount] = React.useState(0);
	const [quantity, setQuantity] = React.useState(1);
	const history = useHistory();
	const cartData = useAppSelector(getCartData);
	const dispatch = useAppDispatch();
	//console.log(cartData);
	const totalPrice = () => {
		let total = 0;
		cartData.map((item: any) => {
			total += item.quantity * item.promotion_price;
		});
		return total;
	};
	const [err, setErr] = React.useState<any>();
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
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	return isResponseivePhone ? (
		<Box style={{ width: 400 }}>
			<Box>
				<DialogTitle id="form-dialog-title">GIỎ HÀNG</DialogTitle>
				{cartData.length === 0 ? (
					<DialogContent style={{ textAlign: 'center' }}>
						<img
							width="70%"
							src="https://bizweb.dktcdn.net/100/420/160/themes/825846/assets/mobile-shopping.svg?1631101741005"
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								history.push('/');
								props.receiveCart?.(false);
								window.scrollTo(0, 0);
							}}
						>
							Tiếp tục mua hàng
						</Button>
					</DialogContent>
				) : (
					<React.Fragment>
						<DialogContent style={{ height: `calc(${100}vh - ${250}px)` }}>
							{cartData.map((item: any) => {
								return (
									<Box style={{ display: 'flex', marginBottom: '35px' }}>
										<Box style={{ width: '32%' }}>
											<img
												width="100%"
												style={{ cursor: 'pointer' }}
												src={`http://localhost:8000${item.link}`}
												onClick={() => {
													history.push(`/product_detail/${toURL(item?.name)}-${item?.id}.html`);
													props.receiveCart?.(false);
												}}
											/>
										</Box>
										<Box style={{ marginLeft: '4px', width: '78%' }}>
											<Typography
												variant="body1"
												style={{ fontWeight: 'bold', cursor: 'pointer' }}
												onClick={() => {
													history.push(`/product_detail/${toURL(item?.name)}-${item?.id}.html`);
													props.receiveCart?.(false);
												}}
											>
												{item.name}
											</Typography>
											<Box style={{ display: 'contents' }}>
												<Box style={{ width: '50%', float: 'left' }}>
													<Typography>Số lượng</Typography>
													<ButtonGroup style={{ width: '69px' }}>
														<Button
															aria-label="reduce"
															onClick={() => {
																//setQuantity(Math.max(Number(quantity) - 1, 1));
																setErr('');
																dispatch(
																	updateQuantity({ id: item.id, quantity: 1, status: 'decrease' })
																);
															}}
															size="small"
															disabled={item.quantity === 1 ? true : false}
														>
															<RemoveIcon fontSize="small" />
														</Button>
														<InputBase
															style={{
																paddingLeft: '4px',
																paddingRight: '4px',
																border: `1px solid rgba(${0}, ${0}, ${0}, ${0.23})`,
																borderRight: 'none',
															}}
															inputProps={{ style: { textAlign: 'center' } }}
															value={item.quantity}
															onChange={(event: any) => {
																// !isNaN(Number(event.target.value))
																// 	? setQuantity(Math.max(Number(event.target.value), 1))
																// 	: setQuantity(quantity);
																if (event.target.value > item.storeQuantity) {
																	setErr(item.id);
																} else {
																	setErr(false);
																	dispatch(
																		updateQuantity({
																			id: item.id,
																			quantity: !isNaN(Number(event.target.value))
																				? Math.max(Number(event.target.value), 1)
																				: item.quantity,
																			status: 'replace',
																		})
																	);
																}
															}}
														/>
														<Button
															aria-label="increase"
															onClick={() => {
																setErr('');
																//setQuantity(Number(quantity) + 1);
																dispatch(
																	updateQuantity({ id: item.id, quantity: 1, status: 'increase' })
																);
															}}
															size="small"
															disabled={item.quantity >= item.storeQuantity ? true : false}
														>
															<AddIcon fontSize="small" />
														</Button>
													</ButtonGroup>
													{err === item.id && (
														<FormHelperText error>Không đủ số lượng</FormHelperText>
													)}
												</Box>
												<Box style={{ width: '50%', float: 'right', textAlign: 'end' }}>
													<Typography
														style={{
															fontWeight: 'bold',
															color: theme.palette.primary.main,
														}}
													>
														{Intl.NumberFormat('en-US').format(Number(item.promotion_price))}đ
													</Typography>
													<Button
														style={{
															padding: 0,
															color: theme.palette.primary.main,
															textTransform: 'inherit',
															fontWeight: 'inherit',
														}}
														onClick={() => {
															props.receiveCart?.(false);
															Swal.fire({
																title: 'Bạn có chắc chắn muốn xóa không?',
																//text: t('confirmDelete.you_wont_be_able_to_revert_this'),
																icon: 'warning',
																confirmButtonColor: '#3085d6',
																cancelButtonColor: '#d33',
																confirmButtonText: 'Yes',
																cancelButtonText: 'Cancel',
																showCancelButton: true,
																reverseButtons: true,
															}).then((result) => {
																if (result.isConfirmed) {
																	toast.success('Sản phẩm đã được xóa khỏi giỏ hàng');
																	//Swal.fire('Da xoa', 'San pham da duoc xoa khoi gio hang', 'success');
																	dispatch(deleteProduct({ id: item.id }));
																	props.receiveCart?.(true);
																} else {
																	props.receiveCart?.(true);
																}
															});
														}}
													>
														Xóa sản phẩm
													</Button>
												</Box>
											</Box>
										</Box>
									</Box>
								);
							})}
						</DialogContent>

						<Box style={{ paddingLeft: '26px', paddingRight: '28px' }}>
							<Divider style={{ marginBottom: '18px', marginTop: '17px' }} />
							<Box style={{ display: 'contents' }}>
								<Box style={{ float: 'left' }}>
									<Typography variant="h6">Tổng tiền:</Typography>
								</Box>
								<Box style={{ float: 'right' }}>
									<Typography
										style={{
											fontWeight: 'bold',
											color: theme.palette.primary.main,
										}}
										variant="h6"
									>
										{Intl.NumberFormat('en-US').format(Number(totalPrice()))}đ
									</Typography>
								</Box>
							</Box>
							<Box style={{ marginTop: '70px' }}>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									style={{ textTransform: 'initial' }}
									size="large"
									onClick={() => {
										history.push(AppURL.CHECKOUT);
										//setOpenCart(false);
										props.receiveCart?.(false);
									}}
								>
									Thanh toán
								</Button>
							</Box>
						</Box>
					</React.Fragment>
				)}
			</Box>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Box>
	) : (
		<Box style={{ width: 306 }}>
			<Box>
				<DialogTitle id="form-dialog-title">GIỎ HÀNG</DialogTitle>
				{cartData.length === 0 ? (
					<DialogContent style={{ textAlign: 'center' }}>
						<img
							width="70%"
							src="https://bizweb.dktcdn.net/100/420/160/themes/825846/assets/mobile-shopping.svg?1631101741005"
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								history.push('/');
								props.receiveCart?.(false);
								window.scrollTo(0, 0);
							}}
						>
							Tiếp tục mua hàng
						</Button>
					</DialogContent>
				) : (
					<React.Fragment>
						<DialogContent style={{ height: `calc(${100}vh - ${250}px)` }}>
							{cartData.map((item: any) => {
								return (
									<Box style={{ display: 'flex', marginBottom: '35px' }}>
										<Box style={{ width: '32%' }}>
											<img
												width="100%"
												style={{ cursor: 'pointer' }}
												src={`http://localhost:8000${item.link}`}
												onClick={() => {
													history.push(`/product_detail/${toURL(item?.name)}-${item?.id}.html`);
													props.receiveCart?.(false);
												}}
											/>
										</Box>
										<Box style={{ marginLeft: '4px', width: '78%' }}>
											<Typography
												variant="body1"
												style={{ fontWeight: 'bold', cursor: 'pointer' }}
												onClick={() => {
													history.push(`/product_detail/${toURL(item?.name)}-${item?.id}.html`);
													props.receiveCart?.(false);
												}}
											>
												{item.name}
											</Typography>
											<Box style={{ display: 'contents' }}>
												<Box style={{ width: '50%', float: 'left' }}>
													<Typography>Số lượng</Typography>
													<ButtonGroup style={{ width: '69px' }}>
														<Button
															aria-label="reduce"
															onClick={() => {
																//setQuantity(Math.max(Number(quantity) - 1, 1));
																setErr('');
																dispatch(
																	updateQuantity({ id: item.id, quantity: 1, status: 'decrease' })
																);
															}}
															size="small"
															disabled={item.quantity === 1 ? true : false}
														>
															<RemoveIcon fontSize="small" />
														</Button>
														<InputBase
															style={{
																paddingLeft: '4px',
																paddingRight: '4px',
																border: `1px solid rgba(${0}, ${0}, ${0}, ${0.23})`,
																borderRight: 'none',
															}}
															inputProps={{ style: { textAlign: 'center' } }}
															value={item.quantity}
															onChange={(event: any) => {
																// !isNaN(Number(event.target.value))
																// 	? setQuantity(Math.max(Number(event.target.value), 1))
																// 	: setQuantity(quantity);
																if (event.target.value > item.storeQuantity) {
																	setErr(item.id);
																} else {
																	setErr(false);
																	dispatch(
																		updateQuantity({
																			id: item.id,
																			quantity: !isNaN(Number(event.target.value))
																				? Math.max(Number(event.target.value), 1)
																				: item.quantity,
																			status: 'replace',
																		})
																	);
																}
															}}
														/>
														<Button
															aria-label="increase"
															onClick={() => {
																setErr('');
																//setQuantity(Number(quantity) + 1);
																dispatch(
																	updateQuantity({ id: item.id, quantity: 1, status: 'increase' })
																);
															}}
															size="small"
															disabled={item.quantity >= item.storeQuantity ? true : false}
														>
															<AddIcon fontSize="small" />
														</Button>
													</ButtonGroup>
													{err === item.id && (
														<FormHelperText error>Không đủ số lượng</FormHelperText>
													)}
												</Box>
											</Box>
											<Box>
												<Typography
													style={{
														fontWeight: 'bold',
														color: theme.palette.primary.main,
													}}
												>
													{Intl.NumberFormat('en-US').format(Number(item.promotion_price))}đ
												</Typography>
												<Button
													style={{
														padding: 0,
														color: theme.palette.primary.main,
														textTransform: 'inherit',
														fontWeight: 'inherit',
													}}
													onClick={() => {
														props.receiveCart?.(false);
														Swal.fire({
															title: 'Bạn có chắc chắn muốn xóa không',
															//text: t('confirmDelete.you_wont_be_able_to_revert_this'),
															icon: 'warning',
															confirmButtonColor: '#3085d6',
															cancelButtonColor: '#d33',
															confirmButtonText: 'Yes',
															cancelButtonText: 'Cancel',
															showCancelButton: true,
															reverseButtons: true,
														}).then((result) => {
															if (result.isConfirmed) {
																toast.success('Sản phẩm đã được xóa khỏi giỏ hàng');
																//Swal.fire('Da xoa', 'San pham da duoc xoa khoi gio hang', 'success');
																dispatch(deleteProduct({ id: item.id }));
																props.receiveCart?.(true);
															} else {
																props.receiveCart?.(true);
															}
														});
													}}
												>
													Xóa sản phẩm
												</Button>
											</Box>
										</Box>
									</Box>
								);
							})}
						</DialogContent>

						<Box style={{ paddingLeft: '26px', paddingRight: '28px' }}>
							<Divider style={{ marginBottom: '18px', marginTop: '17px' }} />
							<Box style={{ display: 'contents' }}>
								<Box style={{ float: 'left' }}>
									<Typography variant="h6">Tổng tiền:</Typography>
								</Box>
								<Box style={{ float: 'right' }}>
									<Typography
										style={{
											fontWeight: 'bold',
											color: theme.palette.primary.main,
										}}
										variant="h6"
									>
										{Intl.NumberFormat('en-US').format(Number(totalPrice()))}đ
									</Typography>
								</Box>
							</Box>
							<Box style={{ marginTop: '70px' }}>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									style={{ textTransform: 'initial' }}
									size="large"
									onClick={() => {
										history.push(AppURL.CHECKOUT);
										//setOpenCart(false);
										props.receiveCart?.(false);
									}}
								>
									Thanh toán
								</Button>
							</Box>
						</Box>
					</React.Fragment>
				)}
			</Box>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Box>
	);
};
export default Cart;
