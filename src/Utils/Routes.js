import { Home, NotFound, Characters } from '../Pages';

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
		component: NotFound,
		key: 'notFound'
	}
];

export default routes;