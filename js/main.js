import {renderSimilarList} from './render-thumbnails.js';
import {savePhotos} from './render-big-picture.js';
import './img-effects.js';
import {getData} from './api.js';
import {showErrorMessage} from './notifications.js';
import {switchFilters} from './filters.js';

import {openPhotoEditor} from './img-upload-form.js';

openPhotoEditor();

try {
  const photos = await getData();
  savePhotos(photos);
  renderSimilarList(photos);
  switchFilters(photos);
} catch (error) {
  showErrorMessage(error.message);
}

