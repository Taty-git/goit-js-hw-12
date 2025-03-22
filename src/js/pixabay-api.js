import axios from 'axios';

const API_KEY = '49366539-6fd412d088ca04dcc1c9b4bd7';



export const fetchImages = async (searchText) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchText,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        
      }
    });
    return response;
    
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; 
  }
};
