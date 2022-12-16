import '@styles/main.css';
import '@styles/global.scss';

import Header from '@templates/Header.js';
import Home from '@pages/Home.js';
import Character from '@pages/Character.js';
import Error404 from '@pages/Error404.js';

import getHash from '@utils/getHash.js';
import resolveRoutes from '@utils/resolveRoutes.js';

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