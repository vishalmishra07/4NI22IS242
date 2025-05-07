import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Change this to your backend base URL
});

export const fetchTopUsers = () => API.get('/users');
export const fetchTrendingPosts = () => API.get('/posts?type=popular');
export const fetchFeedPosts = () => API.get('/posts?type=latest');

export default API;