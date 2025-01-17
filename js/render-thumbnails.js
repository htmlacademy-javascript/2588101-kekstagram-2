import {createPhotoDescriptionArray} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailFragment = document.createDocumentFragment();
const similarPictures = createPhotoDescriptionArray();

similarPictures.forEach(({id, url, description, comments, likes}) => {

  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.id = id;

  const pictureImg = thumbnail.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnailFragment.appendChild(thumbnail);
});

pictureList.appendChild(thumbnailFragment);

export {pictureList, similarPictures};
