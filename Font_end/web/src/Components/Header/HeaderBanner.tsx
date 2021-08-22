import { Grid } from '@material-ui/core';
import React from 'react';
import logoHeaderBanner from '../../public/images/header-banner.png';
const HeaderBanner: React.FC = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<img src={logoHeaderBanner} alt="header-banner" width="100%" />
			</Grid>
		</Grid>
	);
};
export default HeaderBanner;
