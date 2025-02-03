import {isEscapeKey} from './util.js';
import {showError, isHashtagInputValid} from './hashtag-validity.js';
import {resetSlider} from './img-effects.js';
import {sendData} from './api.js';
import {appendNotification} from './notifications.js';
import {upLoadFile} from './img-upload.js';

const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');

const imgUpload = uploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const imgUploadCancel = uploadForm.querySelector('.img-upload__cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const formSubmitButton = uploadForm.querySelector('.img-upload__submit');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const disabledButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;
};

const enabledButton = (text) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = text;
};

const onImgUploadCancelClick = () => {
  closePhotoEditor();
};

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

const sendFormData = async (formData) => {

  if (pristine.validate()) {
    disabledButton(SubmitButtonText.SENDING);
    try {
      await sendData(new FormData(formData));
      appendNotification(successTemplate, closePhotoEditor);
    } catch (err) {
      appendNotification(errorTemplate);
    } finally {
      enabledButton(SubmitButtonText.IDLE);
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

uploadForm.addEventListener('submit', onFormSubmit);

function closePhotoEditor () {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  imgUploadInput.value = '';
  resetSlider();
  uploadForm.reset();
  pristine.reset();
}

const openPhotoEditor = () => {
  imgUploadInput.addEventListener('change', () => {
    imgUpload.classList.remove('hidden');
    body.classList.add('modal-open');
    imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
    document.addEventListener('keydown', onEscapeKeydown);

    upLoadFile();
  });
};

pristine.addValidator(commentInput, (value) => {
  const isValid = value.length <= 140;
  return isValid;
}, 'длина комментария не больше 140 символов');

pristine.addValidator(hashtagInput, isHashtagInputValid, showError, 2, false);

export {openPhotoEditor, uploadForm};
