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
import Order from './pages/Order/Order';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import MainView from './pages/Views/MainView';
import Login from './pages/Login/Login';
import LoginLayout from './Layouts/LoginLayout';
import AdminLayout from './Layouts/AdminLayout';
import { useMediaQuery } from 'react-responsive';
import ListNews from './pages/NewsDetail/ListNews';

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
	const isResponseive = useMediaQuery({ query: '(min-width: 1208px)' });
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
									AppURL.ORDER,
									AppURL.NEWSDETAIL,
									AppURL.NEWS,
								]}
							>
								<Home>
									{/* <HeaderBanner /> */}
									<Header />

									{isResponseive && <Menu />}
									<Switch>
										<Route
											path={[
												AppURL.VIEWS,
												AppURL.PRODUCTDETAIL,
												AppURL.NEWSDETAIL,
												AppURL.PROFILE_INFO,
												AppURL.PROFILE_CHANGEPWD,
												AppURL.CHECKOUT,
												AppURL.SEARCH,
												AppURL.ORDER,
												AppURL.NEWS,
											]}
										>
											<Switch>
												<Route path={AppURL.VIEWS}>
													<MainView />
												</Route>
												<Route path={AppURL.PRODUCTDETAIL} component={ProductDetail} />
												<Route path={AppURL.CHECKOUT} component={MainLayoutCheckout} />
												<Route path={AppURL.SEARCH} component={Search} />
												<Route path={AppURL.NEWSDETAIL} component={NewsDetail} />
												<Route path={AppURL.NEWS} component={ListNews} />
												<Route path={[AppURL.PROFILE, AppURL.ORDER]}>
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
							<Route exact path="/admin" component={() => <Redirect to={AppURL.LOGIN} />} />
							<Route path={[AppURL.LOGIN]}>
								<Switch>
									<Route path={AppURL.LOGIN}>
										<LoginLayout>
											<Login />
										</LoginLayout>
									</Route>
								</Switch>
							</Route>
							<Route
								path={[
									AppURL.ORDER_ALL_ADMIN,
									AppURL.MANAGER_USER,
									AppURL.ADMIN_HOME,
									AppURL.ADMIN_TYPE_PRODUCT,
									AppURL.ADMIN_BRAND_PRODUCT,
									AppURL.ADMIN_PRODUCT,
									AppURL.ADMIN_PRODUCT_DETAIL,
									AppURL.ADMIN_PRODUCT_PROMOTION,
									AppURL.ADMIN_BILL,
									AppURL.ADMIN_LIST_RATING,
									AppURL.ADMIN_NEWS,
									AppURL.ADMIN_SLIDE,
									AppURL.ADMIN_CONTACT,
									AppURL.ADMIN_COMMENT,
									AppURL.ADMIN_EMPLOYEE,
									AppURL.ADMIN_CHANGEPASSWORD,
									AppURL.ADMIN_PROFILE,
								]}
							>
								<Switch>
									<Route
										path={[
											AppURL.ORDER_ALL_ADMIN,
											AppURL.MANAGER_USER,
											AppURL.ADMIN_HOME,
											AppURL.ADMIN_TYPE_PRODUCT,
											AppURL.ADMIN_BRAND_PRODUCT,
											AppURL.ADMIN_PRODUCT,
											AppURL.ADMIN_PRODUCT_DETAIL,
											AppURL.ADMIN_PRODUCT_PROMOTION,
											AppURL.ADMIN_BILL,
											AppURL.ADMIN_LIST_RATING,
											AppURL.ADMIN_NEWS,
											AppURL.ADMIN_SLIDE,
											AppURL.ADMIN_CONTACT,
											AppURL.ADMIN_COMMENT,
											AppURL.ADMIN_EMPLOYEE,
											AppURL.ADMIN_CHANGEPASSWORD,
											AppURL.ADMIN_PROFILE,
										]}
									>
										<AdminLayout />
									</Route>
								</Switch>
							</Route>
							<Route path="*" component={NotFound} />
						</Switch>
					</ClientLayout>
				</Router>
			</ThemeProvider>
		</I18nextProvider>
	);
}

export default App;
