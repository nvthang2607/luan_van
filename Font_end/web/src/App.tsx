import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import HeaderBanner from './Components/Header/HeaderBanner';
import ClientLayout from './Layouts/ClientLayout';
import Header from './Components/Header/Header';
import Home from './Layouts/Home';
import Account from './pages/Account/Account';
import { AppURL } from './utils/const';
import NotFound from './pages/NotFound/NotFound';
import theme from './utils/theme';

function App() {
	// const theme = createMuiTheme({
	// 	overrides: {
	// 		MuiCssBaseline: {
	// 			'@global': {
	// 				'*::-webkit-scrollbar': {
	// 					width: '0.4em',
	// 				},
	// 				'*::-webkit-scrollbar-track': {
	// 					'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
	// 				},
	// 				'*::-webkit-scrollbar-thumb': {
	// 					backgroundColor: 'rgba(0,0,0,.1)',
	// 					outline: '1px solid slategrey',
	// 				},
	// 			},
	// 		},
	// 	},
	// });
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<ClientLayout>
					<Switch>
						<Route exact path={[AppURL.HOME]}>
							<Home>
								<HeaderBanner />
								<Header />
							</Home>
						</Route>
						<Route exact path="/account" component={Account} />
						<Route path="*" component={NotFound} />
					</Switch>
				</ClientLayout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
