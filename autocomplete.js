// reusable code to get an autocomplete to work
// function that will take the autcomplete config
// object and render an autocomplete on the screen

const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {

  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInput = debounce(async (e) => {
    const items = await fetchData(e.target.value);

    //remove empty result container when no results
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    //clear out previous search results
    resultsWrapper.innerHTML = '';

    // 'is-active' css class adds or closes drop-down
    dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);

      //handle item selection
      option.addEventListener('click', () => {
        //when a item is clicked, item list disappears
        dropdown.classList.remove('is-active');

        //input value is updated to the title of our selection
        input.value = inputValue(item);

        //render the selection
        onOptionSelect(item);
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

};