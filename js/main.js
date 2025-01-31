import {renderSimilarList} from './render-thumbnails.js';
import {savePhotos} from './render-big-picture.js';
import './img-effects.js';
import {getData} from './api.js';
import {showErrorMessage} from './notifications.js';

import {openPhotoEditor} from './img-upload-form.js';

openPhotoEditor();

try {
  const photos = await getData();
  savePhotos(photos);
  renderSimilarList(photos);
} catch (error) {
  showErrorMessage(error.message);
}

