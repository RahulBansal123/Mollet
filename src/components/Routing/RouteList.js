import React, { lazy } from 'react';

const NotFound = lazy(() => import('../NotFound'));
const SelectRelay = lazy(() => import('../SelectRelay'));
const Monitor = lazy(() => import('../Monitor'));

// layout => Header is visible or not

export const RouteList = [
	{
		link: '/',
		layout: true,
		render: () => <SelectRelay />,
	},
	{
		link: '/monitor',
		layout: true,
		render: () => <Monitor />,
	},
	{
		link: '/404',
		layout: true,
		render: () => <NotFound />,
	},
];
