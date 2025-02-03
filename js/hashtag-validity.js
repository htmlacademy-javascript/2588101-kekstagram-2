
const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';

const error = () => errorMessage;

const isHashtagInputValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputsArray = inputText.split(/\s+/);
  const rules = [
    {
      check: inputsArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решётки',
    },
    {
      check: inputsArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputsArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputsArray.some((item, num, data) => data.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputsArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина хештега ${MAX_SYMBOLS} символов`,
    },
    {
      check: inputsArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
    {
      check: inputsArray.length > MAX_HASHTAGS,
      error: `Не больше ${MAX_HASHTAGS} хештегов`,
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export {error, isHashtagInputValid};
