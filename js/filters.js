import {debounce} from './util.js';
import {renderSimilarList} from './render-thumbnails.js';

const filtersContainer = document.querySelector('.img-filters');

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const FUNCTION = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const MAX_RANDOM_PHOTO_COUNT = 10;
const RERENDER_DELAY = 500;

let currentFilter = FILTER.default;
let pictures = [];

const debounceRender = debounce(renderSimilarList, RERENDER_DELAY);

const getFilterData = () => {
  let filteredPictures = [];

  switch (currentFilter) {
    case FILTER.random:
      filteredPictures = pictures.toSorted(FUNCTION.random).slice(0, MAX_RANDOM_PHOTO_COUNT);
      break;
    case FILTER.discussed:
      filteredPictures = pictures.toSorted(FUNCTION.discussed);
      break;
    default:
      filteredPictures = pictures;
  }
  debounceRender(filteredPictures, RERENDER_DELAY);
};

function onFilterChange (evt) {
  const targetButton = evt.target;
  const activeButton = filtersContainer.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  getFilterData();
}

const configFilters = (picturesData) => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterChange);
  pictures = picturesData;
};

export {configFilters};
