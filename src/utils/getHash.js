const getHash = () => location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/'; // '#/route'[1] -> '/route'.split('7') -> ['', '1', ''][1] -> '1'
export default getHash;