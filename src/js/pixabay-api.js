import axios from 'axios';

const API_KEY = '49366539-6fd412d088ca04dcc1c9b4bd7';

let per_page = 15;


export const fetchImages = async (searchText, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchText,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: page,
      }
    });
    
    return response.data;
    
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];  
  }
}
