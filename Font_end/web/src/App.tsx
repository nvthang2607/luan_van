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
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/locales/i18n';
import Menu from './Components/Menu';
import Content from './Components/Content/Content';
import Footer from './Components/Footer/Footer';
import View from './pages/Views/View';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Profile from './pages/Profile/Profile';
import ProfileInfo from './pages/Profile/ProfileInfo';
import ChangePwd from './pages/Profile/ChangePwd';
import { profile } from 'console';
import Checkout from './pages/Checkout/Checkout';
import MainLayoutCheckout from './pages/Checkout/MainLayoutCheckout';
import Search from './pages/Search/Search';

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
		<I18nextProvider i18n={i18n}>
			<ThemeProvider theme={theme}>
				<Router>
					<ClientLayout>
						<Switch>
							<Route
								exact
								path={[
									AppURL.HOME,
									AppURL.VIEWS,
									AppURL.PRODUCTDETAIL,
									AppURL.PROFILE_INFO,
									AppURL.PROFILE_CHANGEPWD,
									AppURL.CHECKOUT,
									AppURL.SEARCH,
								]}
							>
								<Home>
									{/* <HeaderBanner /> */}
									<Header />

									<Menu />
									<Switch>
										<Route
											path={[
												AppURL.VIEWS,
												AppURL.PRODUCTDETAIL,
												AppURL.PROFILE_INFO,
												AppURL.PROFILE_CHANGEPWD,
												AppURL.CHECKOUT,
												AppURL.SEARCH,
											]}
										>
											<Switch>
												<Route path={AppURL.VIEWS} component={View} />
												<Route path={AppURL.PRODUCTDETAIL} component={ProductDetail} />
												<Route path={AppURL.CHECKOUT} component={MainLayoutCheckout} />
												<Route path={AppURL.SEARCH} component={Search} />
												<Route path={[AppURL.PROFILE]}>
													<Profile />
												</Route>
											</Switch>
										</Route>
										<Route path={AppURL.HOME} component={Content} />
									</Switch>
									<Footer />
								</Home>
							</Route>
							<Route exact path="/account" component={Account} />
							<Route path="*" component={NotFound} />
						</Switch>
					</ClientLayout>
				</Router>
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default App;
