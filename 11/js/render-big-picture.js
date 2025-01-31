import {pictureList} from './render-thumbnails.js';
import {isEscapeKey} from './util.js';
import {renderComments, clearComments} from './render-comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');

let photos = [];

const savePhotos = (dataPhotos) => {
  photos = dataPhotos;
  return photos;
};

const getPhotoById = (id) => photos.find((photo) => photo.id === id);

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  clearComments();
}

const createPictureDescription = ({url, description, likes}) => {
  bigPictureImg.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikes.textContent = likes;
};

function openBigPicture (evt) {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const currentPicture = getPhotoById(Number(evt.target.parentElement.id));

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapeKeydown);
    closeButton.addEventListener('click', onCloseButtonClick);

    createPictureDescription(currentPicture);
    renderComments(currentPicture.comments);
  }
}

pictureList.addEventListener('click', openBigPicture);

export {savePhotos};
