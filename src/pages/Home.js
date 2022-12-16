import getData from '@services/getData';

const Home = async() => {

        const characters = await getData();

        const view = `
    <div class="Characters">
      ${characters.results.map(character => `
        <article class="Charcacter-item">
          <a href="#/${character.id}/">
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
          </a>
        </article>
        `).join('')}
    </div>
  `;
    // console.log('######## view:', view);
    return view;
}
export default Home;