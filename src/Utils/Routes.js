import { Home, NotFound, Characters, Locations, Episodes } from '../Pages';

const routes = [
	{
		exact: true,
		path: '/',
		component: Home,
		key: 'home'
	},
	{
		exact: true,
		path: '/characters',
		component: Characters,
		key: 'characters'
	},
	{
		exact: true,
		path: '/episodes',
		component: Episodes,
		key: 'episodes'
	},
	{
		exact: true,
		path: '/locations',
		component: Locations,
		key: 'locations'
	},
	{
		component: NotFound,
		key: 'notFound'
	}
];

export default routes;