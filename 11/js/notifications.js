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

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');

  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationMessage = template.cloneNode(true);
  body.appendChild(notificationMessage);
  body.addEventListener('click', closeNotification);
  body.addEventListener('keydown', closeNotification);
};

export {showErrorMessage, closeNotification, appendNotification};
