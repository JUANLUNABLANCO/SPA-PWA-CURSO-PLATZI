const resolveRoutes = (route) => {
    // console.log('route:', route);
    if (route.length <= 3) {

        let validRoute = route === '/' ? route : '/:id';
        return validRoute
    }
    return `/${route}`; // about
}
export default resolveRoutes;