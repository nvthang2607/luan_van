import { Card, Container, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { AppURL } from '../../../utils/const';
import { useHistory } from 'react-router';
interface CardMenuProps {
	url?: any;
	title?: string;
	icon?: any;
	titleChildren?: string;
}
const CardMenu: React.FC<CardMenuProps> = (props) => {
	const history = useHistory();
	return (
		<Card style={{ padding: '20px' }}>
			<Typography variant="h5">{props.title}</Typography>
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
					history.push(props?.url);
				}}
			>
				<Box>
					{/* <i
						className="fa fa-newspaper-o"
						aria-hidden="true"
						style={{ color: '#fff', fontSize: '94px' }}
					></i> */}
					{/* <PersonIcon style={{ color: '#fff', fontSize: '94px' }} /> */}
					{props.icon}
					<Box>
						<Typography variant="h5" style={{ color: '#fff' }}>
							{props.titleChildren}
						</Typography>
					</Box>
				</Box>
			</Card>
		</Card>
	);
};
export default CardMenu;
