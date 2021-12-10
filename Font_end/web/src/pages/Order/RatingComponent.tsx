import React from 'react';
import { Close } from '@material-ui/icons';
import {
	Box,
	Button,
	DialogContent,
	DialogTitle,
	FormHelperText,
	IconButton,
	makeStyles,
	TextField,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { RatingPost } from '../../api/Rating';
import Swal from 'sweetalert2';
interface RatingProps {
	action?: (result: boolean) => void;
	data?: any;
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
	closeButton: {
		position: 'absolute',
		top: theme.spacing(1),
		right: theme.spacing(1),
		color: theme.palette.grey[500],
		zIndex: 1,
	},
	tagLi: {
		textDecoration: 'none',
		cursor: 'pointer',
		color: 'black',
		padding: '8px',
		display: 'block',
	},
}));
const labels: { [index: string]: string } = {
	1: 'Không thích',
	2: 'Tạm được',
	3: 'Bình thường',
	4: 'Rất tốt',
	5: 'Tuyệt vời quá',
	0: 'Vui lòng đánh giá',
};
const RatingComponent: React.FC<RatingProps> = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState<number | null>(0);
	const [hover, setHover] = React.useState(-1);
	const [valueContent, setValueContent] = React.useState('');
	const [showError, setShowError] = React.useState(false);
	const [progress, setProgress] = React.useState(false);
	const handleClick = async () => {
		if (value === 0) {
			setShowError(true);
		} else {
			setShowError(false);
			setProgress(true);
			const response = await RatingPost({
				Id_billdetail: props.data.idBillDetail,
				rating: value,
				comment: valueContent,
			});
			if (response) {
				if (response.errorCode === null) {
					Swal.fire({
						icon: 'success',
						title: 'Đánh gia thành công!',
						text: 'Cảm ơn bạn đã đánh giá sản phẩm',
					});
					setProgress(false);
					props?.action?.(true);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Có lỗi xảy ra!',
					});
					props?.action?.(false);
					setProgress(false);
				}
			}
		}
	};

	return (
		<React.Fragment>
			{progress ? (
				<CircularProgress
					color="secondary"
					style={{ position: 'fixed', top: '50%', left: '50%' }}
				/>
			) : (
				<React.Fragment>
					<DialogTitle id="form-dialog-title">
						<Box style={{ display: 'flex' }}>
							<Box style={{ marginRight: '20px' }}>
								<img width="50px" src={`http://localhost:8000${props.data.link}`} />
							</Box>
							<Box>
								<Typography style={{ fontWeight: 500 }}>{props.data.name}</Typography>
								<Typography variant="body2">
									{Intl.NumberFormat('en-US').format(Number(props.data.price))}đ
								</Typography>
							</Box>
						</Box>
					</DialogTitle>
					<IconButton className={classes.closeButton} onClick={() => props?.action?.(false)}>
						<Close />
					</IconButton>
					<DialogContent>
						<Box style={{ display: 'grid', justifyContent: 'center', marginBottom: '10px' }}>
							{value !== null && (
								<Box style={{ display: 'flex', justifyContent: 'center' }}>
									<Typography variant="h6">{labels[hover !== -1 ? hover : value]}</Typography>
								</Box>
							)}

							<Rating
								name="hover-feedback"
								value={value}
								style={{ fontSize: '46px' }}
								//precision={0.5}
								onChange={(event, newValue) => {
									if (newValue === null) {
										setValue(0);
									} else {
										setValue(newValue);
									}
								}}
								onChangeActive={(event, newHover) => {
									setHover(newHover);
								}}
								emptyIcon={<StarBorderIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
							/>
							{showError && (
								<Box>
									<FormHelperText error style={{ textAlign: 'center' }}>
										Bạn cần đánh giá trước khi gửi.
									</FormHelperText>
								</Box>
							)}
						</Box>

						<Box>
							<TextField
								id="rate_content"
								multiline
								name="rate_content"
								rows={6}
								placeholder="Nhập đánh giá về sản phẩm"
								variant="outlined"
								fullWidth
								onChange={(e) => {
									setValueContent(e.target.value);
								}}
							/>
						</Box>
						<Button
							size="large"
							style={{ textTransform: 'inherit', marginTop: '10px' }}
							color="primary"
							variant="contained"
							onClick={handleClick}
							disabled={progress}
						>
							Gửi đánh giá
						</Button>
					</DialogContent>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};
export default RatingComponent;
