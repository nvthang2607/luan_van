import { Card, Container, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { AppURL } from '../../../utils/const';
import { useHistory } from 'react-router';
import CardMenu from './CardMenu';
import axios from 'axios';
const Home: React.FC = () => {
	const history = useHistory();
	React.useEffect(() => {
		axios({
			method: 'get',
			url: 'http://localhost:8000/api/test',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);
	return (
		<Container style={{ backgroundColor: '#f4f4f4', padding: 0 }}>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<CardMenu />
						</Grid>
						<Grid item xs={4}>
							<CardMenu />
						</Grid>
						<Grid item xs={4}>
							<CardMenu />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={4}>
							<Card>sang</Card>
						</Grid>
						<Grid item xs={4}>
							<Card>sang</Card>
						</Grid>
						<Grid item xs={4}>
							<Card>sang</Card>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};
export default Home;
