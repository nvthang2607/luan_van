import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import View from './View';
const MainView: React.FC = () => {
	return (
		<React.Fragment>
			<Switch>
				<Route
					path={[
						AppURL.VIEWS_PHONE,
						AppURL.RECOMMEND,
						AppURL.NEW_PHONE,
						AppURL.SELL_PHONE,
						AppURL.NEW_PRODUCT,
						AppURL.SELL_PRODUCT,
						AppURL.TOP_PRODUCT,
					]}
				>
					<Switch>
						<Route path={AppURL.VIEWS_PHONE}>
							<View name={AppURL.VIEWS_PHONE} />
						</Route>
						<Route path={AppURL.RECOMMEND}>
							<View name={AppURL.RECOMMEND} />
						</Route>
						<Route path={AppURL.NEW_PHONE}>
							<View name={AppURL.NEW_PHONE} />
						</Route>
						<Route path={AppURL.SELL_PHONE}>
							<View name={AppURL.SELL_PHONE} />
						</Route>
						<Route path={AppURL.NEW_PRODUCT}>
							<View name={AppURL.NEW_PRODUCT} />
						</Route>
						<Route path={AppURL.SELL_PRODUCT}>
							<View name={AppURL.SELL_PRODUCT} />
						</Route>
						<Route path={AppURL.TOP_PRODUCT}>
							<View name={AppURL.TOP_PRODUCT} />
						</Route>
					</Switch>
				</Route>
			</Switch>
		</React.Fragment>
	);
};
export default MainView;
