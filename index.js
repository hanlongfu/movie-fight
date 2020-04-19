// api key: 6cbd1ccb

const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '6cbd1ccb',
      s: searchTerm,
    }
  });

  console.log(response.data);
};

const input = document.querySelector('input');

const onInput = debounce((e) => {
  fetchData(e.target.value);
}, 500);

input.addEventListener('input', onInput);