import {
	Avatar,
	Box,
	Card,
	Grid,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Typography,
} from '@material-ui/core';
import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { NavLink } from 'react-router-dom';
import { AppURL } from '../../utils/const';
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
const Profile: React.FC = (props) => {
	const classes = useStyles();
	return (
		<Grid container className={classes.bgHeader2}>
			<Grid item xs={3} style={{ backgroundColor: '#f1f4f7' }}>
				<Card variant="outlined">
					<Box
						style={{
							backgroundColor: '#fff',
							display: 'flex',
							alignItems: 'center',
							marginBottom: '15px',
						}}
					>
						<Card variant="outlined" style={{ width: '-webkit-fill-available' }}>
							<ListItem>
								<ListItemAvatar style={{ marginRight: '-8px' }}>
									<Avatar>T</Avatar>
								</ListItemAvatar>
								<div
									style={{
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}}
								>
									<div>
										<Typography variant="body1" noWrap>
											Xin chao!
										</Typography>
									</div>
									<div style={{ display: 'grid' }}>
										<Typography variant="h6" style={{ fontSize: '16px' }} noWrap>
											Tran Sang
										</Typography>
									</div>
								</div>
							</ListItem>
						</Card>
					</Box>

					<Card
						variant="outlined"
						style={{
							width: '-webkit-fill-available',
							backgroundColor: '#fff',
						}}
					>
						<Box style={{ display: 'flex', alignItems: 'center', paddingLeft: '13px' }}>
							<PersonIcon style={{ fontSize: '34px' }} /> &nbsp;
							<ListItem style={{ paddingLeft: 0, textTransform: 'uppercase' }}>
								<Typography variant="body1" style={{ fontWeight: 'bold' }}>
									quan ly thong tin
								</Typography>
							</ListItem>
							<ChevronRightIcon />
						</Box>
						<Box>
							<NavLink
								to={AppURL.PROFILE_INFO}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Thong tin tai khoan</Typography>
							</NavLink>

							<NavLink
								to={AppURL.PROFILE_CHANGEPWD}
								className={classes.tagLi}
								activeClassName={classes.activeTagLi}
							>
								<Typography style={{ paddingLeft: '36px' }}>Doi mat khau</Typography>
							</NavLink>
						</Box>
					</Card>
				</Card>
			</Grid>
			<Grid item xs={9}>
				{props.children}
			</Grid>
		</Grid>
	);
};
export default Profile;
