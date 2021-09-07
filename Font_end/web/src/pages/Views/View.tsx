import {
	Avatar,
	Box,
	Breadcrumbs,
	Button,
	Card,
	CardContent,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	makeStyles,
	Popover,
	Typography,
} from '@material-ui/core';
import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import { Link, useHistory } from 'react-router-dom';
import Product from '../../Components/Product/Product';
const useStyles = makeStyles((theme) => ({
	bgHeader: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),

		marginTop: '20px',
		// marginBottom: '10px',
	},
	bgHeader2: {
		paddingRight: theme.spacing(13),
		paddingLeft: theme.spacing(13),
		backgroundColor: '#fff',
		marginTop: '20px',
		// marginBottom: '10px',
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
const View: React.FC = () => {
	const classes = useStyles();
	const [anchorElSort, setAnchorElSort] = React.useState<HTMLButtonElement | null>(null);

	const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElSort(event.currentTarget);
	};

	const handleCloseSort = () => {
		setAnchorElSort(null);
	};

	const openSort = Boolean(anchorElSort);
	const idSort = openSort ? 'simple-popover' : undefined;
	const [anchorElPrice, setAnchorElPrice] = React.useState<HTMLButtonElement | null>(null);

	const handleClickPrice = (event: any) => {
		setAnchorElPrice(event.currentTarget);
	};

	const handleClosePrice = () => {
		setAnchorElPrice(null);
	};

	const openPrice = Boolean(anchorElPrice);
	const idPrice = openPrice ? 'simple-popover' : undefined;
	const history = useHistory();

	//const searchParams = new URLSearchParams(location.search);
	//searchParams.set('page', '1');
	//console.log(searchParams.get('page'));
	const onClick = () => {
		history.push({
			pathname: location.pathname,
			search:
				new URLSearchParams(location.search).toString() +
				'&' +
				new URLSearchParams({ search: 'abc' }).toString(),
		});
		console.log(location);
	};
	return (
		<Grid container className={classes.bgHeader}>
			{/* <Button onClick={onClick}>Click me</Button> */}
			<Grid item xs={12}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link to="/" className={classes.link}>
						<HomeIcon className={classes.icon} />
						Trang chu
					</Link>
					<Link to="/" className={classes.link}>
						Dien thoai
					</Link>
					<Link to="/" className={classes.link}>
						Oppo
					</Link>
				</Breadcrumbs>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<List>
						<ListItem>
							<Card
								variant="outlined"
								style={{
									padding: '10px',
									display: 'flex',
									cursor: 'pointer',
									alignItems: 'center',
								}}
							>
								<i className="fa fa-filter" aria-hidden="true"></i>&nbsp;
								<Typography variant="body1">Bo loc</Typography>
							</Card>
							&nbsp;&nbsp;
							<Card
								variant="outlined"
								style={{ padding: '10px', display: 'flex', cursor: 'pointer' }}
							>
								<Typography variant="body1">Thuong hieu</Typography>

								<ArrowDropDownIcon />
							</Card>
							&nbsp;&nbsp;
							<Card
								variant="outlined"
								style={{ padding: '10px', display: 'flex', cursor: 'pointer' }}
								onClick={handleClickPrice}
							>
								<Typography variant="body1">Gia san pham</Typography>

								<ArrowDropDownIcon />
							</Card>
							<Popover
								id={idPrice}
								open={openPrice}
								anchorEl={anchorElPrice}
								onClose={handleClosePrice}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<List>
									<ListItem button divider>
										<Typography variant="body1">Ten A-Z</Typography>
									</ListItem>
									<ListItem button divider>
										<Typography variant="body1">Ten Z-A</Typography>
									</ListItem>
									<ListItem button divider>
										<Typography variant="body1">Gia thap den cao</Typography>
									</ListItem>
									<ListItem button>
										<Typography variant="body1">Gia cao xuong thap</Typography>
									</ListItem>
								</List>
							</Popover>
						</ListItem>
						<ListItem style={{ display: 'contents' }}>
							<Box style={{ float: 'left', marginLeft: '16px' }}>
								<Typography variant="body1">11 san pham</Typography>
							</Box>
							<Box
								style={{ float: 'right', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
								aria-describedby={idSort}
								onClick={handleClickSort}
							>
								<i className="fa fa-sort-alpha-desc" aria-hidden="true"></i>
								&nbsp;
								<Typography variant="body1">Xep theo</Typography>
							</Box>
							<Popover
								id={idSort}
								open={openSort}
								anchorEl={anchorElSort}
								onClose={handleCloseSort}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<List>
									<ListItem button divider>
										<Typography variant="body1">Ten A-Z</Typography>
									</ListItem>
									<ListItem button divider>
										<Typography variant="body1">Ten Z-A</Typography>
									</ListItem>
									<ListItem button divider>
										<Typography variant="body1">Gia thap den cao</Typography>
									</ListItem>
									<ListItem button>
										<Typography variant="body1">Gia cao xuong thap</Typography>
									</ListItem>
								</List>
							</Popover>
						</ListItem>
					</List>
				</Box>
			</Grid>
			<Grid container spacing={3} style={{ marginTop: '10px' }}>
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
			</Grid>
		</Grid>
	);
};
export default View;
