const checkStringLength = (string, maxlength) => string.length <= maxlength;
checkStringLength('проверяемая строка', 20);


const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return reversedString === string;
};

isPalindrome('топот');


const exctractNumbers = (string) => {
  string = String(string);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

exctractNumbers ('2023 Год');

