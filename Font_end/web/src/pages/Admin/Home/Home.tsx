import { Card, Container, Grid, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { AppURL } from '../../../utils/const';
import { useHistory } from 'react-router';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PhoneIcon from '@mui/icons-material/Phone';
import CardMenu from './CardMenu';
import GroupIcon from '@mui/icons-material/Group';
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
	const menu: any = [
		{
			url: AppURL.ADMIN_TYPE_PRODUCT,
			title: 'Quan tri danh muc',
			titleChildren: 'Danh muc',
			icon: <AvTimerIcon style={{ color: '#fff', fontSize: '94px' }} />,
		},
		{
			url: AppURL.MANAGER_USER,
			title: 'Quan tri nguoi dung',
			titleChildren: 'Nguoi dung',
			icon: <PersonIcon style={{ color: '#fff', fontSize: '94px' }} />,
		},
		{
			url: AppURL.ADMIN_BILL,
			title: 'Quan tri don hang',
			titleChildren: 'Don hang',
			icon: <EventNoteIcon style={{ color: '#fff', fontSize: '94px' }} />,
		},
		{
			url: AppURL.ADMIN_NEWS,
			title: 'Quan tri tin tuc',
			titleChildren: 'Tin tuc',
			icon: (
				<i
					className="fa fa-newspaper-o"
					aria-hidden="true"
					style={{ color: '#fff', marginRight: '10px', fontSize: '94px' }}
				></i>
			),
		},
		{
			url: AppURL.ADMIN_SLIDE,
			title: 'Quan tri slide',
			titleChildren: 'Slide',
			icon: (
				<i
					className="fa fa-sliders"
					aria-hidden="true"
					style={{ color: '#fff', marginRight: '10px', fontSize: '94px' }}
				></i>
			),
		},
		{
			url: AppURL.ADMIN_CONTACT,
			title: 'Quan tri lien he',
			titleChildren: 'Lien he',
			icon: <PhoneIcon style={{ color: '#fff', fontSize: '94px' }} />,
		},
		{
			url: AppURL.ADMIN_COMMENT,
			title: 'Quan tri binh luan',
			titleChildren: 'Binh luan',
			icon: (
				<i
					className="fa fa-comments-o"
					aria-hidden="true"
					style={{ color: '#fff', marginRight: '10px', fontSize: '94px' }}
				></i>
			),
		},
		{
			url: AppURL.ADMIN_EMPLOYEE,
			title: 'Quan tri nhan vien',
			titleChildren: 'Nhan vien',
			icon: <GroupIcon style={{ color: '#fff', fontSize: '94px' }} />,
		},
	];

	return (
		<Container style={{ backgroundColor: '#f4f4f4', padding: 0 }}>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						{menu?.map((item: any) => {
							return (
								<Grid item xs={12} xl={4} lg={4} sm={6} md={4}>
									<CardMenu
										url={item.url}
										title={item.title}
										titleChildren={item.titleChildren}
										icon={item.icon}
									/>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};
export default Home;
