import {
	Avatar,
	Box,
	Card,
	CircularProgress,
	Grid,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ProfileInfo from './ProfileInfo';
import ChangePwd from './ChangePwd';
import jwtDecode from 'jwt-decode';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import { UserGet } from '../../../api/Admin/User';
const useStyles = makeStyles((theme) => ({
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#f4f4f4',
		marginTop: '20px',
		// marginBottom: '10px',
	},
	bgHeaderResponse: {
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		backgroundColor: '#f4f4f4',
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
const Profile: React.FC = (props) => {
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
	const isResponseiveMobile = useMediaQuery({ query: '(min-width: 940px)' });
	const isResponseiveProductMobile = useMediaQuery({ query: '(min-width: 1098px)' });
	const isResponseiveProduct1Mobile = useMediaQuery({ query: '(min-width: 780px)' });
	const isResponseivePhone = useMediaQuery({ query: '(min-width: 555px)' });
	const classes = useStyles();
	const [profileInfo, setProfileInfo] = React.useState<any>({});
	const [flag, setFlag] = React.useState(false);
	React.useEffect(() => {
		const getData = async () => {
			const profile = await UserGet();
			if (profile.errorCode === null) {
				setProfileInfo(profile.data);
				setFlag(true);
				//console.log(pro);
			}
		};
		getData();
	}, []);

	return flag ? (
		<ProfileInfo profileInfo={profileInfo} />
	) : (
		<CircularProgress color="secondary" style={{ position: 'absolute', top: '50%', left: '50%' }} />
	);
};
export default Profile;
