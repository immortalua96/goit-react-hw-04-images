import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '31299288-10c92835a232b11626e7788a3',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (searchQuery, page) => {
  const {data} = await axios.get(`?q=${searchQuery}&page=${page}`);
  return data;
  
};
