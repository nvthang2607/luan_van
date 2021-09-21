import { Box, Card, Grid, makeStyles } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppURL } from '../utils/const';
const useStyles = makeStyles((theme) => ({
	paper: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	root: {
		backgroundColor: theme.palette.grey[300],
		height: '100vh',
	},
}));
const token: any = window.localStorage.getItem('token');
const date = Date.now();

// const handleCheckToken = () => {
// 	if (window.localStorage.getItem('token')) {
// 		const checkToken: any = jwtDecode(token);
// 		if (checkToken.exp < date / 1000) {
// 			localStorage.removeItem('token');
// 		} else if (checkToken.isAdmin) {
// 			return <Redirect to={AppURL.USER} />;
// 		} else if (!checkToken.isAdmin) {
// 			return <Redirect to={AppURL.DASHBOARD} />;
// 		}
// 	}
// };
const LoginLayout: React.FC = (props) => {
	const classes = useStyles();
	return (
		<Box>
			{/* {handleCheckToken()} */}
			{/* {window.localStorage.getItem('token') && <Redirect to={AppURL.USER} />} */}
			<Grid container className={classes.root} justify="center" alignItems="center">
				<Grid item className={classes.paper} component={Card}>
					{props.children}
				</Grid>
			</Grid>
		</Box>
	);
};
export default LoginLayout;
