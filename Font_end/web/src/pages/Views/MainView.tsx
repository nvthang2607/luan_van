import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AppURL } from '../../utils/const';
import View from './View';
const MainView: React.FC = () => {
	return (
		<React.Fragment>
			<Switch>
				<Route path={[AppURL.VIEWS_PHONE, AppURL.RECOMMEND]}>
					<Switch>
						<Route path={AppURL.VIEWS_PHONE}>
							<View name={AppURL.VIEWS_PHONE} />
						</Route>
						<Route path={AppURL.RECOMMEND}>
							<View name={AppURL.RECOMMEND} />
						</Route>
					</Switch>
				</Route>
			</Switch>
		</React.Fragment>
	);
};
export default MainView;
