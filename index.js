// api key: 6cbd1ccb

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '6cbd1ccb',
      s: searchTerm,
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = debounce(async (e) => {
  const movies = await fetchData(e.target.value);

  //remove empty result container when no results
  if (!movies.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  //clear out previous search results
  resultsWrapper.innerHTML = '';

  // 'is-active' css class adds or closes drop-down
  dropdown.classList.add('is-active');
  for (let movie of movies) {
    const option = document.createElement('a');

    //handle movies without poster
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src = "${imgSrc}" />
      ${movie.Title}
    `;

    //handle movie selection
    option.addEventListener('click', () => {
      //when a movie is clicked, movie list disappears
      dropdown.classList.remove('is-active');

      //input value is updated to the title of our selection
      input.value = movie.Title;

      //render the selection
      onMovieSelect(movie);
    });

    resultsWrapper.appendChild(option);
  }

}, 500);

input.addEventListener('input', onInput);

document.addEventListener('click',
  (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });

const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '6cbd1ccb',
      i: movie.imdbID,
    }
  });

  document.querySelector('#summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image"> 
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
  `;
};