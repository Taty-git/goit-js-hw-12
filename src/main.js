import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { showLoader, hideLoader, clearGallery, renderImages, initializeLightbox } from './js/render-functions.js';

const form = document.querySelector('.form');
hideLoader();

form.addEventListener('submit', async function (event) {
  event.preventDefault(); 
  const searchText = form.querySelector('input[name="search-text"]').value.trim();

  if (!searchText) {
    iziToast.error({
      title: 'Error',
      message: 'Please, enter the text for search!',
    });
    return;
  }
  showLoader();

  let gallery = document.querySelector('.gallery');
  if (!gallery) {
    gallery = createGallery();
  } else {
    clearGallery();
  }

  try {
    const response = await fetchImages(searchText);
    hideLoader();

    const images = response.data.hits;


    if (images.length === 0) {
      iziToast.warning({
        title: 'Caution',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderImages(images);
    initializeLightbox();

    
  } catch(error) {
      hideLoader(); 
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation.',
      });
      console.error(error);
    }
});