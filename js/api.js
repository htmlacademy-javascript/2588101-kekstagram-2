const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/';

const Route = {
  GET_DATA: 'data',
  SEND_DATA: '',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, {method, body});
  const data = await response.json();
  return data;
};

const getData = async () => await load(Route.GET_DATA);
const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
