import {isEscapeKey} from './util.js';

const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorDataTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.querySelector('body');

const showErrorMessage = () => {
  const error = errorDataTemplate.cloneNode(true);
  body.appendChild(error);
  const errorLoadMessage = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadMessage.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const closePopup = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
};

const onButtonClick = (evt) => {
  evt.stopPropagation();
  const closeButton = document.querySelector('button');

  if (evt.target === closeButton) {
    body.removeEventListener('click', onButtonClick);
  }
  closePopup();
};

const onEscapeKeydown = (evt) => {
  evt.stopPropagation();

  if (isEscapeKey(evt)) {

    body.removeEventListener('keydown', onEscapeKeydown);
  }
  closePopup();
};

const onWindowClick = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  if (evt.target === existElement) {
    body.removeEventListener('click', onWindowClick);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationMessage = template.cloneNode(true);
  body.appendChild(notificationMessage);
  body.addEventListener('click', onButtonClick);
  body.addEventListener('keydown', onEscapeKeydown);
  body.addEventListener('click', onWindowClick);
};

export {showErrorMessage, appendNotification};
