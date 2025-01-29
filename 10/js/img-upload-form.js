import {isEscapeKey} from './util.js';
import {error, isHashtagInputValid} from './hashtag-validity.js';
import {resetSlider} from './img-effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');

const imgUpload = uploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const imgUploadCancel = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

// закрытие фото по клику
const onImgUploadCancelClick = () => {
  closePhotoEditor();
};

// закрытие фото по Escape
const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// не позволяет отправить форму с ошибками на сервер
const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');
    uploadForm.submit();
  }
};

uploadForm.addEventListener('submit', onFormSubmit);


// функция удаления обработчиков при закрытии большого фото и сброс значения
function closePhotoEditor () {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  imgUploadInput.value = '';
  resetSlider();
}

// открытие окна редактора по событию change
const openPhotoEditor = () => {
  imgUploadInput.addEventListener('change', () => {
    imgUpload.classList.remove('hidden');
    body.classList.add('modal-open');
    imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
    document.addEventListener('keydown', onEscapeKeydown);
  });
};

pristine.addValidator(commentInput, (value) => {
  const isValid = value.length <= 140;
  return isValid;
}, 'длина комментария не больше 140 символов');

pristine.addValidator(hashtagInput, isHashtagInputValid, error, 2, false);

export {openPhotoEditor, uploadForm};
