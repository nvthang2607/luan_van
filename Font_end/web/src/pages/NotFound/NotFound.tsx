import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import img from '../../public/images/404.png';
import { useHistory } from 'react-router-dom';
import theme from '../../utils/theme';

const useStyles = makeStyles((theme) => ({
	background: {
		backgroundImage: `url(${img})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center left',
		backgroundSize: '30%',
		height: '100vh',
		// paddingLeft: theme.spacing(8),
	},
	item: {
		textAlign: 'center',
		fontSize: theme.spacing(3),
	},
	back: {
		textAlign: 'center',
		fontSize: theme.spacing(3),
		marginTop: theme.spacing(6),
	},
}));

const NotFoundPage: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();
	return (
		<Grid container xs justify="center" alignItems="center" className={classes.background}>
			<Grid xs={6} />
			<Grid item xs={6}>
				<Grid container>
					<Grid
						item
						xs={12}
						style={{
							fontSize: theme.spacing(8),
							textAlign: 'center',
							marginBottom: theme.spacing(2),
						}}
					>
						Oops!
					</Grid>
					<Grid
						item
						xs={12}
						style={{
							fontSize: theme.spacing(6),
							textAlign: 'center',
							marginBottom: theme.spacing(4),
						}}
					>
						404 Error
					</Grid>
					<Grid item xs={12} className={classes.item}>
						Excuse me. Page not found @@
					</Grid>
					<Grid item xs={12} className={classes.item}>
						We are sorry but the page you are looking for does not exist
					</Grid>
					<Grid item xs={12} className={classes.back}>
						Please return to the{' '}
						<span
							onClick={() => {
								history.push('/');
							}}
							style={{ color: 'grey', cursor: 'pointer' }}
						>
							go to page Home
						</span>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default NotFoundPage;
