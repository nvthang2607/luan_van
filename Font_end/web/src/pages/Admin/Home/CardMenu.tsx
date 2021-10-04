import { Card, Container, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { AppURL } from '../../../utils/const';
import { useHistory } from 'react-router';
const CardMenu: React.FC = () => {
	const history = useHistory();
	return (
		<Card style={{ padding: '20px' }}>
			<Typography variant="h5">Quan tri nguoi dung</Typography>
			<Card
				variant="outlined"
				style={{
					backgroundColor: '#00695c',
					height: '200px',
					marginLeft: '30px',
					marginRight: '30px',
					marginTop: '20px',
					display: 'grid',
					alignItems: 'center',
					textAlign: 'center',
					cursor: 'pointer',
				}}
				onClick={() => {
					history.push(AppURL.MANAGER_USER);
				}}
			>
				<Box>
					<PersonIcon style={{ color: '#fff', fontSize: '94px' }} />
					<Box>
						<Typography variant="h5" style={{ color: '#fff' }}>
							Nguoi dung
						</Typography>
					</Box>
				</Box>
			</Card>
		</Card>
	);
};
export default CardMenu;
