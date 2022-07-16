import axios from 'axios';

export default axios.create({
  baseURL: 'https://job-listings-back-end.herokuapp.com/api',
});
