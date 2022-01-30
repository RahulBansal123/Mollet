import React, { lazy, Suspense } from 'react';
import { withRouter, Switch, Redirect, Route } from 'react-router-dom';
import Loading from '../Loading';
import { RouteList as routes } from './RouteList';

const Header = lazy(() => import('../Header'));

function Routing() {
	return (
		<Suspense fallback={<Loading />}>
			<Switch>
				{routes.map((route, index) => (
					<Route
						key={index}
						path={route.link}
						exact
						render={() => (
							<>
								{route.layout && <Header />}
								<route.render />
							</>
						)}
					/>
				))}
				<Redirect to="/404" />
			</Switch>
		</Suspense>
	);
}

export default withRouter(Routing);
