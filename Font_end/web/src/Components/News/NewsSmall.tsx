import { Typography, makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import clsx from 'clsx';
import React from 'react';
import img5 from './../../public/images/news3.jpg';
interface NewsProps {
	title?: string;
	image?: string;
	created_at?: string;
	id?: any;
}
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
	},
	showBox: {
		display: 'block !important',
	},
	showBorder: {
		borderLeft: '0.5px solid #8c8c8c4f',
		borderRight: '0.5px solid #8c8c8c4f',
	},
	button: { cursor: 'pointer' },
	titles: {
		textDecoration: 'none',
		padding: '12px',
		fontSize: '19px',
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		position: 'relative',
		fontWeight: 'bold',
	},
	title: {
		position: 'absolute',
		backgroundColor: 'inherit',
		transform: `skew(${23}deg)`,
		padding: 'inherit',
		top: 0,
		left: '10%',
		zIndex: -1,
		display: 'inherit',
		height: '-webkit-fill-available',
		width: '-webkit-fill-available',
	},
	nameProduct: {
		textDecoration: 'none',
		color: 'black',
		'&:hover': {
			color: theme.palette.primary.main + ' !important',
		},
	},
	hoverProduct: {
		color: theme.palette.primary.main + ' !important',
	},
	borderTitle: {
		borderBottom: `4px solid ${theme.palette.primary.main}`,
		marginTop: '20px',
		display: 'inline-flex',

		zIndex: 1,
	},
	tagLi: {
		width: 'inherit',
		float: 'left',
		cursor: 'pointer',
		paddingLeft: '12px',
		paddingRight: '12px',
		'&:hover': {
			borderLeft: '0.5px solid #8c8c8c4f',
			borderRight: '0.5px solid #8c8c8c4f',
		},
	},
}));
const NewsSmall: React.FC<NewsProps> = (props) => {
	const classes = useStyles();
	const [hoverProduct, setHoverProduct] = React.useState(false);
	const onMouseOverProduct = () => {
		setHoverProduct(true);
	};
	const onMouseOutProduct = () => {
		setHoverProduct(false);
	};
	return (
		<Box
			style={{ display: 'flex', cursor: 'pointer' }}
			onMouseOver={onMouseOverProduct}
			onMouseOut={onMouseOutProduct}
		>
			<Box>
				<img width="110px" src={`http://localhost:8000${props.image}`} />
			</Box>
			<Box style={{ marginLeft: '10px' }}>
				<Typography
					style={{
						height: '81px',
						overflow: 'hidden',
						display: '-webkit-box',
						textOverflow: 'ellipsis',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						fontWeight: 400,
						fontSize: '1.1rem',
					}}
					variant="body1"
					className={clsx(classes.button, { [classes.hoverProduct]: hoverProduct })}
				>
					{props.title}
				</Typography>
				<Typography variant="body2" style={{ color: 'grey' }}>
					{props.created_at}
				</Typography>
			</Box>
		</Box>
	);
};
export default NewsSmall;
