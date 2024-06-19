import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

const getUsers = () => {
  return axios.get(API_URL);
};

const createUser = (newUser) => {
  return axios.post(API_URL, newUser);
};

// Add other CRUD operations as needed (update, delete)

export default {
  getUsers,
  createUser
};
