import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { NewsIdGet } from '../../api/News';
import theme from '../../utils/theme';
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#f4f4f4',

		// marginBottom: '10px',
	},
	reply: { color: 'blue', cursor: 'pointer', display: 'contents', '&:hover': { color: 'grey' } },
	titleText: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		paddingLeft: '10px',
		marginBottom: '33px',
	},
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	bgHeaderMobile: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		backgroundColor: '#f4f4f4',
	},
	discount_percent: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
	},
	discount_percent1: {
		padding: '2px',
		borderRadius: '4px',
		color: '#fff',
		backgroundColor: theme.palette.primary.main,
		paddingLeft: '10px',
		paddingRight: '10px',
		marginLeft: '10px',
		position: 'relative',
		'&:after': {
			right: '100%',
			top: '50%',
			border: 'solid transparent',
			content: '""',
			height: 0,
			width: 0,
			position: 'absolute',
			pointerEvents: 'none',
			borderColor: `rgba(${82},${184},${88},${0})`,
			borderRightColor: theme.palette.primary.main,
			borderWidth: '6px',
			marginTop: '-6px',
		},
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
const NewsDetail: React.FC = () => {
	const classes = useStyles();
	const { idNews } = useParams<{ idNews?: string }>();
	const [progress, setProgress] = React.useState(false);
	const [dataNews, setDataNews] = React.useState<any>();
	React.useEffect(() => {
		const fetNews = async () => {
			setProgress(true);
			const response = await NewsIdGet(idNews);
			if (response) {
				if (response.errorCode === null) {
					console.log(response);
					setProgress(false);
					setDataNews(response.data);
				}
			}
		};
		fetNews();
	}, [idNews]);
	return progress ? (
		<CircularProgress color="secondary" style={{ position: 'absolute', top: '50%', left: '50%' }} />
	) : (
		<Grid container className={classes.bgHeader}>
			<Grid item xs={12}>
				<div dangerouslySetInnerHTML={{ __html: dataNews?.content }} />
			</Grid>
		</Grid>
	);
};
export default NewsDetail;
