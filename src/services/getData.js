const API = process.env.API;

const getData = async(id) => {
    if (API !== null) {
        const apiURL = id ? `${API}${id}` : API; // O UNO EN CONCRETO, O TODOS
        try {
            const response = await fetch(apiURL);
            const data = response.json();
            return data;
        } catch (error) {
            console.log('fetch error: ', error);
        }
    } else return null;
}
export default getData;