import {pictureList, similarPictures} from './render-thumbnails.js';
import {isEscapeKey} from './util.js';


const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikes = bigPicture.querySelector('.likes-count');

const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');

const commentFragment = document.createDocumentFragment();

// закрытие большого фото по Escape
const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// закрытие большого фото по клику
const onCloseByClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

// заполнение большого фото данными
const bigPictureContent = ({url, description, likes}) => {
  bigPictureImg.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikes.textContent = likes;
};

// открытие большого фото по клику на соответствующую миниатюру и заполнение комментариями
function openBigPicture (evt) {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const choosePhoto = similarPictures.find((item) => item.id === Number(evt.target.parentElement.id));

    commentList.innerHTML = '';
    choosePhoto.comments.forEach((comment) => {
      const commentElement = commentTemplate.cloneNode(true);

      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;

      commentFragment.appendChild(commentElement);
    });

    commentList.appendChild(commentFragment);

    bigPicture.classList.remove('hidden');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscapeKeydown);

    bigPictureContent(choosePhoto);

  }
}

pictureList.addEventListener('click', openBigPicture);

// функция удаления обработчиков при закрытии большого фото
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  closeButton.removeEventListener('click', onCloseByClick);
  document.removeEventListener('keydown', onEscapeKeydown);
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});
