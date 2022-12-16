import '@styles/main.css';
import '@styles/global.scss';

import Header from '../templates/Header';
import Home from '../Pages/Home';
import Character from '../Pages/Character';
import Error404 from '../Pages/Error404';

import getHash from '../utils/getHash';
import resolveRoutes from '../utils/resolveRoutes';

const Routes = {
    '/': Home,
    '/:id': Character,
    '/Contact': 'Contact'
}

const Router = async() => {
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('content');

    header.innerHTML = await Header();

    let hash = getHash();
    let route = await resolveRoutes(hash);
    let render = Routes[route] ? Routes[route] : Error404;

    content.innerHTML = await render();
}

export default Router;