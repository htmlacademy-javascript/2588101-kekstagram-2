import {createIdGenerator, getRandomInteger, getRandomArrayElement} from './util.js';

const DESCRIPTION_LIST = [
  'Фотографии — это свидетельство о том, что мы жили',
  'Остановить время в одном кадре',
  'В объектив всегда видна правда — это как детектор лжи',
  'Сделано объективом и любовью',
  'Счастье никогда не выходит из моды',
  'Моменты, которые запечатлены навсегда',
  'История, рассказанная через объектив',
  'Счастье в каждом кадре',
  'Вся красота мира в одной картинке',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const PHOTO_DESCRIPTION_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const commentId = createIdGenerator();
const photoId = createIdGenerator();
const imgUrl = createIdGenerator();

const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${ getRandomInteger(MIN_AVATAR, MAX_AVATAR) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: photoId(),
  url: `photos/${ imgUrl() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION_LIST),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment)
});

const createPhotoDescriptionArray = () => Array.from({length: PHOTO_DESCRIPTION_COUNT}, createPhotoDescription);

export {createPhotoDescriptionArray};
