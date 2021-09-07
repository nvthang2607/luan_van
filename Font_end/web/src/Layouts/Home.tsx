import { Box, Grid } from '@material-ui/core';
import React from 'react';
const Home: React.FC = (props) => {
	return <Box style={{ backgroundColor: '#fff' }}>{props.children}</Box>;
};
export default Home;
