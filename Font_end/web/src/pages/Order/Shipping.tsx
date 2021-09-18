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
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import { useForm } from 'react-hook-form';
import { UpdatePasswordPost } from '../../api/User';
import { toast, ToastContainer } from 'react-toastify';
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
const Shipping: React.FC = () => {
	const classes = useStyles();

	return <h1>Shiiping</h1>;
};
export default Shipping;
