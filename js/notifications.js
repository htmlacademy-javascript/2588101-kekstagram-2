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

const onButtonClick = (evt) => {
  evt.stopPropagation();
  const closeButton = document.querySelector('button');

  if (evt.target === closeButton) {
    return;
  }
  closePopup();
};

const onEscapeKeydown = (evt) => {
  evt.stopPropagation();

  if (isEscapeKey(evt)) {
    closePopup();
  }
};

const onWindowClick = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  if (evt.target === existElement) {
    closePopup();
  }
};


function closePopup(){
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  body.removeEventListener('click', onButtonClick);
  body.removeEventListener('keydown', onEscapeKeydown);
  body.removeEventListener('click', onWindowClick);
  existElement.remove();
}


const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationMessage = template.cloneNode(true);
  body.appendChild(notificationMessage);
  body.addEventListener('click', onButtonClick);
  body.addEventListener('keydown', onEscapeKeydown);
  body.addEventListener('click', onWindowClick);
};

export {showErrorMessage, appendNotification};
