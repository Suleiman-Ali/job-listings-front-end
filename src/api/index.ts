import axios from 'axios';

export default axios.create({
  baseURL: 'https://listings-back-end.herokuapp.com/api',
});
