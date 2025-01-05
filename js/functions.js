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


const getMinutes = (string) => {
  const [hour, minutes] = string.split(':');
  return hour * 60 + (+minutes);
};

const isMeetingRelevant = (startWork, endWork, meetingStart, meetingDuration) =>

  getMinutes(startWork) <= getMinutes(meetingStart) && (getMinutes(meetingStart) + meetingDuration) <= getMinutes(endWork);

isMeetingRelevant('08:00', '17:30', '14:00', 90); // true
isMeetingRelevant('8:0', '10:0', '8:0', 120); // true
isMeetingRelevant('08:00', '14:30', '14:00', 90); // false
isMeetingRelevant('14:00', '17:30', '08:0', 90); // false
isMeetingRelevant('8:00', '17:30', '08:00', 900); // false
