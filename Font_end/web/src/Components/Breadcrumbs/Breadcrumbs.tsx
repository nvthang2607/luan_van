import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),

		marginTop: '20px',
		// marginBottom: '10px',
	},
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	showBox: {
		display: 'block !important',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	link: {
		display: 'flex',
		textDecoration: 'none',
		color: 'black',
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
const Breadcrumbs: React.FC = () => {
	const classes = useStyles();
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link to="/" className={classes.link}>
				<HomeIcon className={classes.icon} />
				Trang chu
			</Link>
			<Link to="/" className={classes.link}>
				Dien thoai
			</Link>
			<Link to="/" className={classes.link}>
				Oppo
			</Link>
		</Breadcrumbs>
	);
};
export default Breadcrumbs;
