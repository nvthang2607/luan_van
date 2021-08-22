import { Grid } from '@material-ui/core';
import React from 'react';
const ClientLayout: React.FC = (props) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				{props.children}
			</Grid>
		</Grid>
	);
};
export default ClientLayout;
